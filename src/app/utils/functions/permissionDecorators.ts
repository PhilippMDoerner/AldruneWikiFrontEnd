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
        this.isAdminOrSuperUser = this.tokenService.isAdmin() || this.tokenService.isSuperUser();

        if (this.isAdminOrSuperUser){
            this.hasCreatePermission = true;
            this.hasViewPermission = true;
            this.hasUpdatePermission = true;
            this.hasDeletePermission = true;        
        } else {
            const memberships = this.tokenService.getCampaignMemberships();
            const campaignName: string = this.route.snapshot.params.campaign;
            this.campaignRole = memberships[campaignName.toLowerCase()];

            this.hasCreatePermission = this.userHasCreatePermission();
            this.hasViewPermission = this.userHasViewPermission();
            this.hasUpdatePermission = this.userHasUpdatePermission();
            this.hasDeletePermission = this.userHasDeletePermission();
        }

    }

    userHasUpdatePermission = () => {
        return [CampaignRole.ADMIN, CampaignRole.MEMBER].includes(this.campaignRole);
    }

    userHasViewPermission = () => {
        return [CampaignRole.ADMIN, CampaignRole.MEMBER, CampaignRole.GUEST].includes(this.campaignRole);
    }

    userHasDeletePermission = () => {
        return [CampaignRole.ADMIN, CampaignRole.MEMBER].includes(this.campaignRole);
    }

    userHasCreatePermission = () => {
        return [CampaignRole.ADMIN, CampaignRole.MEMBER].includes(this.campaignRole);
    }
}