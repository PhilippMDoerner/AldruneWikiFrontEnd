import { Router } from "@angular/router";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";
import { Constants } from "src/app/app.constants";
import { ApiObject } from "src/app/models/base-models";
import { GenericObjectService } from "src/app/services/generic-object.service";
import { GenericService } from "src/app/services/generic.service";
import { RoutingService } from "src/app/services/routing.service";
import { WarningsService } from "src/app/services/warnings.service";

export class ArticleFormMixin{
    constants = Constants;
    formState: string;

    userModel: ApiObject; //A model of article-data for the user to edit
    serverModel: any; //A model of article-data from the server if there are update conflicts with the userModel
    formlyFields: FormlyFieldConfig[];

    updateCancelRoute: { routeName: string, params: any }; //Data to generate route to go to to if update of article is cancelled
    creationCancelRoute: { routeName: string, params: any }; //Data to generate route to go to if creation of article is cancelled

    constructor(
        public router: Router,
        public routingService: RoutingService,
        public warnings: WarningsService,
        public articleService: GenericService | GenericObjectService
    ){
        const isUpdateRoute : boolean = this.router.url.includes("update");
        this.formState = isUpdateRoute ? Constants.updateState : Constants.createState;
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
    
    onCancel(){
        if (this.isInUpdateState() || this.isInOutdatedUpdateState()){
            this.routingService.routeToPath(this.updateCancelRoute.routeName, this.updateCancelRoute.params);
        } else {
            this.routingService.routeToPath(this.creationCancelRoute.routeName, this.creationCancelRoute.params);
        } 
    }
}