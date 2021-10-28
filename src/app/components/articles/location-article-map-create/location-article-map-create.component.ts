import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants, OverviewType } from 'src/app/app.constants';
import { MapMarker, MapMarkerObject } from 'src/app/models/mapmarker';
import { MapService } from 'src/app/services/map.service';
import { MarkerService } from 'src/app/services/marker.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { LocationObject } from 'src/app/models/location';
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
  //URLs
  mapUrl: string;

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

  location_fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", isNameInput: true}),
    this.formlyService.genericSelect({key: "parent_location", label: "Parent Location", overviewType: OverviewType.Location, sortProp: "name_full", campaign: this.campaign, required: false}),
  ];

  marker_fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "latitude", isNumberInput: true}),
    this.formlyService.genericInput({key: "longitude", isNumberInput: true}),
    this.formlyService.genericSelect({key: "map", overviewType: OverviewType.Map, campaign: this.campaign}),
    this.formlyService.genericSelect({key: "type", labelProp: "name", valueProp: "id", label: "Marker Type", overviewType: OverviewType.MarkerTypeType, campaign: this.campaign}),
    this.formlyService.genericInput({key: "color", label: "Custom Color", required: false}),
    this.formlyService.genericInput({key: "icon", label: "Custom Icon", required: false})
  ]
  //TODO: Make this make use of ArticleFormMixin
  ngOnInit(): void {
    this.markerModel = this.route.snapshot.data["markerModelData"];
    this.locationModel = this.route.snapshot.data["locationModelData"];

    this.updateRouterLinks(this.campaign, this.route.snapshot.params);
  }

  updateRouterLinks(campaignName: string, params: Params): void{
    this.mapUrl = this.routingService.getRoutePath('map', {name: params.map_name, campaign: campaignName});
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
