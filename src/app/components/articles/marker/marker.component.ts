import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { LocationObject } from 'src/app/models/location';
import { MapMarker, MapMarkerObject } from 'src/app/models/mapmarker';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { MarkerService } from 'src/app/services/marker.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleMixin } from 'src/app/utils/functions/articleMixin';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss']
})
export class MarkerComponent extends ArticleMixin implements OnInit {
  //URLs
  locationUrl: string;

  //ArticleMixin Variables
  articleData: MapMarkerObject;
  deleteRoute = {routeName: "location", params: {name: null, parent_name: null, campaign: null}}

  constructor(
    public route: ActivatedRoute,
    markerService: MarkerService,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    globalUrlParams: GlobalUrlParamsService,
    tokenService: TokenService,
  ) {
    super(
      markerService,
      route,
      routingService,
      warnings,
      globalUrlParams,
      tokenService
    )
   }

  updateDynamicVariables(campaign: CampaignOverview, articleData: MapMarkerObject, params: Params): void{
    this.locationUrl = this.routingService.getRoutePath('location', {
        parent_name: articleData.location_details.parent_location_name, 
        name: articleData.location_details.name,
        campaign: campaign.name
    });
  }

  updateOnDeleteRouteParameters(campaign: CampaignOverview, params: Params){
    super.updateOnDeleteRouteParameters(campaign, params);

    const parentLocationName: string = params['parent_location_name'];
    const locationName: string = params['location_name'];

    this.deleteRoute.params.name = locationName;
    this.deleteRoute.params.parent_name =  parentLocationName;
  }
}
