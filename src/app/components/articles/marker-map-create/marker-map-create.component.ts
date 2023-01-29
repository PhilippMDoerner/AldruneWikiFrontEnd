import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants, OverviewType } from 'src/app/app.constants';
import { MapObject } from 'src/app/models/map';
import { MapMarker, MapMarkerObject } from 'src/app/models/mapmarker';
import { MapService } from 'src/app/services/map.service';
import { MarkerService } from 'src/app/services/marker.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
@Component({
  selector: 'app-marker-map-create',
  templateUrl: './marker-map-create.component.html',
  styleUrls: ['./marker-map-create.component.scss']
})
export class MarkerMapCreateComponent implements OnInit {//TODO: Move this into ArticleFormMixin
  //URLs
  mapUrl: string;

  private parameter_subscription: Subscription;

  mapName: string;
  campaign: string = this.route.snapshot.params.campaign;
  constants: any = Constants;

  form = new FormGroup({});
  model: MapMarker;
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "latitude", isNumberInput: true}),
    this.formlyService.genericInput({key: "longitude", isNumberInput: true}),
    this.formlyService.genericSelect({key: "location", sortProp: "name_full", overviewType: OverviewType.Location, campaign: this.campaign}),
    this.formlyService.genericSelect({key: "map", overviewType: OverviewType.Map, campaign: this.campaign}),
    this.formlyService.genericSelect({key: 'type', valueProp: "id", labelProp: "name", label: "Marker Type", overviewType: OverviewType.MarkerTypeType, campaign: this.campaign}),
    this.formlyService.genericInput({key: "color", label: "Custom Color", required: false}),
    this.formlyService.genericInput({key: "icon", label: "Custom Icon", required: false}),
  ];

  constructor(
    private markerService: MarkerService,
    private mapService: MapService,
    private route: ActivatedRoute,
    private formlyService: MyFormlyService,
    private warnings: WarningsService,  
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params =>{
      const longitude: number = parseInt(params['longitude']);
      const latitude: number = parseInt(params['latitude']);
      this.mapName = params['map_name'];

      this.createUserModel(latitude, longitude);
      this.updateRouterLinks(this.campaign, params);
    });
  }

  updateRouterLinks(campaignName: string, params: Params): void{
    this.mapUrl = this.routingService.getRoutePath('map', {name: params.map_name, campaign: campaignName});
  }

  createUserModel(latitude: number, longitude: number){
    this.mapService.readByParam(this.campaign, {name: this.mapName}).pipe(first()).subscribe(
      (map: MapObject) =>{
        this.model = new MapMarkerObject();
        this.model.map = map.pk;
        this.model.latitude = latitude;
        this.model.longitude = longitude;
      },
      error => this.routingService.routeToErrorPage(error)
    )
  }

  onSubmit(){
    this.markerService.create(this.model).pipe(first()).subscribe(
      (marker: MapMarker) => this.routingService.routeToPath('map', {name: marker.map_details.name, campaign: this.campaign}),
      error => this.warnings.showWarning(error)
    );
  }

  onCancel(){
    this.routingService.routeToPath('map', {name: this.mapName, campaign: this.campaign});
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
