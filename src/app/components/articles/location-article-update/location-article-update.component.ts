import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { first } from 'rxjs/operators';
import { OverviewType } from 'src/app/app.constants';
import { LocationObject, Location } from 'src/app/models/location';
import { CampaignService } from 'src/app/services/campaign.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { LocationService } from 'src/app/services/location/location.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
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

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", isNameInput: true}),
    this.formlyService.genericDisableSelect({
      key: "parent_location", 
      label: "Parent Location", 
      overviewType: OverviewType.Location, 
      sortProp: "name_full",
      campaign: this.campaign.name, 
      required: false,
      disabledExpression: (location: LocationObject) => this.isSameLocation(location, this.userModel) || this.isChildLocation(this.userModel, location),
      tooltipMessage: "The location that contains this new location, e.g. the location 'Mayor's House' within the location 'Small city Lundorf'",
      warningMessage: "The location you selected can't have the same name as the location that is trying to contain it! That would mean that this location contained itself!"
    }),
  ];

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
    tokenService: TokenService,
  ) { 
    super(
      router,
      routingService,
      warnings,
      locationService,
      campaignService,
      globalUrlParams,
      route,
      tokenService,
    )
  }

  isSameLocation(location1: LocationObject, location2: LocationObject): boolean{
    return location1.name === location2.name;
  }

  isChildLocation(parentLocation: LocationObject, childLocation: LocationObject): boolean{
    return childLocation.parent_location === parentLocation.pk;
  }

  updateRouterLinks(campaignName: string, userModel: LocationObject, params: Params): void{
    this.updateCancelUrl = this.routingService.getRoutePath("location", {
      name: userModel.name, 
      parent_name: userModel.parent_location_details?.name, 
      campaign: campaignName
    });

    this.creationCancelUrl = this.routingService.getRoutePath('location-overview', {campaign: campaignName});
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
