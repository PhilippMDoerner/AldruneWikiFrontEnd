import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CampaignRole, Constants } from '../app.constants';
import { DecodedTokenPayload, EncodedJWTToken } from '../models/jwttoken';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private jwtTokenUrl: string = Constants.wikiTokenUrl;
  private refreshTokenUrl: string = Constants.wikiTokenRefreshUrl;

  constructor(private http: HttpClient) { }

  public getJWTToken(userModel: User): Observable<EncodedJWTToken>{
    const loginData: object = {username: userModel.username, password: userModel.password};
    return this.http.post<EncodedJWTToken>(this.jwtTokenUrl, loginData);
  }

  public invalidateJWTToken(): void{
  //   const jwtToken: EncodedJWTToken = {access: this.getAccessToken(), refresh: this.getRefreshToken()};
  //   return this.http.post(`${this.jwtTokenUrl}/logout`, jwtToken); //This feature is not implemented in the backend
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

  //Exists for permissionDecorator.ts
  public static getAccessToken(): string{
    return localStorage.getItem(Constants.accessTokenKey);
  }

  private getAccessToken(): string{
    return TokenService.getAccessToken();
  }

  //Exists for permissionDecorator.ts
  public static getRefreshToken(): string{
    return localStorage.getItem(Constants.refreshTokenKey);
  }

  private getRefreshToken(): string{
    return TokenService.getRefreshToken();
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

  //Exists for permissionDecorator.ts
  public static decodeTokenPayload(token: string): DecodedTokenPayload{
    const [encodedHeader, encodedPayload, encodedSignature]: string[] = token.split('.');
    return JSON.parse(atob(encodedPayload));
  }

  private decodeTokenPayload(token: string): DecodedTokenPayload{
    return TokenService.decodeTokenPayload(token);
  }

  public getCurrentUserPk(): number{
    const currentUserAccessToken: string = this.getAccessToken();
    const currentUserAccessTokenPayload: DecodedTokenPayload = this.decodeTokenPayload(currentUserAccessToken);
    return currentUserAccessTokenPayload.user_id;
  }

  public isAdmin(): boolean{
    const currentUserAccessToken: string = this.getAccessToken();
    if (currentUserAccessToken == null) return false;

    const currentUserAccessTokenPayload: DecodedTokenPayload = this.decodeTokenPayload(currentUserAccessToken);
    return currentUserAccessTokenPayload.isAdmin;
  }

  public isSuperUser(): boolean{
    const currentUserAccessToken: string = this.getAccessToken();
    if (currentUserAccessToken == null) return false;

    const currentUserAccessTokenPayload: DecodedTokenPayload = this.decodeTokenPayload(currentUserAccessToken);
    return currentUserAccessTokenPayload.isSuperUser;
  }

  public getCurrentUserName(): string{
    const currentUserAccessTokenPayload: DecodedTokenPayload = this.getDecodedAccessTokenPayload();
    return currentUserAccessTokenPayload?.user_name;  
  }

  public isCampaignMember(campaignName: string): boolean{
    const role: CampaignRole = this.getCampaignRole(campaignName);
    return this.isSuperUser() || this.isAdmin() || role === CampaignRole.MEMBER || role === CampaignRole.ADMIN;
  }

  public isCampaignAdmin(campaignName: string): boolean{
    return this.isSuperUser() || this.isAdmin() || this.getCampaignRole(campaignName) === CampaignRole.ADMIN;
  }

  public isCampaignGuest(campaignName: string): boolean{
    return this.isSuperUser() || this.isAdmin() || this.getCampaignRole(campaignName) === CampaignRole.GUEST;
  }

  public getCampaignRole(campaignName: string): CampaignRole{
    const memberships: any = this.getCampaignMemberships();
    if (memberships == null) return null;

    const role: string = memberships[campaignName.toLowerCase()];
    return CampaignRole[role?.toUpperCase()]
  }

  /**Retrieves campaign memberships of a user from their token */
  public getCampaignMemberships(): any{
    const currentUserAccessTokenPayload: DecodedTokenPayload = this.getDecodedAccessTokenPayload();
    return currentUserAccessTokenPayload?.campaign_memberships;
  }

  public isTokenExpired(token: string): boolean{
    const payload: DecodedTokenPayload = this.decodeTokenPayload(token);
    const expiryTimestamp = payload.exp;
    const currentTimestamp = Math.floor((new Date).getTime()/1000);
    if (currentTimestamp >= expiryTimestamp){
      console.log(`${payload.token_type} Token is expired. Request timestamp: ${new Date(currentTimestamp*1000).toString()}. Token expiry timestamp: ${new Date(expiryTimestamp*1000).toString()}`)
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

  private getDecodedAccessTokenPayload(): DecodedTokenPayload{
    const currentUserAccessToken: string = this.getAccessToken();
    if(currentUserAccessToken == null) return null;

    return this.decodeTokenPayload(currentUserAccessToken);
  }
}
