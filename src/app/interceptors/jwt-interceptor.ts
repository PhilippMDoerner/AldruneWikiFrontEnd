import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, filter, first, switchMap } from 'rxjs/operators';
import { Constants } from "src/app/app.constants";
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { RefreshTokenService } from '../services/refresh-token.service';
import { TokenService } from '../services/token.service';

@Injectable({providedIn: 'root'})
export class JWTInterceptor implements HttpInterceptor{
    constructor(
        private refreshTokenService: RefreshTokenService,
        private tokenService: TokenService,
        private router: Router,
    ){}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if (this.isApiUrl(request.url)){
            const accessToken = this.tokenService.getAccessToken();

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
          catchError(err =>{
              this.router.navigateByUrl("/login/token-expired");
              return next.handle(request);
          })
        )
      }
    
    private handleByWaitingForRefresh(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return this.refreshTokenService.waitForAccessTokenRefresh().pipe(
            switchMap((newAccessToken: string) => {
            request = this.addTokenToRequest(newAccessToken, request);
            return next.handle(request);
            })
        )
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


            
            // //If Access Token Expired and no refresh of it currently running
            // if(this.userService.isTokenExpired(accessToken) && !this.tokenRefreshInProgress){
            //     const refreshToken = this.userService.getRefreshToken();
            //     if (this.userService.isTokenExpired(refreshToken) || !this.userService.getRefreshToken()) this.routeToLogin();

            //     this.tokenRefreshInProgress = true;
            //     this.refreshAccessTokenSubject.next(null);

            //     return this.userService.refreshToken().pipe(
            //         switchMap(authResponse => {
            //             this.userService.setAccessToken(authResponse.access);
            //             this.tokenRefreshInProgress = false;
            //             this.refreshAccessTokenSubject.next(authResponse.access);
            //             request = this.addTokenToRequest(authResponse.access, request);
            //             return next.handle(request);
            //         })
            //     )

            // //If Access Token Expired and already a refresh of it running
            // } else if(this.userService.isTokenExpired(accessToken) && this.tokenRefreshInProgress){
            //     return this.refreshAccessTokenSubject.pipe(
            //         filter(result => result !== null),
            //         first(),
            //         switchMap(response => {
            //             request = this.addTokenToRequest(this.userService.getAccessToken(), request);
            //             return next.handle(request);
            //         })
            //     )
            
            //  //If Access Token Valid
            // } else {
            //     request = this.addTokenToRequest(accessToken, request);      
            // }   