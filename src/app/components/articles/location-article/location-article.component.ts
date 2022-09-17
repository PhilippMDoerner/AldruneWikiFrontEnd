import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OverviewType } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { LocationObject } from 'src/app/models/location';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { LocationService } from 'src/app/services/location/location.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleMixin } from 'src/app/utils/functions/articleMixin';

@Component({
  selector: 'app-location-article',
  templateUrl: './location-article.component.html',
  styleUrls: ['./location-article.component.scss']
})
export class LocationArticleComponent extends ArticleMixin implements OnInit {
  //URLs
  locationOverviewUrl: string;
  parentLocationUrls: string[];
  markerUrls: string[];
  markerCreateUrl: string;
  characterCreateUrl: string;

  //ArticleMixin Variables
  articleData: LocationObject;
  deleteRoute = {routeName: "location-overview", params: {campaign: null}}

  OverviewType = OverviewType;

  constructor(
    locationService: LocationService,
    public route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    globalUrlParams: GlobalUrlParamsService,
    tokenService: TokenService,
  ) { 
    super(
      locationService,
      route,
      routingService,
      warnings,
      globalUrlParams,
      tokenService,
    ) 
  }

  updateDynamicVariables(campaign: CampaignOverview, articleData: LocationObject, params: Params): void{
    this.markerCreateUrl = this.routingService.getRoutePath('marker-create', {
      parent_location_name: articleData.parent_location_details.name,
      location_name: articleData.name,
      campaign: campaign.name
    });

    this.parentLocationUrls = articleData.parent_location_list.map(
      (locationName: string) => this.buildLocationUrl(locationName, articleData.parent_location_list)
    );

    this.markerUrls = articleData.marker_details.map(
      (marker: {map:string, map_icon: string}) => this.routingService.getRoutePath('marker', {
        parent_location_name: articleData.parent_location_details.name, 
        location_name: articleData.name, 
        map_name: marker.map,
        campaign: campaign.name
      })
    );

    this.characterCreateUrl = this.routingService.getRoutePath('character-create', {campaign: campaign.name});

    this.locationOverviewUrl = this.routingService.getRoutePath('location-overview', {campaign: campaign.name});
  }

  getQueryParameter(params: Params): {locationName: string, parentLocationName: string}{
    const locationName: string = params['name'];
    const parentLocationName: string = params['parent_name'] ? params['parent_name'] : "None";
    return {locationName, parentLocationName};
  }

  buildLocationUrl(locationName: string, locationList: string[]){
    if (!locationList) throw "Tried building a route to a location in parent_location_list when there is no parent_location_list";
    
    const index: number = locationList.indexOf(locationName);
    const parentLocationName: string = (index >= 0) ? "None" : locationList[index-1];

    const locationUrl: string = this.routingService.getRoutePath('location', {
      parent_name: parentLocationName, 
      name: locationName,
      campaign: this.campaign.name,
    });
    
    return locationUrl;
  }
}
