import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { String } from 'lodash';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { DecodedTokenPayload, EncodedJWTToken } from '../models/jwttoken';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private jwtTokenUrl: string = Constants.wikiTokenUrl;
  private refreshTokenUrl: string = Constants.wikiTokenRefreshUrl;

  constructor(private http: HttpClient, private router: Router) { }

  public getJWTToken(userModel: User): Observable<EncodedJWTToken>{
    const loginData: object = {username: userModel.username, password: userModel.password};
    return this.http.post<EncodedJWTToken>(this.jwtTokenUrl, loginData);
  }

  public invalidateJWTToken(): void{
    const jwtToken: EncodedJWTToken = {access: this.getAccessToken(), refresh: this.getRefreshToken()};
    //return this.http.post(`${this.jwtTokenUrl}/logout`, jwtToken); //This feature is not implemented in the backend
  }

  public hasJWTToken(): boolean{
    const hasAccessToken = localStorage.hasOwnProperty(Constants.accessTokenKey) &&  !this.isBadToken(this.getAccessToken());
    const hasRefreshToken = localStorage.hasOwnProperty(Constants.refreshTokenKey) && !this.isBadToken(this.getRefreshToken());
    return hasAccessToken && hasRefreshToken;
  }

  public hasValidJWTToken(): boolean{
    if (!this.hasJWTToken()) return false;
    return !this.isTokenExpired(this.getRefreshToken());
  }

  public getAccessToken(): string{
    return localStorage.getItem(Constants.accessTokenKey);
  }

  public getRefreshToken(): string{
    return localStorage.getItem(Constants.refreshTokenKey);
  }

  public refreshToken(): Observable<EncodedJWTToken>{
    const refreshToken = this.getRefreshToken();
    return this.http.post<EncodedJWTToken>(this.refreshTokenUrl, {refresh: refreshToken});
  }

  public setTokens(jwtToken: EncodedJWTToken): void{
    this.setAccessToken(jwtToken.access);
    this.setRefreshToken(jwtToken.refresh);
  }

  public removeJWTTokenFromLocalStorage(): void{
    localStorage.removeItem(Constants.accessTokenKey);
    localStorage.removeItem(Constants.refreshTokenKey);
  }

  public setAccessToken(token: string): void{
    if(this.decodeTokenPayload(token).token_type !== Constants.accessTokenType){
      throw "The Token you are trying to set as an Access Token is not an Access Token. Something is incorrectly handled about JWT token storage!"
    }
    localStorage.setItem(Constants.accessTokenKey, token);
  }

  public setRefreshToken(token: string): void{
    if(this.decodeTokenPayload(token).token_type !== Constants.refreshTokenType){
      throw "The Token you are trying to set as a Refresh Token is not a Refresh Token. Something is incorrectly handled about JWT token storage!"
    }
    localStorage.setItem(Constants.refreshTokenKey, token);
  }

  public decodeTokenPayload(token: string): DecodedTokenPayload{
    const [encodedHeader, encodedPayload, encodedSignature]: string[] = token.split('.');
    return JSON.parse(atob(encodedPayload));
  }

  public getCurrentUserPk(): number{
    const currentUserAccessToken: string = this.getAccessToken();
    const currentUserAccessTokenPayload: DecodedTokenPayload = this.decodeTokenPayload(currentUserAccessToken);
    return currentUserAccessTokenPayload.user_id;
  }

  public isTokenExpired(token: string): boolean{
    const payload: DecodedTokenPayload = this.decodeTokenPayload(token);
    const expiryTimestamp = payload.exp;
    const currentTimestamp = Math.floor((new Date).getTime()/1000);
    if (currentTimestamp >= expiryTimestamp){
      console.log(`Token is expired. request timestamp: ${new Date(currentTimestamp*1000).toString()}. Token expiry timestamp: ${new Date(expiryTimestamp*1000).toString()}`)
    }
    return currentTimestamp >= expiryTimestamp;
  }

  private isBadToken(token: string): boolean{
    const isEmptyToken: boolean = !token;
    return isEmptyToken || this.isTokenForAnonymousUser(token);
  }

  private isTokenForAnonymousUser(token: string): boolean{
    const payload: DecodedTokenPayload = this.decodeTokenPayload(token);
    return payload.user_name === Constants.anonymousUserName;
  }
}
