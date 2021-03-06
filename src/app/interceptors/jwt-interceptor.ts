import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Constants } from "src/app/app.constants";
import { Router } from '@angular/router';
import { RefreshTokenService } from '../services/refresh-token.service';
import { TokenService } from '../services/token.service';
import { RoutingService } from '../services/routing.service';

@Injectable({providedIn: 'root'})
export class JWTInterceptor implements HttpInterceptor{
    constructor(
        private refreshTokenService: RefreshTokenService,
        private tokenService: TokenService,
        private router: Router,  
        public routingService: RoutingService,
    ){}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if (this.isApiUrl(request.url)){
            if (!this.tokenService.hasValidJWTToken()){
                return this.handleByRoutingToLogin(request, next);
            }

            const accessToken = TokenService.getAccessToken();
            if (this.refreshTokenService.tokenNeedsRefresh(accessToken)){
                return this.handleByRefreshingAccessToken(request, next);
            }

            if (this.refreshTokenService.hasToWaitForRefresh(accessToken)){
                return this.handleByWaitingForRefresh(request, next);
            }

            request = this.addTokenToRequest(accessToken, request);
            return next.handle(request);
        } 

        return next.handle(request);
    }

    private handleByRefreshingAccessToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return this.refreshTokenService.refreshAccessToken().pipe(
            switchMap((newAccessToken: string) => {
                request = this.addTokenToRequest(newAccessToken, request);
                return next.handle(request);
            }),
            catchError(error =>{
                if (error.status === 401){
                console.log("Error while refreshing access token");
                this.routingService.routeToPath('login-state', {state: 'token-expired'});
                return EMPTY;
                } 

                this.routingService.routeToErrorPage(error);
                return EMPTY;
            })
        )
      }
    
    private handleByWaitingForRefresh(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return this.refreshTokenService.waitForAccessTokenRefresh().pipe(
            switchMap((newAccessToken: string) => {
                request = this.addTokenToRequest(newAccessToken, request);
                return next.handle(request);
            }),
            catchError(error =>{
                if(error.status===401){
                    console.log("Error while waiting for access token refresh");
                    this.routingService.routeToPath('login-state', {state: '???'});
                    return EMPTY;
                }

                console.log("Error during token refresh. Uncertain what error, but status "+error.status);
                this.routingService.routeToErrorPage(error.status);
                return EMPTY;
            })
        )
    }

    private handleByRoutingToLogin(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        this.routingService.routeToPath('login-state', {state: 'no-token'});
        return EMPTY;
    }

    private isApiUrl(url: string): boolean{
        const isApiUrl: boolean = url.startsWith(Constants.wikiApiUrl);
        const isTokenLoginUrl: boolean = url.endsWith('/token');
        const isTokenRefreshUrl: boolean = url.endsWith('/token/refresh');
        return isApiUrl && !isTokenLoginUrl && !isTokenRefreshUrl;
    }

    private addTokenToRequest(token: string, request: HttpRequest<any>): HttpRequest<any>{
        const httpHeaders = new HttpHeaders().set("Authorization", `Bearer ${token}`);
        request = request.clone({headers: httpHeaders});
        return request;   
    }
}