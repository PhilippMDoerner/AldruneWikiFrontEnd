import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
import { LocationObject } from 'src/app/models/location';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { LocationService } from 'src/app/services/location/location.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleMixin } from 'src/app/utils/functions/articleMixin';

@Component({
  selector: 'app-location-article',
  templateUrl: './location-article.component.html',
  styleUrls: ['./location-article.component.scss']
})
export class LocationArticleComponent extends ArticleMixin implements OnInit {
  //ArticleMixin Variables
  articleData: LocationObject;
  deleteRoute = {routeName: "location-overview", params: {campaign: null}}


  constructor(
    locationService: LocationService,
    public route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    globalUrlParams: GlobalUrlParamsService,
  ) { 
    super(
      locationService,
      route,
      routingService,
      warnings,
      globalUrlParams
    ) 
  }

  getQueryParameter(params: Params): any{
    const locationName: string = params['name'];
    const parentLocationName: string = params['parent_name'] ? params['parent_name'] : "None";
    return {locationName, parentLocationName};
  }

  buildLocationRoute(index: number){
    const locationList: string[] = this.articleData.parent_location_list;
    if (!locationList) throw "Tried building a route to a location in parent_location_list when there is no parent_location_list";
    
    const locationName: string = locationList[index];
    const parentLocationName: string = (index === 0) ? "None" : locationList[index-1];

    const locationUrl: string = this.routingService.getRoutePath('location', {
      parent_name: parentLocationName, 
      name: locationName,
      campaign: this.campaign,
    });
    return locationUrl;
  }
}
