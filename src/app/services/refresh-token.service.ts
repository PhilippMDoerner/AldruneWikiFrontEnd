import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, first, map, shareReplay, tap } from 'rxjs/operators';
import { EncodedJWTToken } from '../models/jwttoken';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {
  private tokenRefreshInProgress: boolean = false;
  private refreshAccessTokenSubject: Subject<string> = new BehaviorSubject<string>(null);

  constructor(private tokenService: TokenService) { }

  /** 
   * Sends out HTTP request for new Access Token. Returns Observable with only that AccessToken.
   * As a side-effect (in tap) it also sets updates the value for refreshAcessTokenSubject for 
   * other waiting requests 
   */
  public refreshAccessToken(): Observable<string>{
    this.startWaitForRefreshState();

    return this.tokenService.refreshToken().pipe(
      tap((jwtToken: EncodedJWTToken) => {
        this.tokenService.setRefreshToken(jwtToken.refresh);
      }),
      map((tokenResponse: EncodedJWTToken) => {
        return tokenResponse.access;
      }),
      tap((accessToken: string) => {
        this.tokenService.setAccessToken(accessToken);
        this.endWaitForRefreshState(accessToken);
      }),
    )
  }

  private startWaitForRefreshState(): void{
    this.tokenRefreshInProgress = true;
    this.refreshAccessTokenSubject.next(null);
  }

  private endWaitForRefreshState(newAccessToken: string): void{
    this.tokenRefreshInProgress = false;
    this.refreshAccessTokenSubject.next(newAccessToken);
  }

  /** 
   * Instructs to wait until Access Token was refreshed and then returns an Observable that will
   * contain that access token's value
  */
  public waitForAccessTokenRefresh(): Observable<string>{
    return this.refreshAccessTokenSubject.pipe(
      filter(result => result !== null),
      first()
    )
  }

  public tokenNeedsRefresh(accessToken: string): boolean{
    const accessTokenExpired: boolean = this.tokenService.isTokenExpired(accessToken);
    return accessTokenExpired && !this.tokenRefreshInProgress;
  }

  public hasToWaitForRefresh(accessToken: string): boolean{
    const accessTokenExpired: boolean = this.tokenService.isTokenExpired(accessToken);
    return accessTokenExpired && this.tokenRefreshInProgress;
  }
}
