import { Directive, ElementRef, EventEmitter, Input, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { first } from "rxjs/operators";
import { Constants } from "src/app/app.constants";
import { ArticleObject } from "src/app/models/base-models";
import { CampaignOverview } from "src/app/models/campaign";
import { GenericObjectService } from "src/app/services/generic-object.service";
import { GenericService } from "src/app/services/generic.service";
import { TokenService } from "src/app/services/token.service";
import { WarningsService } from "src/app/services/warnings.service";
import { animateElement } from "./animationDecorator";
import { PermissionUtilityFunctionMixin } from "./permissionDecorators";

@Directive()
export abstract class CardFormMixin extends PermissionUtilityFunctionMixin{
    public constants = Constants;

    userModel: ArticleObject;
    serverModel: ArticleObject; //A model of article-data from the server if there are update conflicts with the userModel
    userModelClass: any;

    formState: string;
    formlyFields: FormlyFieldConfig[];
    
    @Input() isOpen: boolean = false;
    @Input() cardData: any; //The general data of the card
    @Input() index: number;
    @Input() campaign: CampaignOverview;

    card: ElementRef;

    @Output() cardDelete: EventEmitter<number>; //This doesn't work when usingInjectable because it needs the output property, but 

    validFormStates: string[] = [
        Constants.displayState, 
        Constants.createState, 
        Constants.updateState,
        Constants.deleteState, 
        Constants.outdatedUpdateState 
    ];

    constructor(
        public warnings: WarningsService,
        public articleService: GenericService | GenericObjectService,
        route: ActivatedRoute,
        tokenService: TokenService,
      ) { 
        super(tokenService, route);
      }

    ngOnInit(): void {
        this.determineCardStateOnInit();
        this.formlyFields = this.getFormlyFieldConfigurations(this.campaign);

        if (this.isInCreateState()){
            this.isOpen = true;
            this.createUserModel();
        }
    }

    determineCardStateOnInit(): void{
        const isForCreation: boolean = this.cardData.pk == null;
        this.formState = isForCreation ? this.constants.createState : this.constants.displayState;
    }

    getFormlyFieldConfigurations(campaign: CampaignOverview): FormlyFieldConfig[]{
        return this.formlyFields;
    }

    createUserModel(): void{
        //if (this.userModelClass == null) throw (`Undefined user model class property. ArticleFormMixin needs a defined 
        //class that this data belongs to to create a user model. This hasn't been defined on this component!`);
        this.userModel = new this.userModelClass();
        this.userModel.campaign = this.campaign.pk;
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

    isInDisplayState(): boolean{
        return this.formState === Constants.displayState;
    }

    toggleEditState(){
        this.formState = this.isInDisplayState() ? Constants.updateState : Constants.displayState;

        if(this.isInUpdateState()){
            this.resetModel();
        }
    }

    toggleFormState(){
        const executionContext = this;

        if(this.isInDisplayState()){
            this.formState = Constants.updateState;
            this.resetModel();

        } else if (this.isInUpdateState()){
            this.formState = Constants.displayState;

        } else if (this.isInCreateState()){
            this.removeCard(executionContext);
        }
    }

    resetModel(){
        this.userModel = JSON.parse(JSON.stringify(this.cardData));
    }

    toggleCreateState(){
        this.formState = this.isInDisplayState() ? Constants.createState : Constants.displayState;
    }

    toggleCard(): void{
        this.isOpen = !this.isOpen;
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
            (response: any) => this.onUpdateSuccess(response, executionContext),
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
            (response: any) => this.onCreationSuccess(response, executionContext),
            (errorResponse: any) => this.onCreationError(errorResponse, executionContext)
        )
    }

    articleDelete(userModel: any){
        const executionContext = this;

        this.articleService.delete(userModel.pk).pipe(first()).subscribe(
            (response: any) => this.onDeletionSuccess(response, executionContext),
            (errorResponse: any) => this.onDeletionError(errorResponse, executionContext)
        )
    }

    /**
     * @description Callback function called when an article update request completes successfully. 
     * Routes to the page that shall be visited after the update completes.
     * @param {any} updatedArticle - The updated article
     */
    onUpdateSuccess(updatedArticle: any, self: any){
        self.cardData = updatedArticle;
        self.formState = Constants.displayState;
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
     * @param {any} createdArticle - The newly created article
     */
    onCreationSuccess(createdArticle: any, self: CardFormMixin){
        self.cardData = createdArticle;
        self.formState = Constants.displayState;
    }

    /**
     * @description Callback function called when an article create request fails.
     * Handles error in some manner.
     * @param {any} errorResponse - The error response
     */
    onCreationError(errorResponse: any, self: CardFormMixin){
        self.baseErrorCallback(errorResponse);
    }

    onDeletionSuccess(deletionResponse: any, self: CardFormMixin){
        self.removeCard(self);
    }

    onDeletionError(errorResponse: any, self: CardFormMixin){
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
            this.warnings.showWarning(errorResponse);
            this.formState = Constants.displayState;
        }
    }
    
    /**
     * @description Executes when somebody hits the cancel button on the form.
     * @param context - optional parameter. REQUIRED to be passed from a child-service if it is overwritten. Grants an 
     * execution context which is the object that calls this function, allowing access to properties and methods of
     * articleFormMixin and the calling child.
     */
    //TODO: Find a more elegant solution than passing an execution context
    onCancel(self?: CardFormMixin){
        const isCalledFromOverwritingFunction = this.cardData == null;
        self = isCalledFromOverwritingFunction ? self : this;

        //If creation is canceled, remove card. If anything else is being canceled, just go back to normal display state
        if(self.isInCreateState()){
            self.removeCard(self);
        } else {
            self.formState = Constants.displayState;
        }
    }

    removeCard(self: CardFormMixin){
        animateElement(self.card.nativeElement, 'fadeOutDown')
         .then(() => self.cardDelete.emit(self.index));
    }
}