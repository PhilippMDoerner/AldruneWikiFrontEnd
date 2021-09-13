import { DecodedTokenPayload } from 'src/app/models/jwttoken';
import { TokenService } from 'src/app/services/token.service';
import { CampaignRole, Constants } from 'src/app/app.constants';
import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/** This small library's purpose is solely to allow adding quick checks on whether a user has a specific permission or not
 * This is solely intended for usage inside of components that apply the Decorator/Mixin Below
 */

export function CurrentUserHasPermissions(requiredPermissions: string[]): Function{
    /**Decorator to execute hasPermissions before the actual function. The original function shall
     * Only run if the user has the required permissions */
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){

        const originalMethod = descriptor.value;
        descriptor.value = function(){
            if (!hasPermissions(requiredPermissions)){
                alert("You do not have the required permission to perform this action!");   
                return;
            }

            return  originalMethod.apply(this, arguments);
        }
        return descriptor;
    }
}

export function hasPermissions(requiredPermissions: string[]): boolean{
    const ownedPermissions = getCurrentUserPermissions();

    for (let requiredPermission of requiredPermissions){
        if (!ownedPermissions.includes(requiredPermission)){
            return false;
        }
    }

    return true;
}

function getCurrentUserPermissions(): string[]{
    const currentUserAccessToken: string = TokenService.getAccessToken();

    if (currentUserAccessToken === null){
        return [];
    }

    const decodedAccessToken: DecodedTokenPayload = TokenService.decodeTokenPayload(currentUserAccessToken);
    return decodedAccessToken.permissions;
}

//DO NOT USE THIS YET. This decorator is perfectly functional, but it's typing is not yet supported by Typescript!
//Once Typescript supports this you can replace uses of the below PermissionUtilityFunctionMixin with this decorator
export function AddPermissionUtilityFunctions(): Function {
    return (target: Function) => {
        target.prototype.userHasUpdatePermission = () => {
            return hasPermissions([Constants.apiUpdatePermission]);
        }

        target.prototype.userHasViewPermission = () => {
            return hasPermissions([Constants.apiViewPermission]);
        }

        target.prototype.userHasDeletePermission = () => {
            return hasPermissions([Constants.apiDeletePermission]);
        }

        target.prototype.userHasCreatePermission = () => {
            return hasPermissions([Constants.apiCreatePermission]);
        }
    }
}

@Directive()
export class PermissionUtilityFunctionMixin{
    campaignRole: CampaignRole;
    isAdminOrSuperUser: boolean;
    hasUpdatePermission: boolean;
    hasCreatePermission: boolean;
    hasDeletePermission: boolean;
    hasViewPermission: boolean;

    constructor(
        public tokenService: TokenService,
        public route: ActivatedRoute,
    ){
        const memberships = this.tokenService.getCampaignMemberships();
        const campaignName: string = this.route.snapshot.params.campaign;
        this.campaignRole = memberships[campaignName.toLowerCase()];

        this.isAdminOrSuperUser = this.tokenService.isAdmin() || this.tokenService.isSuperUser();
        this.hasCreatePermission = this.userHasCreatePermission();
        this.hasViewPermission = this.userHasViewPermission();
        this.hasUpdatePermission = this.userHasUpdatePermission();
        this.hasDeletePermission = this.userHasDeletePermission();
    }

    userHasUpdatePermission = () => {
        const hasPermissionFromRole: boolean = [CampaignRole.ADMIN, CampaignRole.MEMBER].includes(this.campaignRole);
        return hasPermissionFromRole || this.isAdminOrSuperUser;
    }

    userHasViewPermission = () => {
        const hasPermissionFromRole: boolean = [CampaignRole.ADMIN, CampaignRole.MEMBER, CampaignRole.GUEST].includes(this.campaignRole);
        return hasPermissionFromRole || this.isAdminOrSuperUser;    }

    userHasDeletePermission = () => {
        const hasPermissionFromRole: boolean = [CampaignRole.ADMIN, CampaignRole.MEMBER].includes(this.campaignRole);
        return hasPermissionFromRole || this.isAdminOrSuperUser;
    }

    userHasCreatePermission = () => {
        const hasPermissionFromRole: boolean = [CampaignRole.ADMIN, CampaignRole.MEMBER].includes(this.campaignRole);
        return hasPermissionFromRole || this.isAdminOrSuperUser;
    }
}