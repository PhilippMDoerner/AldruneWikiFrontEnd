import { Route } from "@angular/router";
import { CampaignRole } from "./app.constants";
import { AdminGuardService, CampaignGuardService, LoginGuardService } from "./services/permission.service";


//Route Data Models
interface NamedRouteData {
    name: string;
}

interface RoleRouteData extends NamedRouteData{
    requiredRole: CampaignRole;
}

export interface BaseNamedRoute extends Route{
    data: NamedRouteData;
}


//Route Models
export interface GeneralRoute extends BaseNamedRoute{
    canActivate?: [typeof LoginGuardService]
}

export interface AdminRoute extends BaseNamedRoute{
    canActivate: [typeof AdminGuardService]
}


export interface CampaignRoute extends BaseNamedRoute {
	data: RoleRouteData
	canActivate: [typeof CampaignGuardService];
}
