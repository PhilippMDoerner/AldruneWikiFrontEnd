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
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-marker-map-create',
  templateUrl: './marker-map-create.component.html',
  styleUrls: ['./marker-map-create.component.scss']
})
export class MarkerMapCreateComponent implements OnInit {
  private parameter_subscription: Subscription;

  mapName: string;
  constants: any = Constants;

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
    private mapService: MapService,
    private router: Router,
    private route: ActivatedRoute,
    private formlyService: MyFormlyService,
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params =>{
      const longitude: number = params['longitude'];
      const latitude: number = params['latitude'];
      this.mapName = params['map_name'];
      
      this.mapService.getMap(this.mapName).pipe(first()).subscribe(map =>{
        this.model = new MapMarkerObject();
        this.model.map = map.pk;
        this.model.latitude = latitude;
        this.model.longitude = longitude;
      })
    });
  }

  onSubmit(){
    this.markerService.createMapMarker(this.model).pipe(first()).subscribe(
      (marker: MapMarker) => Constants.routeToPath(this.router, 'map', {name: marker.map_details.name}),
      error => console.log(error));
  }

  onCancel(){
    Constants.routeToPath(this.router, 'map', {name: this.mapName});
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
