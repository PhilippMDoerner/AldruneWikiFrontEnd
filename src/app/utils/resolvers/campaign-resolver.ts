import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Params, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { filter, first } from "rxjs/operators";
import { ArticleObject } from "src/app/models/base-models";
import { CampaignObject, CampaignOverview } from "src/app/models/campaign";
import { CampaignService } from "src/app/services/campaign.service";
import { GlobalUrlParamsService } from "src/app/services/global-url-params.service";
import { BaseArticleResolver, BaseArticleUpdateResolver } from "./base-resolvers";


@Injectable({ providedIn: 'root' })
export class CampaignResolver implements Resolve<CampaignOverview> {
    constructor(
        private globalUrlParams: GlobalUrlParamsService,
    ) {}

    async resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<CampaignOverview>{
        return await this.globalUrlParams.getCurrentCampaign();
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

@Injectable({ providedIn: 'root' })
export class CampaignUpdateResolver extends BaseArticleUpdateResolver{
    dataModelClass = CampaignObject;

    constructor( 
        private campaignService: CampaignService,
        router: Router,
        globalUrlParamsService: GlobalUrlParamsService,
    ) {
        super(campaignService, globalUrlParamsService);
    }

    async resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<any>{        
        const campaign: CampaignOverview = await super.resolve(route, state);

        const modelData = this.isUpdateRoute(state) ? this.fetchData(campaign, null) : this.createData(campaign, null);
        return modelData;
    }

    async createData(campaign: CampaignOverview, queryParameters: any): Promise<ArticleObject>{
        const dataModel: ArticleObject = new this.dataModelClass();
        return dataModel;
    }

    fetchData(campaign: CampaignOverview, queryParameters: any): Promise<ArticleObject>{
        return this.campaignService.readByParam(campaign.name).toPromise();
    }
}