import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Params, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { filter, first } from "rxjs/operators";
import { CampaignObject, CampaignOverview } from "src/app/models/campaign";
import { CampaignService } from "src/app/services/campaign.service";
import { GlobalUrlParamsService } from "src/app/services/global-url-params.service";
import { BaseArticleResolver } from "./base-resolvers";


@Injectable({ providedIn: 'root' })
export class CampaignResolver implements Resolve<CampaignOverview> {
    constructor(
        private globalUrlParams: GlobalUrlParamsService,
    ) {}

    async resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<any>{
        await this.waitForAllCampaignDataToLoad();

        const campaignName: string = route.params.campaign;
        this.globalUrlParams.updateCurrentlySelectedCampaign(campaignName);

        return this.globalUrlParams.getCurrentCampaign()
            .pipe(filter(campaign => campaign != null), first()).toPromise();
    }

    /**
     * @description Waits for the list of total campaigns available to the user to finish loading. This is necessary to 
     * ensure there is a campaign that that can be retrieved via "getCurrentCampaign".
     */
    async waitForAllCampaignDataToLoad(){
        await this.globalUrlParams.getCampaigns()
            .pipe(
                filter((campaigns: CampaignOverview[]) => campaigns != null),
                first()
            )
            .toPromise();
    }
}


@Injectable({ providedIn: 'root' })
export class CampaignDetailResolver {
    constructor( private campaignService: CampaignService ) {}
   
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<CampaignObject>{
        const campaignName: string = route.params.campaign;

        return this.campaignService.readByParam(campaignName);
    } 
}

@Injectable({ providedIn: 'root' })
export class CampaignStatisticsResolver {
    constructor( private campaignService: CampaignService ) {}
   
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<CampaignObject>{
        const campaignName: string = route.params.campaign;

        return this.campaignService.statistics(campaignName);
    } 
}