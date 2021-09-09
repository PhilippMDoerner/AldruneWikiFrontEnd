import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants, OverviewType } from 'src/app/app.constants';
import { LocationObject, Location } from 'src/app/models/location';
import { CampaignService } from 'src/app/services/campaign.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { LocationService } from 'src/app/services/location/location.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleFormMixin } from 'src/app/utils/functions/articleFormMixin';


@Component({
  selector: 'app-location-article-update',
  templateUrl: './location-article-update.component.html',
  styleUrls: ['./location-article-update.component.scss']
})
export class LocationArticleUpdateComponent extends ArticleFormMixin {
  //Defining ArticleFormMixin Properties
  serverModel: Location;
  userModel: LocationObject;
  userModelClass = LocationObject;

  updateCancelRoute = {routeName: "location", params: {name: null, parent_name: null, campaign: this.campaign}};
  creationCancelRoute = {routeName: "location-overview", params: {campaign: this.campaign}};//Only used when creating normally, not when creating item for a specific character
  
  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", isNameInput: true}),
    this.formlyService.genericSelect({key: "parent_location", label: "Parent Location", overviewType: OverviewType.Location, campaign: this.campaign, required: false}),
  ];
  //TODO: Turn parent_location into disable select, a location shouldn't be able to select itself as parent location
  //Custom properties

  constructor(
    private formlyService: MyFormlyService,
    locationService: LocationService,
    router: Router,
    route: ActivatedRoute,
    warnings: WarningsService,  
    routingService: RoutingService,
    campaignService: CampaignService,
    globalUrlParams: GlobalUrlParamsService,
  ) { 
    super(
      router,
      routingService,
      warnings,
      locationService,
      route,
      campaignService,
      globalUrlParams
    )
  }

  getQueryParameters(params: Params): object{
    return {locationName: params.name, parentLocationName: params.parent_name};
  }

  updateCancelDeleteRoutes(params: Params): void{
    const locationName: string = params.name;
    const parentLocationName: string = params.parent_name;

    this.updateCancelRoute.params.name = locationName;
    this.updateCancelRoute.params.parent_name = parentLocationName;
  }


  fetchUserModel(queryParameters): void{
    this.articleService.readByParam(this.campaign, queryParameters).pipe(first()).subscribe(
      (location: LocationObject) => this.userModel = location,
      error => this.routingService.routeToErrorPage(error)
    );
  }

  
  createUserModel(queryParameters: any): void{
    this.userModel = new this.userModelClass();

    this.campaignService.readByParam(this.campaign).pipe(first()).subscribe(
      (campaignData: {name: String, pk: number}) => this.userModel.campaign = campaignData.pk,
      error => this.warnings.showWarning(error)
    );

    //Aditional info to user model if this is a sublocation
    if(this.isForAssociatedObjectCreation()){
      this.articleService.readByParam(this.campaign, queryParameters).pipe(first()).subscribe(
        (location: LocationObject) => {
          this.userModel.parent_location = location.pk;
          this.userModel.parent_location_details = {
            pk: location.pk,
            name: location.name,
            parent_location: location.parent_location_details.name,
            name_full: location.name_full
          };
        },
        error => this.routingService.routeToErrorPage(error)
      );
    } 
  }


  /**
   * @description Executes when cancel button is clicked. Extends normal cancel logic for the extra step, that locations may be
   * created from the context, that you're creating it as a sublocation for another location. In such a case, cancel 
   * should route you back to the original location for which you were creating this. This is the logic that happens here.
   */
  onCancel(){
    if(this.isForAssociatedObjectCreation()){
      this.routingService.routeToPath('location', {
        name: this.userModel.parent_location_details.name, 
        parent_name: this.userModel.parent_location_details.parent_location
      });

    } else {
      const executionContext = this;
      ArticleFormMixin.prototype.onCancel(executionContext);
    }
  }

  /**
   * @description Checks if the route through which the Component is visited is the "location-parentlocation-create" route, which means
   * the location is being created as a sublocation, whose name is available as request parameter ":parent_name"
   * @returns {boolean} True if this route is currently "location-parentlocation-create",false if it isn't
   */
   private isForAssociatedObjectCreation(): boolean{
    return this.routingService.routeNameMatches(this.route, "location-parentlocation-create");
  }
}
