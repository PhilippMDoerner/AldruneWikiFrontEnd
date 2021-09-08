import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants, OverviewType } from 'src/app/app.constants';
import { MapMarker, MapMarkerObject } from 'src/app/models/mapmarker';
import { MapService } from 'src/app/services/map.service';
import { MarkerService } from 'src/app/services/marker.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { LocationObject, Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location/location.service';
import { first } from 'rxjs/operators';
import { ExtendedMap } from 'src/app/models/map';
import { WarningsService } from 'src/app/services/warnings.service';
import { RoutingService } from 'src/app/services/routing.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';

@Component({
  selector: 'app-location-article-map-create',
  templateUrl: './location-article-map-create.component.html',
  styleUrls: ['./location-article-map-create.component.scss']
})
export class LocationArticleMapCreateComponent implements OnInit {
  private parameter_subscription: Subscription;

  constants: any = Constants;
  mapName: string;
  campaign: string = this.route.snapshot.params.campaign;

  locationForm = new FormGroup({});
  locationModel: LocationObject;

  markerForm = new FormGroup({});
  markerModel: MapMarkerObject;

  constructor(
    private markerService: MarkerService,
    private mapService: MapService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private formlyService: MyFormlyService,
    private warnings: WarningsService,  
    public routingService: RoutingService,
    private campaignService: CampaignService,
    private globalUrlParams: GlobalUrlParamsService,
  ) { }

  location_fields: FormlyFieldConfig[] = this.formlyService.getFieldConfigForLocation(this.campaign);
  marker_fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "latitude", isNumberInput: true}),
    this.formlyService.genericInput({key: "longitude", isNumberInput: true}),
    this.formlyService.genericSelect({key: "map", overviewType: OverviewType.Map, campaign: this.campaign}),
    this.formlyService.genericSelect({key: "type", label: "Marker Type", overviewType: OverviewType.MarkerType, campaign: this.campaign}),
    this.formlyService.genericInput({key: "color", label: "Custom Color", required: false}),
    this.formlyService.genericInput({key: "icon", label: "Custom Icon", required: false})
  ]
  //TODO: Make this make use of ArticleFormMixin
  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const longitude: number = params['longitude'];
      const latitude: number = params['latitude'];
      this.mapName = params['map_name'];

      this.createUserModel(latitude, longitude);

      this.globalUrlParams.updateCurrentlySelectedCampaign(params.campaign);
    });
  }


  createUserModel(latitude: number, longitude: number): void{
    this.createMarkerModel(latitude, longitude);
    this.createLocationModel();
  }

  createMarkerModel(latitude: number, longitude: number){
    this.markerModel = new MapMarkerObject();

    this.mapService.readByParam(this.campaign, this.mapName).pipe(first()).subscribe(
      (map: ExtendedMap) =>{
        this.markerModel.map = map.pk;
        this.markerModel.latitude = latitude;
        this.markerModel.longitude = longitude;
      },
      error => this.routingService.routeToErrorPage(error)
    );
  }

  createLocationModel(){
    this.locationModel = new LocationObject();

    this.campaignService.readByParam(this.campaign).pipe(first()).subscribe(
      (campaignData: {name: String, pk: number}) => this.locationModel.campaign = campaignData.pk,
      error => this.warnings.showWarning(error)
    );
  }

  onSubmit(){
    this.locationService.create(this.locationModel).pipe(first()).subscribe(
      (location: LocationObject) => {
        this.markerModel.location = location.pk;

        this.markerService.create(this.markerModel).pipe(first()).subscribe(
          (marker: MapMarker) => this.routingService.routeToApiObject(location), 
          error => this.warnings.showWarning(error)
        ) 
      },
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
