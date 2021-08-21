import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Location, LocationObject } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location/location.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleMixin } from 'src/app/utils/functions/articleMixin';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';
@Component({
  selector: 'app-location-article',
  templateUrl: './location-article.component.html',
  styleUrls: ['./location-article.component.scss']
})
export class LocationArticleComponent extends ArticleMixin implements OnInit {
  //ArticleMixin Variables
  articleData: LocationObject;
  deleteRoute = {routeName: "location-overview", params: {}}


  constructor(
    locationService: LocationService,
    public route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
  ) { 
    super(
      locationService,
      route,
      routingService,
      warnings
    ) 
  }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const locationName: string = params['name'];
      const parentLocationName: string = params['parent_name'] ? params['parent_name'] : "None";
      const campaign: string = params.campaign;

      this.articleService.readByParam(campaign, {parentLocationName, locationName}).pipe(first()).subscribe(
        (location: LocationObject) => this.articleData = location,
        error => this.routingService.routeToErrorPage(error)
      );
    });
  }

  buildLocationRoute(index: number){
    const locationList: string[] = this.articleData.parent_location_list;
    if (!locationList) throw "Tried building a route to a location in parent_location_list when there is no parent_location_list";
    
    const locationName: string = locationList[index];
    const parentLocationName: string = (index === 0) ? "None" : locationList[index-1];

    const locationUrl: string = this.routingService.getRoutePath('location', {
      parent_name: parentLocationName, 
      name: locationName
    });
    return locationUrl;
  }
}
