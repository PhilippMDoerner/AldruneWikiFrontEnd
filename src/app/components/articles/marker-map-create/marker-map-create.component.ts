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
@Component({
  selector: 'app-marker-map-create',
  templateUrl: './marker-map-create.component.html',
  styleUrls: ['./marker-map-create.component.scss']
})
export class MarkerMapCreateComponent implements OnInit {
  private marker_subscription: Subscription;
  private map_subscription: Subscription;
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
    console.log(this.route.snapshot.params);
    const longitude: number = this.route.snapshot.params['longitude'];
    const latitude: number = this.route.snapshot.params['latitude'];
    this.mapName = this.route.snapshot.params['map_name'];
    
    this.map_subscription = this.mapService.getMap(this.mapName).subscribe(map =>{
      this.model = new EmptyMapMarker();
      this.model.map = map.pk;
      this.model.latitude = latitude;
      this.model.longitude = longitude;
    })
  }

  onSubmit(model: MapMarker){
    this.marker_subscription = this.markerService.createMapMarker(model).subscribe((marker: MapMarker) => {
      this.router.navigateByUrl(`/map/${marker.map_details.name}`);
    }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.marker_subscription) this.marker_subscription.unsubscribe();
    if (this.map_subscription) this.map_subscription.unsubscribe();
  }
}
