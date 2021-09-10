import { Directive, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { filter, first } from "rxjs/operators";
import { Constants } from "src/app/app.constants";
import { ArticleObject } from "src/app/models/base-models";
import { CampaignOverview } from "src/app/models/campaign";
import { GenericObjectService } from "src/app/services/generic-object.service";
import { GenericService } from "src/app/services/generic.service";
import { GlobalUrlParamsService } from "src/app/services/global-url-params.service";
import { RoutingService } from "src/app/services/routing.service";
import { WarningsService } from "src/app/services/warnings.service";
import { PermissionUtilityFunctionMixin } from "./permissionDecorators";

@Directive()
export class ArticleMixin extends PermissionUtilityFunctionMixin implements OnInit, OnDestroy{
    constants = Constants;
    parameter_subscription: Subscription;
    globalParamSubscription: Subscription;

    queryParameterName: string = "name";
    articleData: ArticleObject;
    isLoadingArticleData: boolean = false;

    campaign: CampaignOverview;

    textfieldFormStateSubject: BehaviorSubject<string> = new BehaviorSubject(Constants.displayState);

    deleteRoute: { routeName: string, params: any }; //Data to generate route to go to to if deletion of article succeeds

    constructor(
        public articleService: GenericObjectService | GenericService,
        public route: ActivatedRoute,
        public routingService: RoutingService,
        public warnings: WarningsService,
        public globalUrlParams: GlobalUrlParamsService
    ){
        super();
    }

    /**
     * The Callback Order:
     * globalUrlParams.getCampaigns - Ensures through the filter on it that there must first be a campaign overview set. Sets up subscription so that campaign changes update the global value, but trigger no re-subscription to the route as that will be already set up the first time a campaign value comes around
     *      --> afterBackgroundDataLoaded - Called whenever campaign changes. Ensures campaign is set and sets up the subscription to params to update the page whenever the params change
     *      --> onArticleRouteChange - Called whenever the route changes. 
     *      --> loadArticleData
     */
    ngOnInit(): void{
        this.globalUrlParams.getCampaigns()
            .pipe(
                filter((campaigns: CampaignOverview[]) => campaigns != null),
                first()
            )
            .subscribe((_) => {
                this.globalParamSubscription = this.globalUrlParams.getCurrentCampaign()
                    .pipe(filter(campaign => campaign != null))
                    .subscribe((campaign: CampaignOverview) => this.afterBackgroundDataLoaded(campaign));
            });
    }

    /**
     * @description Fired after it has been assured that campaignoverview set has been loaded. "this.campaign" is set within this callback
     * as is the loading of article data. If you wish to work with campaign data, do it after this callback.
     */
    async afterBackgroundDataLoaded(campaign: CampaignOverview): Promise<void>{
        this.campaign = campaign;

        console.log("Got campaign, now loading url parameters")
        console.log(this.campaign);

        const parameterSubcsriptionNeedsToBeCreated = this.parameter_subscription == null;
        if(!parameterSubcsriptionNeedsToBeCreated) return;
        
        this.parameter_subscription = this.route.params
            .subscribe((params: Params) => this.onArticleRouteChange(this.campaign, params));
    }

    async onArticleRouteChange(campaign: CampaignOverview, params: Params){
        console.log(`Setting up try catch for load article data while loading is ${this.isLoadingArticleData}`)
        if(this.isLoadingArticleData) return;

        this.updateOnDeleteRouteParameters(campaign, params);

        this.isLoadingArticleData = true;

        try{
            await this.loadArticleData(campaign, params);
        } catch(error) {
            this.routingService.routeToErrorPage(error);
        } finally{
            this.isLoadingArticleData = false;
        }
    }

    /**
     * @description loads the data for the current article. Is fired either when the route changes
     */
    async loadArticleData(campaign: CampaignOverview, params: Params): Promise<void>{
        console.log(`Attempting loading Article Data for campaign ${campaign.name} with params:`);
        console.log( this.getQueryParameter(params));
        const campaignName: string = campaign.name;
        if(campaignName == null) return;

        const queryParameter  = this.getQueryParameter(params);
        if(queryParameter == null) return;

        this.articleService.readByParam(campaignName, queryParameter)
            .pipe(first())
            .subscribe((articleData: ArticleObject) => this.onArticleLoadFinished(articleData));
    }

    getQueryParameter(params: Params){
        return {name: params[this.queryParameterName]};
    }

    updateOnDeleteRouteParameters(campaign: CampaignOverview, params: Params): void{
        this.deleteRoute.params.campaign = campaign.name;
    }

    /**
     * @description Executes after the article data has been loaded, but not been assigned yet to this.articleData
     * this.campaigns will already be available.
     */
    onArticleLoadFinished(articleData: ArticleObject): void{
        this.articleData = articleData;
    }


    onDescriptionUpdate(updatedDescription: string){
        const descriptionPatch = {description: updatedDescription, update_datetime: this.articleData.update_datetime};
        this.articleService.patch(this.articleData.pk, descriptionPatch).pipe(first()).subscribe(
          (article: ArticleObject) => {this.articleData = article},
          error =>{
            this.onDescriptionUpdateError(error)
          }
        );
    }

    onDescriptionUpdateError(errorResponse: any){
        const isOutdatedUpdateError = errorResponse?.status === 409;
        if(isOutdatedUpdateError){ 
            //Update the description in your local data with that from the server
            const serverArticleVersion: ArticleObject = errorResponse.error;
            this.articleData = serverArticleVersion;

            //Change the formstate of the textfield which now has the server article version and its own
            this.textfieldFormStateSubject.next(Constants.outdatedUpdateState);
        } else {
            this.warnings.showWarning(errorResponse);
        }
    }

    deleteArticle(){
        this.articleService.delete(this.articleData.pk).pipe(first()).subscribe(
          response => this.routingService.routeToPath(this.deleteRoute.routeName, this.deleteRoute.params),
          error => this.warnings.showWarning(error)
        )
    }


    ngOnDestroy(){
        if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
        if (this.globalParamSubscription) this.globalParamSubscription.unsubscribe();
    }
}