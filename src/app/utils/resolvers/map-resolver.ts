import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Params,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { CampaignOverview } from 'src/app/models/campaign';
import { MapObject } from 'src/app/models/map';
import { OverviewItemObject } from 'src/app/models/overviewItem';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { MapService } from 'src/app/services/map.service';
import { RoutingService } from 'src/app/services/routing.service';
import { BaseArticleUpdateResolver } from './base-resolvers';

@Injectable({ providedIn: 'root' })
export class MapResolver
  implements Resolve<{ mapData: MapObject; maps: OverviewItemObject[] }>
{
  constructor(
    private service: MapService,
    private globalUrlParams: GlobalUrlParamsService
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<{ mapData: MapObject; maps: OverviewItemObject[] }> {
    const params: Params = route.params;
    console.log('my params: ');
    console.log(params);
    const campaign: CampaignOverview =
      await this.globalUrlParams.getCurrentCampaign();
    const maps: OverviewItemObject[] = await this.service
      .campaignList(campaign.name)
      .pipe(first())
      .toPromise();

    const queryParameters: any = this.getQueryParameter(params, campaign, maps);
    if (queryParameters == null) {
      const emptyMapsList: OverviewItemObject[] = [];
      return of({ maps: emptyMapsList, mapData: null }).toPromise();
    }

    return this.service
      .readByParam(campaign.name, queryParameters)
      .pipe(
        first(),
        map((mapData) => {
          return { mapData, maps };
        })
      )
      .toPromise();
  }

  /**
   * Fetches the map name from the url. If there is no map name parameter, it tries to give back the default map configured
   * for this campaign. If there is no default map, it tries to load the first map in the list of maps. If there are no maps,
   * it returns null
   */
  getQueryParameter(
    params: Params,
    campaign: CampaignOverview,
    maps: OverviewItemObject[]
  ): any {
    if (maps.length === 0) return null;

    const hasMapParameter: boolean = params.name != null;
    const mapName: string = hasMapParameter
      ? params.name
      : this.getSecondaryMapChoice(campaign, maps);

    return { name: mapName };
  }

  getSecondaryMapChoice(
    campaign: CampaignOverview,
    maps: OverviewItemObject[]
  ): string {
    if (maps.length === 0) return;

    const campaignDefaultMapName: string = campaign.default_map_details?.name;
    if (campaignDefaultMapName != null) return campaignDefaultMapName;

    const firstMapName: string = maps[0].name;
    return firstMapName;
  }
}

@Injectable({ providedIn: 'root' })
export class MapOverviewResolver implements Resolve<OverviewItemObject[]> {
  constructor(private service: MapService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<OverviewItemObject[]> {
    const params: Params = route.params;
    const campaignName: string = params.campaign;

    return this.service.campaignList(campaignName);
  }
}

@Injectable({ providedIn: 'root' })
export class MapUpdateResolver extends BaseArticleUpdateResolver {
  dataModelClass = MapObject;

  constructor(
    service: MapService,
    globalUrlParams: GlobalUrlParamsService,
    routing: RoutingService
  ) {
    super(service, globalUrlParams, routing);
  }
}
