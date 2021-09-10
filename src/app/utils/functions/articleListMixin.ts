import { Directive, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { Subscription } from "rxjs";
import { filter, first, map, tap } from "rxjs/operators";
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
export class ArticleListMixin extends PermissionUtilityFunctionMixin implements OnInit, OnDestroy{
    constants = Constants;
    isLoadingArticles: boolean = false;

    campaign: CampaignOverview;
    
    articles: ArticleObject[];
    showArticleArray: boolean[];
    articleModelClass: any;

    parameterSubscription: Subscription;
    globalParamSubscription: Subscription;

    articleStarterTitle = "New Article Item";
    articlesSortProperty = "name";

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
        console.log(this);
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

        const parameterSubcsriptionNeedsToBeCreated = this.parameterSubscription == null;
        if(!parameterSubcsriptionNeedsToBeCreated) return;
        
        this.parameterSubscription = this.route.params
            .subscribe((params: Params) => this.onArticleRouteChange(this.campaign, params));
    }

    async onArticleRouteChange(campaign: CampaignOverview, params: Params){
        console.log(`Setting up try catch for load article data while loading is ${this.isLoadingArticles}`)
        if(this.isLoadingArticles) return;

        this.isLoadingArticles = true;

        try{
            await this.loadArticleData(campaign, params);
        } catch(error) {
            this.routingService.routeToErrorPage(error);
        } finally{
            this.isLoadingArticles = false;
        }
    }

    /**
     * @description loads the data for the current article. Is fired either when the route changes
     */
    async loadArticleData(campaign: CampaignOverview, params: Params): Promise<void>{
        console.log(`Attempting loading Article Data for campaign ${campaign.name}:`);

        const campaignName: string = campaign.name;
        if(campaignName == null) return;

        this.articleService.campaignList(campaignName)
            .pipe(
                first(),
                tap((articles: ArticleObject[]) => this.showArticleArray = articles.map(article => true)),
                map((articles: ArticleObject[]) => {
                    const sortedArticles: ArticleObject[] = articles.sort((article1, article2) => {
                        return article1[this.articlesSortProperty] < article2[this.articlesSortProperty] ? -1 : 1;
                    });
                    return sortedArticles;
                })
            )
            .subscribe(
                (articles: ArticleObject[]) => this.onArticleLoadFinished(articles),
                error => this.routingService.routeToErrorPage(error)
            );
    }

    /**
     * @description Executes after the article data has been loaded, but not been assigned yet to this.articleData
     * this.campaigns will already be available.
     */
    onArticleLoadFinished(articles: ArticleObject[]): void{
        this.articles = articles;
    }



    //ARTICLE MODIFICATION LOGIC
    addArticle(){
        const newArticle: ArticleObject = new this.articleModelClass();
        newArticle.name = this.articleStarterTitle;
        this.articles.push(newArticle);
    }


    onArticleDelete(index: number){
        this.articles.splice(index, 1);
    }


    ngOnDestroy(){
        if (this.parameterSubscription) this.parameterSubscription.unsubscribe();
        if (this.globalParamSubscription) this.globalParamSubscription.unsubscribe();
    }
}