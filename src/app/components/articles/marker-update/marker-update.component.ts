import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Location } from 'src/app/models/location';
import { MapMarker, MapMarkerObject } from 'src/app/models/mapmarker';
import { LocationService } from 'src/app/services/location/location.service';
import { MarkerService } from 'src/app/services/marker.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';

@Component({
  selector: 'app-marker-update',
  templateUrl: './marker-update.component.html',
  styleUrls: ['./marker-update.component.scss']
})
export class MarkerUpdateComponent implements OnInit {
  private parameter_subscription: Subscription;

  constants: any = Constants;
  markerLocation: Location;

  formState: string;
  form = new FormGroup({});
  model: MapMarker;
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "latitude", isNumberInput: true}),
    this.formlyService.genericInput({key: "longitude", isNumberInput: true}),
    this.formlyService.genericSelect({key: "Location", optionsType: 'location'}),
    this.formlyService.genericSelect({key: "map", optionsType: "map"}),
    this.formlyService.genericSelect({key: 'type', label: "Marker Type", optionsType: "marker_type"}),
    this.formlyService.genericInput({key: "color", label: "Custom Color", required: false}),
    this.formlyService.genericInput({key: "icon", label: "Custom Icon", required: false}),
  ];

  constructor(
    private markerService: MarkerService,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute,
    private formlyService: MyFormlyService
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;

    this.parameter_subscription = this.route.params.subscribe(params =>{
      const parentLocationName = params['parent_location_name'];
      const locationName = params['location_name'];
      
      if (this.formState === this.constants.updateState){
        const mapName: string = params['map_name'];
        this.markerService.getMapMarker(parentLocationName, locationName, mapName).pipe(first()).subscribe(marker => {
          this.model = marker;
        });

      } else if (this.formState === this.constants.createState){
        this.locationService.getLocation(parentLocationName, locationName).pipe(first()).subscribe(location => {
          this.model = new MapMarkerObject();
          this.model.location = location.pk;
        });
      }

    })
  }

  onSubmit(){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: Observable<MapMarkerObject> =  isFormInUpdateState ? this.markerService.updateMapMarker(this.model) : this.markerService.createMapMarker(this.model);
    
    responseObservable.pipe(first()).subscribe((marker: MapMarkerObject) => {
      this.router.navigateByUrl(this.getRedirectUrl(marker));
    }, error => console.log(error));
  }

  getRedirectUrl(mapMarker: MapMarkerObject){
    const locationName: string = mapMarker.location_details.name;
    const parentLocationName: string = mapMarker.location_details.parent_location_name;
    const mapName: string = mapMarker.map_details.name;

    const markerUrl: string = Constants.getRoutePath(this.router, 'marker', {parent_location_name: parentLocationName, location_name: locationName, map_name: mapName});
    return markerUrl;
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
