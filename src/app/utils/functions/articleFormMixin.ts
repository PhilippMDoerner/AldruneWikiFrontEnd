import { Directive, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { Constants } from "src/app/app.constants";
import { ApiObject, ArticleObject } from "src/app/models/base-models";
import { CampaignService } from "src/app/services/campaign.service";
import { GenericObjectService } from "src/app/services/generic-object.service";
import { GenericService } from "src/app/services/generic.service";
import { GlobalUrlParamsService } from "src/app/services/global-url-params.service";
import { RoutingService } from "src/app/services/routing.service";
import { WarningsService } from "src/app/services/warnings.service";
import { PermissionUtilityFunctionMixin } from "./permissionDecorators";

//TODO: Move all this ngoninit and ngondestroy logic from all the update pages to this page
@Directive()
export class ArticleFormMixin extends PermissionUtilityFunctionMixin implements OnInit, OnDestroy{
    constants = Constants;
    formState: string;

    campaign: string = this.route.snapshot.params.campaign;

    userModelClass: any;
    userModel: ArticleObject; //A model of article-data for the user to edit
    serverModel: any; //A model of article-data from the server if there are update conflicts with the userModel

    formlyFields: FormlyFieldConfig[];
    parameterSubscription: Subscription;

    updateCancelRoute: { routeName: string, params: any } = {routeName: "", params: {}}; //Data to generate route to go to to if update of article is cancelled
    creationCancelRoute: { routeName: string, params: any } = {routeName: "", params: {}}; //Data to generate route to go to if creation of article is cancelled

    constructor(
        public router: Router,
        public routingService: RoutingService,
        public warnings: WarningsService,
        public articleService: GenericService | GenericObjectService,
        public route: ActivatedRoute,
        public campaignService: CampaignService,
        public globalUrlParam: GlobalUrlParamsService
    ){
        super();
        const isUpdateRoute : boolean = this.router.url.includes("update");
        this.formState = isUpdateRoute ? Constants.updateState : Constants.createState;
    }

    ngOnInit(): void{
        this.parameterSubscription = this.route.params.subscribe(params => {
            const queryParameters: object = this.getQueryParameters(params);        

            if (this.isInUpdateState()){
                this.updateCancelDeleteRoutes(params);

                this.fetchUserModel(queryParameters);
        
            } else if (this.isInCreateState()) {
                this.createUserModel(queryParameters);
            }
        });
    }

    getQueryParameters(params: Params): object{
        return {name: params.name};
    }

    updateCancelDeleteRoutes(params: Params): void{
        //TODO: Throw an error if updatecancelroute / creationcancelroute are not properly created by the child class
        this.updateCancelRoute.params.name = params.name;
    }

    fetchUserModel(queryParameters: any): void{
        if (queryParameters.name == null) throw `Invalid query Parameters exception. You're trying to fetch the user model
        of an article model without using the default query parameter "name", instead resorting to ${queryParameters}. 
        Please use "name" or overwrite "fetchUserModel"`;

        this.articleService.readByParam(this.campaign, queryParameters.name).pipe(first()).subscribe(
            (article: ArticleObject) =>  this.userModel = article, 
            error => this.routingService.routeToErrorPage(error)
        );
    }
    
    createUserModel(queryParameters: any): void{
        //if (this.userModelClass == null) throw (`Undefined user model class property. ArticleFormMixin needs a defined 
        //class that this data belongs to to create a user model. This hasn't been defined on this component!`);
        this.userModel = new this.userModelClass();
        
        this.campaignService.readByParam(this.campaign).pipe(first()).subscribe(
            (campaignData: {name: String, pk: number}) => {
                this.userModel.campaign = campaignData.pk;
            },
            error => this.warnings.showWarning(error)
        );
    }

    forceFieldRefresh(): void{
        this.userModel = {...this.userModel};
    }

    //TODO: Get rid of these functions due to permissionutility mixin
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
        console.log(this.userModel);
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

        this.articleService.update(userModel.pk, userModel).pipe(first()).subscribe(
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
        console.log("On cancel with params: ")
        console.log(this.updateCancelRoute);
        console.log(this.creationCancelRoute);

        if (context.isInUpdateState() || context.isInOutdatedUpdateState()){
            const {routeName, params} = context.updateCancelRoute;
            context.routingService.routeToPath(routeName, params);
        } else {
            const {routeName, params} = context.creationCancelRoute;
            context.routingService.routeToPath(routeName, params);
        } 
    }

    ngOnDestroy(): void{
        if(this.parameterSubscription) this.parameterSubscription.unsubscribe();
    }
}