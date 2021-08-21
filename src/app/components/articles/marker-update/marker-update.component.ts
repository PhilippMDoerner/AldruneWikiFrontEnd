import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { LocationObject } from 'src/app/models/location';
import { MapMarker, MapMarkerObject } from 'src/app/models/mapmarker';
import { LocationService } from 'src/app/services/location/location.service';
import { MarkerService } from 'src/app/services/marker.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
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
  updateCancelRoute = {routeName: 'marker', params: {location_name: null, parent_location_name: null, map_name: null}};
  creationCancelRoute = {routeName: 'location', params: {name: null, parent_name: null}};

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "latitude", isNumberInput: true}),
    this.formlyService.genericInput({key: "longitude", isNumberInput: true}),
    this.formlyService.genericSelect({key: "location", optionsType: 'location'}),
    this.formlyService.genericSelect({key: "map", optionsType: "map"}),
    this.formlyService.genericSelect({key: 'type', label: "Marker Type", optionsType: "marker_type"}),
    this.formlyService.genericInput({key: "color", label: "Custom Color", required: false}),
    this.formlyService.genericInput({key: "icon", label: "Custom Icon", required: false}),
  ];

  //Custom properties
  private parameter_subscription: Subscription;

  constructor(
    markerService: MarkerService,
    private locationService: LocationService,
    router: Router,
    private route: ActivatedRoute,
    private formlyService: MyFormlyService,
    public warnings: WarningsService,  
    public routingService: RoutingService,
  ) { 
    super(
      router,
      routingService,
      warnings,
      markerService
    )
  }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params =>{
      const parentLocationName = params['parent_location_name'];
      const locationName = params['location_name'];
      const mapName: string = params['map_name'];
      this.campaign = params.campaign;

      //Update Cancel Route Params
      this.updateCancelRoute.params.location_name = locationName;
      this.updateCancelRoute.params.parent_location_name = parentLocationName;
      this.updateCancelRoute.params.map_name = mapName; //Undefined if route of this component is 'marker-create'
      this.creationCancelRoute.params.name = locationName;
      this.creationCancelRoute.params.parent_name = parentLocationName;
      
      //Get Marker
      if (this.isInUpdateState()){
        this.articleService.readByParam(this.campaign, {parentLocationName, locationName, mapName}).pipe(first()).subscribe(
          (marker: MapMarkerObject) => this.userModel = marker,
          error => this.routingService.routeToErrorPage(error)
        );

      } else if (this.isInCreateState()){
        this.locationService.readByParam(this.campaign, {parentLocationName, locationName}).pipe(first()).subscribe(
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

    })
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
