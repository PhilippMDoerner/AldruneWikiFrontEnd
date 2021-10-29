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
  //Defining ArticleFormMixin Properties
  userModel: MapMarkerObject;
  serverModel: MapMarker;
  userModelClass = MapMarkerObject;

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "latitude", isNumberInput: true}),
    this.formlyService.genericInput({key: "longitude", isNumberInput: true}),
    this.formlyService.genericSelect({key: "location", sortProp: "name_full", overviewType: OverviewType.Location, campaign: this.campaign.name}),
    this.formlyService.genericSelect({key: "map", overviewType: OverviewType.Map, campaign: this.campaign.name}),
    this.formlyService.genericSelect({key: 'type', label: "Marker Type", labelProp: "name", valueProp: "id", overviewType: OverviewType.MarkerTypeType, campaign: this.campaign.name}),
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
    this.creationCancelUrl = this.routingService.getRoutePath('location', {
        parent_name: userModel.location_details.parent_location_name, 
        name: userModel.location_details.name,
        campaign: campaignName
    });

    this.updateCancelUrl = this.routingService.getRoutePath("marker", {
      campaign: campaignName,
      parent_location_name: userModel.location_details.parent_location_name,
      location_name: userModel.location_details.name,
      map_name: userModel.map_details?.name,
    })
  }
}
