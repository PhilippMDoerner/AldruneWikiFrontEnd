import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Location, LocationObject } from 'src/app/models/location';
import { MapMarker, MapMarkerObject } from 'src/app/models/mapmarker';
import { LocationService } from 'src/app/services/location/location.service';
import { MarkerService } from 'src/app/services/marker.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-marker-update',
  templateUrl: './marker-update.component.html',
  styleUrls: ['./marker-update.component.scss']
})
export class MarkerUpdateComponent implements OnInit {
  private parameter_subscription: Subscription;

  constants: any = Constants;

  formState: string;

  model: MapMarker;
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "latitude", isNumberInput: true}),
    this.formlyService.genericInput({key: "longitude", isNumberInput: true}),
    this.formlyService.genericSelect({key: "location", optionsType: 'location'}),
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
    private formlyService: MyFormlyService,
    private warnings: WarningsService,  
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? Constants.updateState : Constants.createState;

    this.parameter_subscription = this.route.params.subscribe(params =>{
      const parentLocationName = params['parent_location_name'];
      const locationName = params['location_name'];
      
      if (this.formState === Constants.updateState){
        const mapName: string = params['map_name'];
        this.markerService.getMapMarker(parentLocationName, locationName, mapName).pipe(first()).subscribe(
          (marker: MapMarkerObject) => this.model = marker,
          error => this.routingService.routeToErrorPage(error)
        );

      } else if (this.formState === Constants.createState){
        this.locationService.readByParam({parentLocationName, locationName}).pipe(first()).subscribe(
          (location: LocationObject) => {
            this.model = new MapMarkerObject();
            this.model.location = location.pk;
            this.model.location_details = {
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

  onSubmit(){
    const isFormInUpdateState: boolean = (this.formState === Constants.updateState);
    const responseObservable: Observable<MapMarkerObject> =  isFormInUpdateState ? 
        this.markerService.update(this.model.pk, this.model) : 
        this.markerService.create(this.model);
    
    responseObservable.pipe(first()).subscribe(
      (marker: MapMarkerObject) => this.routingService.routeToPath('marker', {
          parent_location_name: marker.location_details.parent_location_name,
          location_name: marker.location_details.name,
          map_name: marker.map_details.name
        }
      ),
      error => this.warnings.showWarning(error)
    );
  }

  onCancel(){
    const isFormInUpdateState : boolean = (this.formState === Constants.updateState)
    const params = this.route.snapshot.params;

    if (isFormInUpdateState){
      this.routingService.routeToPath('marker', {
        location_name: params.location_name,
        parent_location_name: params.parent_location_name,
        map_name: params.map_name,
      });

    } else {
      this.routingService.routeToPath('location', {
        name: params.location_name,
        parent_name: params.parent_location_name
      });
    } 
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
