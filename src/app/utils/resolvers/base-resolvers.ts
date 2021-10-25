import { ArticleObject } from "src/app/models/base-models";
import { ActivatedRouteSnapshot, Params, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { GenericObjectService } from "src/app/services/generic-object.service";
import { filter, first } from "rxjs/operators";
import { GenericService } from "src/app/services/generic.service";
import { GlobalUrlParamsService } from "src/app/services/global-url-params.service";
import { CampaignOverview } from "src/app/models/campaign";


export class BaseArticleResolver implements Resolve<ArticleObject> {
    constructor(
        public service: GenericObjectService | GenericService,
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<ArticleObject> | Promise<ArticleObject>{
        const params: Params = route.params;
        const campaignName: string = params.campaign;
        const queryParameters: any = this.getQueryParameter(params);

        return this.service.readByParam(campaignName, queryParameters).pipe(first());
    }

    getQueryParameter(params: Params){
        return {name: params.name};
    }
}

export class BaseArticleListResolver implements Resolve<ArticleObject[]> {
    constructor(
        public service: GenericObjectService | GenericService,
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<ArticleObject[]> | Promise<ArticleObject[]>{
        const params: Params = route.params;
        const campaignName: string = params.campaign;

        return this.service.campaignList(campaignName);
    }
}

export class BaseArticleDetailListResolver implements Resolve<ArticleObject[]> {
    constructor(
        public service: GenericObjectService | GenericService,
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<ArticleObject[]> | Promise<ArticleObject[]>{
        const params: Params = route.params;
        const campaignName: string = params.campaign;

        return this.service.campaignDetailList(campaignName);
    }
}


export class BaseArticleUpdateResolver{
    dataModelClass: any;

    constructor( 
        public service: GenericObjectService | GenericService,
        public globalUrlParamsService: GlobalUrlParamsService
    ) {
    }
   
    async resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<any>{
        const params: Params = route.params;
        const queryParameters: object = this.getQueryParameters(params); 
        
        const campaign: CampaignOverview = await this.getCurrentCampaign(route, state);

        const modelData: Promise<ArticleObject> = this.isUpdateRoute(state) ? this.fetchData(campaign, queryParameters) : this.createData(campaign, queryParameters);
        return modelData;
    }

    /** Copied from CampaignResolver */
    async getCurrentCampaign(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<CampaignOverview>{
        await this.waitForAllCampaignDataToLoad();

        const campaignName: string = route.params.campaign;
        this.globalUrlParamsService.updateCurrentlySelectedCampaign(campaignName);

        return this.globalUrlParamsService.getCurrentCampaign()
            .pipe(filter(campaign => campaign != null), first()).toPromise();
    }

    /**
     * @description Waits for the list of total campaigns available to the user to finish loading. This is necessary to 
     * ensure there is a campaign that that can be retrieved via "getCurrentCampaign".
     */
    async waitForAllCampaignDataToLoad(){
        await this.globalUrlParamsService.getCampaigns()
            .pipe(
                filter((campaigns: CampaignOverview[]) => campaigns != null),
                first()
            )
            .toPromise();
    }

    isUpdateRoute(state: RouterStateSnapshot): boolean{
        return state.url.includes("update");
    }

    getQueryParameters(params: Params): object{
        return {name: params.name};
    }

    async createData(campaign: CampaignOverview, queryParameters: any): Promise<ArticleObject>{    
        if (this.dataModelClass == null) throw new Error(`Undefined dataModelClass in modelData Resolver. You tried to 
        create a model for a create route without telling in the resolver for the modelData which class the model is
        supposed to have`);

        const dataModel: ArticleObject = new this.dataModelClass();
        dataModel.campaign = campaign.pk;
        return dataModel;
    }

    async fetchData(campaign: CampaignOverview, queryParameters: any): Promise<ArticleObject>{
        return this.service.readByParam(campaign.name, queryParameters).toPromise();
    }
}