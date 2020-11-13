import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { MapMarker, EmptyMapMarker } from 'src/app/models/mapmarker';
import { MapService } from 'src/app/services/map.service';
import { MarkerService } from 'src/app/services/marker.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { EmptyFormLocation, Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-location-article-map-create',
  templateUrl: './location-article-map-create.component.html',
  styleUrls: ['./location-article-map-create.component.scss']
})
export class LocationArticleMapCreateComponent implements OnInit {
  private marker_subscription: Subscription;
  private map_subscription: Subscription;
  private location_subscription: Subscription;

  constants: any = Constants;
  mapName: string;

  locationForm = new FormGroup({});
  locationModel: Location;
  markerForm = new FormGroup({});
  markerModel: MapMarker;

  constructor(
    private markerService: MarkerService,
    private mapService: MapService,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute,
    private formlyService: MyFormlyService,
  ) { }

  location_fields: FormlyFieldConfig[] = this.formlyService.getFieldConfigForLocation();
  // marker_fields: FormlyFieldConfig[] = this.formlyService.getFieldConfigForMarker();
  marker_fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "latitude", isNumberInput: true}),
    this.formlyService.genericInput({key: "longitude", isNumberInput: true}),
    this.formlyService.genericSelect({key: "map", optionsType: "map"}),
    this.formlyService.genericSelect({key: "type", label: "Marker Type", optionsType:"marker_type"}),
    this.formlyService.genericInput({key: "color", label: "Custom Color"}),
    this.formlyService.genericInput({key: "icon", label: "Custom Icon"})
  ]

  ngOnInit(): void {
    console.log(this.route.snapshot.params);
    const longitude: number = this.route.snapshot.params['longitude'];
    const latitude: number = this.route.snapshot.params['latitude'];
    this.mapName = this.route.snapshot.params['map_name'];
    
    this.map_subscription = this.mapService.getMap(this.mapName).subscribe(map =>{
      this.markerModel = new EmptyMapMarker();
      this.markerModel.map = map.pk;
      this.markerModel.latitude = latitude;
      this.markerModel.longitude = longitude;
    });

    this.locationModel = new EmptyFormLocation();
  }

  onSubmit(){
    this.location_subscription = this.locationService.createLocation(this.locationModel).subscribe((location: Location) => {
      this.markerModel.location = location.pk;
      this.marker_subscription = this.markerService.createMapMarker(this.markerModel).subscribe((marker: MapMarker) => {
        this.router.navigateByUrl(`/map/${marker.map_details.name}`);
      }, error => console.log(error));
    })


  }

  ngOnDestroy(){
    if (this.marker_subscription) this.marker_subscription.unsubscribe();
    if (this.map_subscription) this.map_subscription.unsubscribe();
    if (this.location_subscription) this.location_subscription.unsubscribe();
  }
}
