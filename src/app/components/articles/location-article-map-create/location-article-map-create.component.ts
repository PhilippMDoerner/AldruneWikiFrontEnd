import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { MapMarker, MapMarkerObject } from 'src/app/models/mapmarker';
import { MapService } from 'src/app/services/map.service';
import { MarkerService } from 'src/app/services/marker.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { LocationObject, Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location/location.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-location-article-map-create',
  templateUrl: './location-article-map-create.component.html',
  styleUrls: ['./location-article-map-create.component.scss']
})
export class LocationArticleMapCreateComponent implements OnInit {
  private parameter_subscription: Subscription;

  constants: any = Constants;
  mapName: string;

  locationForm = new FormGroup({});
  locationModel: LocationObject;

  markerForm = new FormGroup({});
  markerModel: MapMarkerObject;

  constructor(
    private markerService: MarkerService,
    private mapService: MapService,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute,
    private formlyService: MyFormlyService,
  ) { }

  location_fields: FormlyFieldConfig[] = this.formlyService.getFieldConfigForLocation();
  marker_fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "latitude", isNumberInput: true}),
    this.formlyService.genericInput({key: "longitude", isNumberInput: true}),
    this.formlyService.genericSelect({key: "map", optionsType: "map"}),
    this.formlyService.genericSelect({key: "type", label: "Marker Type", optionsType:"marker_type"}),
    this.formlyService.genericInput({key: "color", label: "Custom Color"}),
    this.formlyService.genericInput({key: "icon", label: "Custom Icon"})
  ]

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const longitude: number = params['longitude'];
      const latitude: number = params['latitude'];
      this.mapName = params['map_name'];
      
      this.mapService.getMap(this.mapName).pipe(first()).subscribe(map =>{
        this.markerModel = new MapMarkerObject();
        this.markerModel.map = map.pk;
        this.markerModel.latitude = latitude;
        this.markerModel.longitude = longitude;
      });
  
      this.locationModel = new LocationObject();
    })
  }

  onSubmit(){
    this.locationService.createLocation(this.locationModel).pipe(first()).subscribe((location: Location) => {
      this.markerModel.location = location.pk;

      this.markerService.createMapMarker(this.markerModel).pipe(first()).subscribe(
        (marker: MapMarker) => Constants.routeToApiObject(this.router, location), 
        error => console.log(error));
    })
  }

  onCancel(){
      Constants.routeToPath(this.router, 'map', {name: this.mapName});
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
