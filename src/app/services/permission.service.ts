import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Constants } from '../app.constants';
import { DecodedTokenPayload } from '../models/jwttoken';
import { RoutingService } from './routing.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

  constructor(
    private routingService: RoutingService,
    private tokenService: TokenService
  ) { }

  canActivate(): boolean{
    if (!this.isUserLoggedIn()){
      this.routingService.routeToPath('login');
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
    private tokenService: TokenService,
    public routingService: RoutingService,
  ){}

  canActivate(route: ActivatedRouteSnapshot): boolean{
    if (!this.isUserLoggedIn()) {
      this.routingService.routeToPath('login');
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



@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{
  //Administrative Permissions are special in that their values are booleans. You either are, or aren't an admin.
  constructor(
    private tokenService: TokenService,
    public routingService: RoutingService,
  ){}

  canActivate(route: ActivatedRouteSnapshot): boolean{
    if (!this.isUserLoggedIn()) {
      this.routingService.routeToPath('login');
      return false;
    }

    const requiredAdminPermissions: string[] = this.getAdminPermissionsForRoute(route);
    const hasRequiredPermissions: boolean = this.hasAdminPermissions(requiredAdminPermissions);
    
    if(!hasRequiredPermissions){
      this.routingService.routeToPath('home1');
    }

    return hasRequiredPermissions;
  }

  isUserLoggedIn(): boolean{
    return this.tokenService.hasValidJWTToken();
  }

  getAdminPermissionsForRoute(route: ActivatedRouteSnapshot): string[]{
    const requiredAdministrativePermissions: string[] = [];
    
    if (route.routeConfig.data.hasOwnProperty("requiredPermissions")){
      const allRequiredPermissions: string[] = route.routeConfig.data.requiredPermissions;
      if (allRequiredPermissions.includes(Constants.adminPermission)) requiredAdministrativePermissions.push(Constants.adminPermission);
      if (allRequiredPermissions.includes(Constants.superuserPermission)) requiredAdministrativePermissions.push(Constants.superuserPermission);
    }

    return requiredAdministrativePermissions
  }

  hasAdminPermissions(requiredAdminPermissions: string[]): boolean{
    //For SuperUsers
    const userIsSuperUser: boolean = this.tokenService.isSuperUser();
    if(userIsSuperUser) return true

    //For Admins (Section is only reached by users that are admins, but aren't superusers)
    const userIsAdmin: boolean = this.tokenService.isAdmin();
    const requiresAdminPermission = requiredAdminPermissions.includes(Constants.adminPermission);
    const requiresSuperUserPermission = requiredAdminPermissions.includes(Constants.superuserPermission);

    const hasRequiredAdminPermission = (requiresAdminPermission) ? userIsAdmin : true;
    const hasRequiredSuperUserPermission = (requiresSuperUserPermission) ? false : true; //If it needs superuserpermission, admin's don't have it

    return hasRequiredAdminPermission && hasRequiredSuperUserPermission
  }
}
