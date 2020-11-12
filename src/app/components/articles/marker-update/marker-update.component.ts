import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { Location } from 'src/app/models/location';
import { MapMarker, EmptyMapMarker } from 'src/app/models/mapmarker';
import { LocationService } from 'src/app/services/location/location.service';
import { MarkerService } from 'src/app/services/marker.service';
import { OverviewService } from 'src/app/services/overview.service';

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
    {
      key: "latitude",
      type: "input",
      templateOptions:{
        label: "Latitude",
        type: "number",
        required: true,
      }
    },
    {
      key: "longitude",
      type: "input",
      templateOptions:{
        label: "Longitude",
        type: "number",
        required: true,
      }
    },
    {
      key: "location",
      type: "select",
      templateOptions:{
        label: "Location",
        labelProp: "name_full",
        valueProp: "pk",
        required: true,
        options: this.selectOptionService.getOverviewItems('location'),
      }
    },
    {
      key: "map",
      type: "select",
      templateOptions:{
        label: "Map",
        labelProp: "name_full",
        valueProp: "pk",
        required: true,
        options: this.selectOptionService.getOverviewItems('map'),
      }
    },
    {
      key: "type",
      type: "select",
      templateOptions:{
        label: "Marker Type",
        labelProp: "name_full",
        valueProp: "pk",
        options: this.selectOptionService.getOverviewItems('marker_type'),
      }
    },
    {
      key: "color",
      type: "input",
      templateOptions:{
        label: "Custom Color",
        type: "string"
      }
    },
    {
      key: "icon",
      type: "input",
      templateOptions:{
        label: "Custom Icon",
        type: "string"
      }
    }
  ];
  constructor(
    private markerService: MarkerService,
    private locationService: LocationService,
    private selectOptionService: OverviewService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;
    const parentLocationName = this.route.snapshot.params['parent_location_name'];
    const locationName = this.route.snapshot.params['location_name'];
    
    this.location_subscription = this.locationService.getLocation(parentLocationName, locationName).subscribe(location => {
      this.markerLocation = location;

      if (this.formState === this.constants.updateState){
        const mapName: string = this.route.snapshot.params['map_name'];
        this.marker_subscription = this.markerService.getMapMarker(parentLocationName, locationName, mapName).subscribe(marker => {
          this.model = marker;
        });
      } else if (this.formState === this.constants.createState){
        this.model = new EmptyMapMarker();
        this.model.location = location.pk;
      }
    });
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
      return `/marker/${this.markerLocation.parent_location_details.name}/${this.markerLocation.name}/${mapName}`;
    }
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
    if (this.marker_subscription) this.marker_subscription.unsubscribe();
    if (this.location_subscription) this.location_subscription.unsubscribe();
  }
}
