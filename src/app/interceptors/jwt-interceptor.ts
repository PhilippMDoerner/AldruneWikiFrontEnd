import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Constants } from "src/app/app.constants";
import { RefreshTokenService } from '../services/refresh-token.service';
import { TokenService } from '../services/token.service';
import { RoutingService } from '../services/routing.service';
import { UserData } from '../models/jwttoken';

@Injectable({providedIn: 'root'})
export class JWTInterceptor implements HttpInterceptor{
    apiNonTokenURLEndings: string[] = [ //Endings of API URLs that require no tokem to be used
        "/token", //Request new authentication token with refresh token
        "/token/refresh", //Request new refresh token with login data
        "/mail/reset", //Send password recovery mail
    ]

    constructor(
        private refreshTokenService: RefreshTokenService,
        private tokenService: TokenService,
        public routingService: RoutingService,
    ){}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if (this.isApiUrlRequiringJWTToken(request.url)){
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

            request = this.addTokenToRequest(accessToken.token, request);
            return next.handle(request);
        } 

        return next.handle(request);
    }

    private handleByRefreshingAccessToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return this.refreshTokenService.refreshUserData().pipe(
            switchMap((newUserData: UserData) => {
                const newAccessToken: string = newUserData.accessToken.token;
                request = this.addTokenToRequest(newAccessToken, request);
                return next.handle(request);
            }),
            catchError(error =>{
                if (error.status === 401){
                    console.log("Error while refreshing access token");
                    console.log(error)
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
                    console.log(error);
                    this.routingService.routeToPath('login-state', {state: '???'});
                    return EMPTY;
                }

                console.log("Error during token refresh. Uncertain what error, but status "+error.status);
                console.log(error)
                this.routingService.routeToErrorPage(error.status);
                return EMPTY;
            })
        )
    }

    private handleByRoutingToLogin(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        this.routingService.routeToPath('login-state', {state: 'no-token'});
        return EMPTY;
    }

    private isApiUrlRequiringJWTToken(url: string): boolean{
        const isApiUrl: boolean = url.startsWith(Constants.wikiApiUrl);
        let requiresJWTToken = true;
        for(let urlEnding of this.apiNonTokenURLEndings){
            const isApiEndpointThatDoesNotRequireToken = url.endsWith(urlEnding);
            if(isApiEndpointThatDoesNotRequireToken){
                requiresJWTToken = false;
                break;
            }
        }

        return isApiUrl && requiresJWTToken;
    }

    private addTokenToRequest(token: string, request: HttpRequest<any>): HttpRequest<any>{
        const httpHeaders = new HttpHeaders().set("Authorization", `Bearer ${token}`);
        request = request.clone({headers: httpHeaders});
        return request;   
    }
}