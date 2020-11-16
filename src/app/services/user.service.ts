import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { User } from "src/app/models/user";
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = `${Constants.wikiApiUrl}/user`;
  jwtTokenUrl: string = Constants.wikiTokenUrl;
  refreshTokenUrl: string = Constants.wikiTokenRefreshUrl;

  constructor(private http : HttpClient) { }

  getUsers(){
    return this.http.get<User[]>(this.userUrl);
  }

  setJWTToken(userModel: User): void{
    this.http.post(this.jwtTokenUrl, {username: userModel.username, password: userModel.password}).pipe(first()).subscribe((token: any) => {
      this.setTokens(token);
    });
  }

  setTokens(jwtToken: {access: string, refresh: string}){
    localStorage.setItem('access_token', jwtToken.access);
    localStorage.setItem('refresh_token', jwtToken.refresh);
  }

  getRefreshToken(): string{
    return localStorage.getItem('refresh_token');
  }

  refreshToken(): Observable<{access: string, refresh: string}>{
    const refreshToken = this.getRefreshToken();
    return this.http.post<{access, refresh}>(Constants.wikiTokenRefreshUrl, {refresh: refreshToken});
  }

  getAccessToken(): string{
    return localStorage.getItem('access_token');
  }

  setAccessToken(accessToken: string): void{
    localStorage.setItem('access_token', accessToken);
  }


  isTokenExpired(token: string): boolean{
    const [encodedHeader, encodedPayload, encodedSignature] = token.split('.');
    const payload = JSON.parse(atob(encodedPayload));
    const expiryTimestamp = payload.exp;
    const currentTimestamp = Math.floor((new Date).getTime()/1000);
    return currentTimestamp >= expiryTimestamp;
  }
}
