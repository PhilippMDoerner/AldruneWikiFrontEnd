import { AfterViewInit, Directive, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
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
import { TokenService } from "src/app/services/token.service";
import { WarningsService } from "src/app/services/warnings.service";
import { animateElement } from "./animationDecorator";
import { PermissionUtilityFunctionMixin } from "./permissionDecorators";

@Directive()
export class ArticleMixin extends PermissionUtilityFunctionMixin implements OnInit, AfterViewInit, OnDestroy{
    constants = Constants;
    parameter_subscription: Subscription;
    globalParamSubscription: Subscription;

    queryParameterName: string = "name";
    articleData: ArticleObject;
    isLoadingArticleData: boolean = false;

    campaign: CampaignOverview;

    textfieldFormStateSubject: BehaviorSubject<string> = new BehaviorSubject(Constants.displayState);

    deleteRoute: { routeName: string, params: any }; //Data to generate route to go to to if deletion of article succeeds

    @ViewChild('article') articleElement: ElementRef;

    constructor(
        public articleService: GenericObjectService | GenericService,
        route: ActivatedRoute,
        public routingService: RoutingService,
        public warnings: WarningsService,
        public globalUrlParams: GlobalUrlParamsService,
        tokenService: TokenService,
    ){
        super(tokenService, route);
    }

    /**
     * The Callback Order:
     * globalUrlParams.getCampaigns - Ensures through the filter on it that there must first be a campaign overview set. Sets up subscription so that campaign changes update the global value, but trigger no re-subscription to the route as that will be already set up the first time a campaign value comes around
     *      --> afterBackgroundDataLoaded - Called whenever campaign changes. Ensures campaign is set and sets up the subscription to params to update the page whenever the params change
     *      --> onArticleRouteChange - Called whenever the route changes. 
     *      --> loadArticleData
     */

    ngOnInit(): void{
        this.campaign = this.route.snapshot.data["campaign"];
        this.articleData = this.route.snapshot.data["article"];

        this.updateDynamicVariables(this.campaign, this.articleData, null);
        this.updateOnDeleteRouteParameters(this.campaign, this.route.snapshot.params);
    }

    ngAfterViewInit(): void{
        if(!this.articleElement?.nativeElement) return;

        animateElement(this.articleElement.nativeElement, 'fadeIn')
            .then(_ => this.onInitAnimationEnd());
    }
    
    onInitAnimationEnd(): void{}

    /** This is purely a hook to be overwritten to set static urls */
    updateDynamicVariables(campaign: CampaignOverview, articleData: ArticleObject, params: Params){}

    updateOnDeleteRouteParameters(campaign: CampaignOverview, params: Params): void{
        this.deleteRoute.params.campaign = campaign.name;
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