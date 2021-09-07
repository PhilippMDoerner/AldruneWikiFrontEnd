import { Route } from "@angular/router";
import { CampaignRole } from "./app.constants";
import { AdminGuardService, CampaignGuardService, LoginGuardService, PermissionGuardService } from "./services/permission.service";


//Route Data Models
interface NamedRouteData {
    name: string;
}

interface RoleRouteData extends NamedRouteData{
    requiredRole: CampaignRole;
}


//Route Models
export interface GeneralRoute extends Route{
	data: NamedRouteData;
    canActivate?: [typeof LoginGuardService]
}

export interface AdminRoute extends Route{
    data: NamedRouteData;
    canActivate: [typeof AdminGuardService]
}


export interface CampaignRoute extends Route {
	data: RoleRouteData
	canActivate: [typeof CampaignGuardService];
}
