import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CampaignRole, Constants } from '../app.constants';
import { CampaignRoute } from '../app.routing-models';
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
    public tokenService: TokenService,
    public routingService: RoutingService,
  ){}

  canActivate(route: ActivatedRouteSnapshot): boolean{
    if (!this.isUserLoggedIn()) {
      this.routingService.routeToPath('login');
      return false;
    }
    
    const hasRequiredPermissions: boolean = this.isGeneralAdmin();
    if(!hasRequiredPermissions){
      this.routingService.routeToPath('campaign-overview');
    }
    return hasRequiredPermissions
  }

  isUserLoggedIn(): boolean{
    return this.tokenService.hasValidJWTToken();
  }

  isGeneralAdmin(): boolean{
    return this.tokenService.isSuperUser() || this.tokenService.isAdmin();
  }
}


//TODO: Make a service, that checks if the user has guest permission on the given stuff
@Injectable({
  providedIn: 'root'
})
export class CampaignGuardService extends AdminGuardService{
  //Administrative Permissions are special in that their values are booleans. You either are, or aren't an admin.
  constructor(
    tokenService: TokenService,
    routingService: RoutingService,
  ){super(tokenService, routingService)}

  canActivate(route: ActivatedRouteSnapshot): boolean{
    if (!this.isUserLoggedIn()) {
      this.routingService.routeToPath('login');//TODO: Replace this to route to a campaign-based login instead that auto-routes to the desired campaign
      return false;
    }

    if(this.isGeneralAdmin()) return true;

    const campaignNameOfRoute: string = route.params.campaign;
    if (campaignNameOfRoute == null) throw "Invalid Route Exception. The campaign-route you're trying to access has no campaign name parameter";

    const hasNoRoleInCampaign: boolean = this.tokenService.getCampaignRole(campaignNameOfRoute) == null;
    console.log(`Your user ${this.tokenService.getCurrentUserName()} has this role ${this.tokenService.getCampaignRole(campaignNameOfRoute)} in campaign ${campaignNameOfRoute}`)
    if (hasNoRoleInCampaign){
      this.routingService.routeToPath('campaign-overview');
      return false;
    }

    const requiredMiniumRole: CampaignRole = route.data.requiredRole; 
    if (requiredMiniumRole == null) throw "Invalid Route Exception. The campaign-route you're trying to access has no defined minimum role needed to access it";

    return this.hasNecessaryRole(campaignNameOfRoute, requiredMiniumRole);
  }

  hasNecessaryRole(campaignName: string, requiredRole: CampaignRole): boolean{
    if(this.isGlobalRole(requiredRole)){
      return this.hasGlobalRoleOrBetter(requiredRole);
    } else {
      return this.hasRoleOrBetter(campaignName, requiredRole);
    }
  }

  hasRoleOrBetter(campaignName: string, role: CampaignRole): boolean{
    const isCampaignAdmin: boolean = this.tokenService.isCampaignAdmin(campaignName);
    const isCampaignMember: boolean = this.tokenService.isCampaignMember(campaignName);
    const isCampaignGuest: boolean = this.tokenService.isCampaignGuest(campaignName);

    if (role === CampaignRole.ADMIN) return isCampaignAdmin;
    if (role === CampaignRole.MEMBER) return isCampaignAdmin || isCampaignMember;
    if (role === CampaignRole.GUEST) return isCampaignAdmin || isCampaignMember || isCampaignGuest;
  }

  hasGlobalRoleOrBetter(role: CampaignRole): boolean{
    return true; //TODO: Implement this
  }

  isGlobalRole(role: CampaignRole): boolean{
    return role === CampaignRole.GLOBALGUEST || role === CampaignRole.GLOBALMEMBER;
  }
}