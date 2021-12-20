import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Params,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { first } from 'rxjs/operators';
import { CampaignOverview } from 'src/app/models/campaign';
import { Location, LocationObject } from 'src/app/models/location';
import { MapObject } from 'src/app/models/map';
import { MapMarkerObject } from 'src/app/models/mapmarker';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { LocationService } from 'src/app/services/location/location.service';
import { MapService } from 'src/app/services/map.service';
import { MarkerService } from 'src/app/services/marker.service';
import { RoutingService } from 'src/app/services/routing.service';
import {
  BaseArticleResolver,
  BaseArticleUpdateResolver,
} from './base-resolvers';

@Injectable({ providedIn: 'root' })
export class MarkerResolver extends BaseArticleResolver {
  constructor(service: MarkerService, routing: RoutingService) {
    super(service, routing);
  }

  getQueryParameter(params: Params): any {
    const parentLocationName: string = params['parent_location_name'];
    const locationName: string = params['location_name'];
    const mapName: string = params['map_name'];

    return { parentLocationName, locationName, mapName };
  }
}

@Injectable({ providedIn: 'root' })
export class MarkerMapCreateResolver implements Resolve<MapMarkerObject> {
  constructor(
    private mapService: MapService,
    private globalUrlParamsService: GlobalUrlParamsService
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<MapMarkerObject> {
    const routeParams: Params = route.params;
    const currentCampaignName: string = routeParams.campaign;
    const mapName: string = routeParams.map_name;
    const map: MapObject = await this.mapService
      .readByParam(currentCampaignName, { name: mapName })
      .pipe(first())
      .toPromise();

    const dataModel: MapMarkerObject = new MapMarkerObject();
    dataModel.latitude = parseInt(routeParams.latitude);
    dataModel.longitude = parseInt(routeParams.longitude);
    dataModel.map = map.pk;

    return dataModel;
  }
}

@Injectable({ providedIn: 'root' })
export class MarkerUpdateResolver extends BaseArticleUpdateResolver {
  dataModelClass = MapMarkerObject;

  constructor(
    service: MarkerService,
    globalUrlParamsService: GlobalUrlParamsService,
    private locationService: LocationService,
    routing: RoutingService
  ) {
    super(service, globalUrlParamsService, routing);
  }

  getQueryParameters(params: Params): any {
    const parentLocationName: string = params['parent_location_name'];
    const locationName: string = params['location_name'];
    const mapName: string = params['map_name'];

    return { parentLocationName, locationName, mapName };
  }

  async createData(
    campaign: CampaignOverview,
    queryParameters: any
  ): Promise<MapMarkerObject> {
    const createdData: any = await super.createData(campaign, queryParameters);
    const userModel: MapMarkerObject = createdData;

    const markerLocation: LocationObject = await this.locationService
      .readByParam(campaign.name, queryParameters)
      .pipe(first())
      .toPromise();

    userModel.location = markerLocation.pk;
    userModel.location_details = {
      parent_location_name: markerLocation.parent_location_details.name,
      name: markerLocation.name,
      description: markerLocation.description,
      sublocations: null,
    };

    return userModel;
  }
}
