import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Constants } from '../app.constants';
import { DecodedTokenPayload } from '../models/jwttoken';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

  constructor(
    private tokenService: TokenService
  ) { }

  canActivate(): boolean{
    return this.isUserLoggedIn();
  }

  isUserLoggedIn(): boolean{
    return this.tokenService.hasValidJWTToken();
  }
}

@Injectable({
  providedIn: 'root'
})
export class PermissionGuardService implements CanActivate{

  constructor(
    private tokenService: TokenService
  ){}

  canActivate(route: ActivatedRouteSnapshot): boolean{
    const requiredPermissions: string[] = this.getPermissionsForRoute(route);
    return this.hasPermissions(requiredPermissions);
  }

  getPermissionsForRoute(route: ActivatedRouteSnapshot): string[]{
    if (route.routeConfig.data.hasOwnProperty("requiredPermissions")){
      return route.routeConfig.data.requiredPermissions;
    }
    return []
  }

  hasPermissions(requiredPermissions: string[]): boolean{
    const ownedPermissions = this.getCurrentUserPermissions();

    for (let requiredPermission of requiredPermissions){
      if (!ownedPermissions.includes(requiredPermission)){
        return false;
      }
    }

    return true;
  }

  getCurrentUserPermissions(): string[]{
    const currentUserAccessToken: string = this.tokenService.getAccessToken();
    console.log(currentUserAccessToken);
    if (currentUserAccessToken === null){
      return [];
    }
    const decodedAccessToken: DecodedTokenPayload = this.tokenService.decodeTokenPayload(currentUserAccessToken);
    return decodedAccessToken.permissions;
  }
}
