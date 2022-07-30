import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { CampaignRole } from '../app.constants';
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
    const isLoggedIn: boolean = this.isUserLoggedIn();
    if (!isLoggedIn){
      this.routingService.routeToPath('login');
    }

    return isLoggedIn;
  }

  isUserLoggedIn(): boolean{
    return this.tokenService.hasValidJWTToken();
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
      this.routingService.routeToPath('login');
      return false;
    }

    if(this.isGeneralAdmin()) return true;

    const campaignNameOfRoute: string = route.params.campaign;
    if (campaignNameOfRoute == null) throw "Invalid Route Exception. The campaign-route you're trying to access has no campaign name parameter";

    const hasNoRoleInCampaign: boolean = this.tokenService.getCampaignRole(campaignNameOfRoute) == null;
    if (hasNoRoleInCampaign){
      this.routingService.routeToPath('campaign-overview');
      return false;
    }

    const requiredMiniumRole: CampaignRole = route.data.requiredRole; 
    if (requiredMiniumRole == null) throw "Invalid Route Exception. The campaign-route you're trying to access has no defined minimum role needed to access it";

    return this.hasRoleOrBetter(campaignNameOfRoute, requiredMiniumRole);
  }

  hasRoleOrBetter(campaignName: string, role: CampaignRole): boolean{
    const isCampaignAdmin: boolean = this.tokenService.isCampaignAdmin(campaignName);
    const isCampaignMember: boolean = this.tokenService.isCampaignMember(campaignName);
    const isCampaignGuest: boolean = this.tokenService.isCampaignGuest(campaignName);

    if (role === CampaignRole.ADMIN) return isCampaignAdmin;
    if (role === CampaignRole.MEMBER) return isCampaignAdmin || isCampaignMember;
    if (role === CampaignRole.GUEST) return isCampaignAdmin || isCampaignMember || isCampaignGuest;
  }
}