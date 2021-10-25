import { Directive, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { first } from "rxjs/operators";
import { Constants } from "src/app/app.constants";
import { ApiObject, ArticleObject } from "src/app/models/base-models";
import { CampaignObject } from "src/app/models/campaign";
import { CampaignService } from "src/app/services/campaign.service";
import { GenericObjectService } from "src/app/services/generic-object.service";
import { GenericService } from "src/app/services/generic.service";
import { GlobalUrlParamsService } from "src/app/services/global-url-params.service";
import { RoutingService } from "src/app/services/routing.service";
import { TokenService } from "src/app/services/token.service";
import { WarningsService } from "src/app/services/warnings.service";
import { PermissionUtilityFunctionMixin } from "./permissionDecorators";

//TODO: Move all this ngoninit and ngondestroy logic from all the update pages to this page
@Directive()
export class ArticleFormMixin extends PermissionUtilityFunctionMixin implements OnInit{
    //URLs
    updateCancelUrl: string;
    creationCancelUrl: string;

    constants = Constants;
    formState: string;

    campaign: CampaignObject = this.route.snapshot.data["campaign"];

    userModelClass: any;
    userModel: ArticleObject; //A model of article-data for the user to edit
    serverModel: any; //A model of article-data from the server if there are update conflicts with the userModel

    formlyFields: FormlyFieldConfig[];

    constructor(
        public router: Router,
        public routingService: RoutingService,
        public warnings: WarningsService,
        public articleService: GenericService | GenericObjectService,
        public campaignService: CampaignService,
        public globalUrlParam: GlobalUrlParamsService,
        public route: ActivatedRoute,
        tokenService: TokenService,
      ) { 
        super(tokenService, route);
        const isUpdateRoute : boolean = this.router.url.includes("update");
        this.formState = isUpdateRoute ? Constants.updateState : Constants.createState;
      }

    ngOnInit(): void{
        this.userModel = this.route.snapshot.data["modelData"];

        const params: Params = this.route.snapshot.params;
        this.updateRouterLinks(this.campaign.name, this.userModel, params);
    }

    getQueryParameters(params: Params): object{
        return {name: params.name};
    }

    /** This function exists solely as a hook to be overwritten */
    updateRouterLinks(campaignName: string, userModel: ArticleObject, params: Params): void {}


    forceFieldRefresh(): void{
        this.userModel = {...this.userModel};
    }

    isInCreateState(): boolean{
        return this.formState === Constants.createState;
    }

    isInUpdateState(): boolean{
        return this.formState === Constants.updateState;
    }

    isInOutdatedUpdateState(): boolean{
        return this.formState === Constants.outdatedUpdateState;
    }

    /**
     * @description Determines which action is to be taken upon submission: create or update an article
     */
    onSubmit(){
        if(this.isInUpdateState() || this.isInOutdatedUpdateState()){
            this.articleUpdate(this.userModel);
        } else if(this.isInCreateState()){
            this.articleCreate(this.userModel);
        }
    }

    /**
     * @description Sends PUT request to update the article in the backend with the data currently in the userModel.
     * @param {any} userModel An article to be updated. MUST have its "pk" attribute defined.
     */
    articleUpdate(userModel: any){
        if(userModel.pk == null) throw `Invalid userModel Exception. The userModel provided here does not have a primary
        key defined. This primary key is necessary to update the correct article in the database. Please contact the developer`;

        const executionContext = this;

        this.articleService.patch(userModel.pk, userModel).pipe(first()).subscribe(
            (response: ApiObject) => this.onUpdateSuccess(response, executionContext),
            (errorResponse: any) => this.onUpdateError(errorResponse, executionContext)
        )
    }

    /**
     * @description Sends POST request to create the article in the backend with the data currently in the userModel.
     * @param {any} userModel An article to be created
     */
    articleCreate(userModel: any){
        const executionContext = this;
        this.articleService.create(userModel).pipe(first()).subscribe(
            (response: ApiObject) => this.onCreationSuccess(response, executionContext),
            (errorResponse: any) => this.onCreationError(errorResponse, executionContext)
        )
    }

    /**
     * @description Callback function called when an article update request completes successfully. 
     * Routes to the page that shall be visited after the update completes.
     * @param {ApiObject} updatedArticle - The updated article
     */
    onUpdateSuccess(updatedArticle: ApiObject, self: any){
        self.routingService.routeToApiObject(updatedArticle);
    }

    /**
     * @description Callback function called when an article update request fails
     * Handles error in some manner.
     * @param {any} errorResponse - The error response
     */
    onUpdateError(errorResponse: any, self: any){
        self.baseErrorCallback(errorResponse);
    }

    /**
     * @description Callback function called when an article create request completes successfully
     * Routes to the page that shall be visited after the update completes.
     * @param {ApiObject} createdArticle - The newly created article
     */
    onCreationSuccess(createdArticle: ApiObject, self: ArticleFormMixin){
        self.routingService.routeToApiObject(createdArticle)    
    }

    /**
     * @description Callback function called when an article create request fails.
     * Handles error in some manner.
     * @param {any} errorResponse - The error response
     */
    onCreationError(errorResponse: any, self: ArticleFormMixin){
        self.baseErrorCallback(errorResponse);
    }

    /**
     * @description Handles errors. If the error is a HTTP409, it tries to recover by setting the state to
     * outdatedUpdateState, allowing the user to compare their version with the server version and re-send the request
     * after correction. For any other error it just display the warning text.
     * @param article The article object
     */
    private baseErrorCallback(errorResponse: any){
        const isOutdatedUpdateError = errorResponse?.status === 409;
        if (isOutdatedUpdateError){
            this.serverModel = errorResponse.error;
            this.formState = Constants.outdatedUpdateState;
        } else {
            this.warnings.showWarning(errorResponse)
        }
    }
    
    /**
     * @description Executes when somebody hits the cancel button on the form.
     * @param context - optional parameter. REQUIRED to be passed from a child-service if it is overwritten. Grants an 
     * execution context which is the object that calls this function, allowing access to properties and methods of
     * articleFormMixin and the calling child.
     */
    //TODO: Find a more elegant solution than passing an execution context
    onCancel(context?: any){
        const isCalledFromOverwritingFunction = this.routingService == null;
        context = isCalledFromOverwritingFunction ? context : this;
        const router: Router = context.router;

        if (context.isInUpdateState() || context.isInOutdatedUpdateState()){
            router.navigateByUrl(this.updateCancelUrl);
        } else {
            router.navigateByUrl(this.creationCancelUrl);
        } 
    }
}