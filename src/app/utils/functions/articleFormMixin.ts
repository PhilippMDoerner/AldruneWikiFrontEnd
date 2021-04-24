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
        public routingService: RoutingService,
        public warnings: WarningsService,
        public articleService: GenericService | GenericObjectService
    ){}


    onSubmit(){
        const isFormInUpdateState: boolean = this.formState === Constants.updateState || this.formState === Constants.outdatedUpdateState;
        const responseObservable: Observable<any> =  isFormInUpdateState ? 
            this.articleService.update(this.userModel.pk, this.userModel) : 
            this.articleService.create(this.userModel);
    
        responseObservable.pipe(first()).subscribe(
            (character) => this.routingService.routeToApiObject(character),
            error => {
                const isOutdatedUpdateError = error?.status === 409;
                if (isOutdatedUpdateError){
                    this.serverModel = error.error;
                    this.formState = Constants.outdatedUpdateState;
                } else {
                    this.warnings.showWarning(error)
                }
            }
        );
    }
    
    onCancel(){
        const isFormInUpdateState : boolean = (this.formState === Constants.updateState || this.formState === Constants.outdatedUpdateState)
        if (isFormInUpdateState){
            this.routingService.routeToPath(this.updateCancelRoute.routeName, this.updateCancelRoute.params);
        } else {
            this.routingService.routeToPath(this.creationCancelRoute.routeName, this.creationCancelRoute.params);
        } 
    }
}