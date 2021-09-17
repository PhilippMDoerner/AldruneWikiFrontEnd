import { TokenService } from 'src/app/services/token.service';
import { CampaignRole } from 'src/app/app.constants';
import { Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/** This small library's purpose is solely to allow adding quick checks on whether a user has a specific permission or not
 * This is solely intended for usage inside of components that apply the Mixin Below
 */

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