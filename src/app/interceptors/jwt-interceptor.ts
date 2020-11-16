import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { Constants } from "src/app/app.constants";
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class JWTInterceptor implements HttpInterceptor{
    private tokenRefreshInProgress: boolean = false;
    private refreshAccessTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

    constructor(private userService: UserService, private router: Router){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if (this.isApiUrl(request.url)){
            const accessToken = this.userService.getAccessToken();

            //If Access Token Expired and no refresh of it currently running
            if(this.userService.isTokenExpired(accessToken) && !this.tokenRefreshInProgress){
                this.tokenRefreshInProgress = true;
                this.refreshAccessTokenSubject.next(null);

                return this.userService.refreshToken().pipe(
                    switchMap(authResponse => {
                        this.userService.setAccessToken(authResponse.access);
                        this.tokenRefreshInProgress = false;
                        this.refreshAccessTokenSubject.next(authResponse.access);
                        request = this.addTokenToRequest(authResponse.access, request);
                        return next.handle(request);
                    })
                )

            //If Access Token Expired and already a refresh of it running
            } else if(this.userService.isTokenExpired(accessToken) && this.tokenRefreshInProgress){
                return this.refreshAccessTokenSubject.pipe(
                    filter(result => result !== null),
                    first(),
                    switchMap(response => {
                        request = this.addTokenToRequest(this.userService.getAccessToken(), request);
                        return next.handle(request);
                    })
                )
            
             //If Access Token Valid
            } else {
                request = this.addTokenToRequest(accessToken, request);      
            }      
        } 

        return next.handle(request);
    }

    isApiUrl(url: string): boolean{
        const isApiUrl: boolean = url.startsWith(Constants.wikiApiUrl);
        const isTokenLoginUrl: boolean = url.endsWith('/token');
        const isTokenRefreshUrl: boolean = url.endsWith('/token/refresh');
        return isApiUrl && !isTokenLoginUrl && !isTokenRefreshUrl;
    }

    addTokenToRequest(token: string, request: HttpRequest<any>): HttpRequest<any>{
        const httpHeaders = new HttpHeaders().set("Authorization", `Bearer ${token}`);
        request = request.clone({headers: httpHeaders});
        return request;   
    }
}