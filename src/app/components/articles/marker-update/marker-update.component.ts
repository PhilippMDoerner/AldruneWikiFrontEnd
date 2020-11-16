import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
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
  private marker_subscription: Subscription;
  private location_subscription: Subscription;

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
    const parentLocationName = this.route.snapshot.params['parent_location_name'];
    const locationName = this.route.snapshot.params['location_name'];
    
      if (this.formState === this.constants.updateState){
        const mapName: string = this.route.snapshot.params['map_name'];
        this.marker_subscription = this.markerService.getMapMarker(parentLocationName, locationName, mapName).subscribe(marker => {
          this.model = marker;
        });
      } else if (this.formState === this.constants.createState){
        this.location_subscription = this.locationService.getLocation(parentLocationName, locationName).subscribe(location => {
          this.model = new MapMarkerObject();
          this.model.location = location.pk;
        });
      }
  }

  onSubmit(model: MapMarker){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.markerService.updateMapMarker(model) : this.markerService.createMapMarker(model);
    responseObservable.subscribe((marker: MapMarker) => {
      const mapName: string = marker.map_details.name;
      this.router.navigateByUrl(this.getRedirectUrl(mapName));
    }, error => console.log(error));
  }

  getRedirectUrl(mapName: string){
    if (this.formState === this.constants.updateState){
      return "..";
    } else if (this.formState === this.constants.createState){
      const locationName: string = this.route.snapshot.params['location_name'];
      const parentLocationName = this.route.snapshot.params['parent_location_name'];
      return `/marker/${parentLocationName}/${locationName}/${mapName}`;
    }
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
    if (this.marker_subscription) this.marker_subscription.unsubscribe();
    if (this.location_subscription) this.location_subscription.unsubscribe();
  }
}
