import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Constants } from '../app.constants';
import { DecodedTokenPayload } from '../models/jwttoken';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  canActivate(): boolean{
    if (!this.isUserLoggedIn()){
      this.router.navigateByUrl(Constants.getRoutePath(this.router, 'login'));
      return false;
    }

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
    private router: Router,
    private tokenService: TokenService
  ){}

  canActivate(route: ActivatedRouteSnapshot): boolean{
    if (!this.isUserLoggedIn()) {
      this.router.navigateByUrl(Constants.getRoutePath(this.router, 'login'));
      return false;
    }

    const requiredPermissions: string[] = this.getPermissionsForRoute(route);
    return this.hasPermissions(requiredPermissions);
  }

  isUserLoggedIn(): boolean{
    return this.tokenService.hasValidJWTToken();
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
    const currentUserAccessToken: string = TokenService.getAccessToken();
    if (currentUserAccessToken === null){
      return [];
    }
    const decodedAccessToken: DecodedTokenPayload = TokenService.decodeTokenPayload(currentUserAccessToken);
    return decodedAccessToken.permissions;
  }
}
