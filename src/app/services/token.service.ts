import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CampaignRole, Constants } from '../app.constants';
import { UserData, TokenData, CampaignMemberships } from '../models/jwttoken';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private jwtTokenUrl: string = Constants.wikiTokenUrl;
  private refreshTokenUrl: string = Constants.wikiTokenRefreshUrl;
  private ID_IDENTIFIER_PREFIX: string = "id_";

  constructor(private http: HttpClient) { }

  public login(userModel: User): Observable<UserData>{
    const loginData: object = {username: userModel.username, password: userModel.password};
    return this.http.post<UserData>(this.jwtTokenUrl, loginData)
  }

  public refreshUserData(): Observable<UserData>{
    const refreshToken = TokenService.getRefreshToken();
    return this.http.post<UserData>(this.refreshTokenUrl, {refresh: refreshToken.token});
  }

  public invalidateJWTToken(): void{
  //   const jwtToken: EncodedJWTToken = {access: this.getAccessToken(), refresh: this.getRefreshToken()};
  //   return this.http.post(`${this.jwtTokenUrl}/logout`, jwtToken); //This feature is not implemented in the backend
  }

  //static for permissionDecorator.ts
  public static getUserData(): UserData{
    return JSON.parse(localStorage.getItem(Constants.userDataKey));
  }


  public hasTokens(): boolean{
    if (TokenService.getUserData() == null) return false;
    return !!TokenService.getAccessToken() && !!TokenService.getRefreshToken();
  }
  
  public hasValidJWTToken(): boolean{
    if (!this.hasTokens()) return false;
    return !this.isTokenExpired(TokenService.getRefreshToken());
  }

  //static for permissionDecorator.ts
  public static getAccessToken(): TokenData{
    return this.getUserData().accessToken;
  }

  //static for permissionDecorator.ts
  public static getRefreshToken(): TokenData{
    return this.getUserData().refreshToken;
  }



  public setUserData(data: UserData): void{
    localStorage.setItem(Constants.userDataKey, JSON.stringify(data));
  }

  public removeJWTTokenFromLocalStorage(): void{
    localStorage.removeItem(Constants.userDataKey);
  }

  public getCurrentUserPk(): number{
    return TokenService.getUserData().userId;
  }

  public isAdmin(): boolean{
    const data: UserData = TokenService.getUserData();
    return (data == null) ? false : data.isAdmin; 
  }

  public isSuperUser(): boolean{
    const data: UserData = TokenService.getUserData();
    return (data == null) ? false : data.isSuperUser; 
  }

  public getCurrentUserName(): string{
    return TokenService.getUserData()?.userName;
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
    if(campaignName == null) return null;

    const memberships: CampaignMemberships = this.getCampaignMemberships();
    if (memberships == null) return null;

    const role: string = memberships[campaignName.toLowerCase()];
    return CampaignRole[role?.toUpperCase()]
  }

  /**Retrieves campaign memberships of a user from their token */
  public getCampaignMemberships(): CampaignMemberships{
    const data: UserData = TokenService.getUserData();

    const campaignMemberships: CampaignMemberships = {}
    for (const campaignIdentifier of Object.keys(data.campaignMemberships)){
      const isIdIdentifier: boolean = campaignIdentifier.startsWith(this.ID_IDENTIFIER_PREFIX);
      if (! isIdIdentifier){
        campaignMemberships[campaignIdentifier.toLowerCase()] = data.campaignMemberships[campaignIdentifier];
      }
    }
    return campaignMemberships;
  }

  public isAccessTokenExpired(): boolean{
    return this.isTokenExpired(TokenService.getAccessToken());
  }

  public isRefreshTokenExpired(): boolean{
    return this.isTokenExpired(TokenService.getRefreshToken());
  }

  public isTokenExpired(token: TokenData): boolean{
    const expiryTimestamp = token.exp;
    const currentTimestamp = Math.floor((new Date).getTime()/1000);

    const isExpired = currentTimestamp >= expiryTimestamp;
    if (isExpired){
      console.log(`${token.type} Token is expired. Request timestamp: ${new Date(currentTimestamp*1000).toString()}. Token expiry timestamp: ${new Date(expiryTimestamp*1000).toString()}`)
    }
    return isExpired;
  }
}
