import { Directive, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { Constants } from "src/app/app.constants";
import { ArticleObject } from "src/app/models/base-models";
import { GenericObjectService } from "src/app/services/generic-object.service";
import { GenericService } from "src/app/services/generic.service";
import { RoutingService } from "src/app/services/routing.service";
import { WarningsService } from "src/app/services/warnings.service";
import { PermissionUtilityFunctionMixin } from "./permissionDecorators";

@Directive()
export class ArticleMixin extends PermissionUtilityFunctionMixin implements OnInit, OnDestroy{
    constants = Constants;
    parameter_subscription: Subscription;

    queryParameterName: string; //Only use if the column for that parameter has the unique constraint, aka the parameter is unique
    campaignParameterName: string;
    articleData: ArticleObject;
    campaign: string;

    textfieldFormStateSubject: BehaviorSubject<string> = new BehaviorSubject(Constants.displayState);

    deleteRoute: { routeName: string, params: any }; //Data to generate route to go to to if deletion of article succeeds

    constructor(
        public articleService: GenericObjectService | GenericService,
        public route: ActivatedRoute,
        public routingService: RoutingService,
        public warnings: WarningsService
    ){
        super();
    }

    ngOnInit(): void{
        this.parameter_subscription = this.route.params.subscribe( params => {
            const queryParameter: string | number = params[this.queryParameterName];
            this.campaign = params[this.campaignParameterName];

            this.articleService.readByParam(this.campaign, queryParameter).pipe(first()).subscribe(
                (article: ArticleObject) => this.articleData = article, 
                error => this.routingService.routeToErrorPage(error)
            );
        
        });
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
    }
}