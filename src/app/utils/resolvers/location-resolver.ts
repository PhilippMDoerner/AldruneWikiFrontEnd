import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Params,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { CampaignOverview } from 'src/app/models/campaign';
import { LocationObject } from 'src/app/models/location';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { LocationService } from 'src/app/services/location/location.service';
import { RoutingService } from 'src/app/services/routing.service';
import {
  BaseArticleResolver,
  BaseArticleUpdateResolver,
} from './base-resolvers';

@Injectable({ providedIn: 'root' })
export class LocationResolver extends BaseArticleResolver {
  constructor(service: LocationService, routing: RoutingService) {
    super(service, routing);
  }

  getQueryParameter(params: Params): any {
    const locationName: string = params['name'];
    const parentLocationName: string = params['parent_name']
      ? params['parent_name']
      : 'None';
    return { locationName, parentLocationName };
  }
}

@Injectable({ providedIn: 'root' })
export class LocationUpdateResolver extends BaseArticleUpdateResolver {
  dataModelClass = LocationObject;

  constructor(
    service: LocationService,
    globalUrlParamsService: GlobalUrlParamsService,
    private routingService: RoutingService,
    routing: RoutingService
  ) {
    super(service, globalUrlParamsService, routing);
  }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<LocationObject> {
    const params: Params = route.params;
    const queryParameters: any = this.getQueryParameters(params);

    const campaign: CampaignOverview =
      await this.globalUrlParamsService.getCurrentCampaign();

    const modelData: Promise<any> = this.isUpdateRoute(state)
      ? this.fetchData(campaign, queryParameters)
      : this.createLocationData(state, campaign, queryParameters);

    return modelData;
  }

  getQueryParameters(params: Params): any {
    const locationName: string = params['name'];
    const parentLocationName: string = params['parent_name']
      ? params['parent_name']
      : 'None';
    return { locationName, parentLocationName };
  }

  async createLocationData(
    state: RouterStateSnapshot,
    campaign: CampaignOverview,
    queryParameters: any
  ): Promise<LocationObject> {
    const createdData: any = await super.createData(campaign, queryParameters);
    const locationData: LocationObject = createdData;

    if (this.isCreateRouteWithParentLocation(state, queryParameters)) {
      const parentLocation: LocationObject = await this.fetchParentLocationData(
        campaign.name,
        queryParameters
      );

      locationData.parent_location = parentLocation.pk;
      locationData.parent_location_details = {
        pk: parentLocation.pk,
        name: parentLocation.name,
        parent_location: parentLocation.parent_location_details.name,
        name_full: parentLocation.name_full,
      };
    }

    return locationData;
  }

  async fetchParentLocationData(
    campaignName: string,
    queryParameters: any
  ): Promise<LocationObject> {
    try {
      return await this.service
        .readByParam(campaignName, queryParameters)
        .toPromise();
    } catch (e) {
      this.routingService.routeToErrorPage(e);
    }
  }

  /** Checks if the location being created is supposed to be created immediately as sublocation for a specific
   * location or not.
   */
  isCreateRouteWithParentLocation(
    state: RouterStateSnapshot,
    queryParameters: { locationName: string; parentLocationName: string }
  ): boolean {
    const currentUrl: string = state.url;
    const isCreateUrl: boolean = currentUrl.endsWith('create');
    const hasParentLocation: boolean =
      queryParameters.locationName != null &&
      queryParameters.parentLocationName != null;
    return isCreateUrl && hasParentLocation;
  }
}

@Injectable({ providedIn: 'root' })
export class LocationMapCreateResolver implements Resolve<LocationObject> {
  constructor(private campaignService: GlobalUrlParamsService) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<LocationObject> {
    const dataModel: LocationObject = new LocationObject();

    const currentCampaign: CampaignOverview =
      await this.campaignService.getCurrentCampaign();
    dataModel.campaign = currentCampaign.pk;

    return dataModel;
  }
}
