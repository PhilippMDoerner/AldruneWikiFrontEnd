import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { OverviewType } from 'src/app/app.constants';
import { LocationObject } from 'src/app/models/location';
import { MapMarker, MapMarkerObject } from 'src/app/models/mapmarker';
import { CampaignService } from 'src/app/services/campaign.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { LocationService } from 'src/app/services/location/location.service';
import { MarkerService } from 'src/app/services/marker.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleFormMixin } from 'src/app/utils/functions/articleFormMixin';

@Component({
  selector: 'app-marker-update',
  templateUrl: './marker-update.component.html',
  styleUrls: ['./marker-update.component.scss']
})
export class MarkerUpdateComponent extends ArticleFormMixin implements OnInit {
  //URLs
  locationUrl: string;

  //Defining ArticleFormMixin Properties
  userModel: MapMarkerObject;
  serverModel: MapMarker;
  userModelClass = MapMarkerObject;

  updateCancelRoute = {routeName: 'marker', params: {location_name: null, parent_location_name: null, map_name: null, campaign: this.campaign}};
  creationCancelRoute = {routeName: 'location', params: {name: null, parent_name: null, campaign: this.campaign}};

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "latitude", isNumberInput: true}),
    this.formlyService.genericInput({key: "longitude", isNumberInput: true}),
    this.formlyService.genericSelect({key: "location", sortProp: "name_full", overviewType: OverviewType.Location, campaign: this.campaign}),
    this.formlyService.genericSelect({key: "map", overviewType: OverviewType.Map, campaign: this.campaign}),
    this.formlyService.genericSelect({key: 'type', label: "Marker Type", labelProp: "name", valueProp: "id", overviewType: OverviewType.MarkerTypeType, campaign: this.campaign}),
    this.formlyService.genericInput({key: "color", label: "Custom Color", required: false}),
    this.formlyService.genericInput({key: "icon", label: "Custom Icon", required: false}),
  ];

  //Custom properties

  constructor(
    markerService: MarkerService,
    private locationService: LocationService,
    router: Router,
    route: ActivatedRoute,
    private formlyService: MyFormlyService,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    campaignService: CampaignService,
    globalUrlParams: GlobalUrlParamsService,
    tokenService: TokenService,
  ) { 
    super(
      router,
      routingService,
      warnings,
      markerService,
      campaignService,
      globalUrlParams,
      route,
      tokenService,
    )
  }

  updateRouterLinks(campaignName: string, userModel: MapMarkerObject, params: Params): void{
    this.locationUrl = this.routingService.getRoutePath('location', {
        parent_name: userModel.location_details.parent_location_name, 
        name: userModel.location_details.name,
        campaign: campaignName
    });
  }
  //TODO: Refactor this function into 2 separate functions and instead of predefining the object above
  //TODO: Add description fields that if they're empty they should show an informative text on blue background that this is empty, why not add some text? With a button on it to do so
  updateCancelDeleteRoutes(params: Params): void{
    const parentLocationName: string = params['parent_location_name'];
    const locationName: string = params['location_name'];
    const mapName: string = params['map_name'];

    //Update Cancel Route Params
    this.updateCancelRoute.params.location_name = locationName;
    this.updateCancelRoute.params.parent_location_name = parentLocationName;
    this.updateCancelRoute.params.map_name = mapName; //Undefined if route of this component is 'marker-create'

    this.creationCancelRoute.params.name = locationName;
    this.creationCancelRoute.params.parent_name = parentLocationName;
  }

  getQueryParameters(params: Params){
    const parentLocationName = params['parent_location_name'];
    const locationName = params['location_name'];
    const mapName: string = params['map_name'];

    return {parentLocationName, locationName, mapName};
  }

  fetchUserModel(queryParameters: any){
    this.articleService.readByParam(this.campaign, queryParameters).pipe(first()).subscribe(
      (marker: MapMarkerObject) => this.userModel = marker,
      error => this.routingService.routeToErrorPage(error)
    );
  }

  createUserModel(queryParameters){
    this.locationService.readByParam(this.campaign, queryParameters).pipe(first()).subscribe(
      (location: LocationObject) => {
        this.userModel = new MapMarkerObject();
        this.userModel.location = location.pk;
        this.userModel.location_details = {
          parent_location_name: location.parent_location_details.name,
          name: location.name,
          description: location.description,
          sublocations: null,
        };
      },
      error => this.routingService.routeToErrorPage(error)
    );
  }
}
