import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleObject } from 'src/app/models/base-models';
import { CampaignObject, CampaignOverview } from 'src/app/models/campaign';
import { CampaignService } from 'src/app/services/campaign.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';
import {
  BaseArticleUpdateResolver,
} from './base-resolvers';

@Injectable({ providedIn: 'root' })
export class CampaignResolver implements Resolve<CampaignOverview> {
  constructor(private globalUrlParams: GlobalUrlParamsService) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<CampaignOverview> {
    return await this.globalUrlParams.getCurrentCampaign();
  }
}

@Injectable({ providedIn: 'root'})
export class GlobalCampaignSetResolver implements Resolve<void>{
  constructor(private globalUrlParams: GlobalUrlParamsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): void {
    this.globalUrlParams.autoUpdateCampaignSet();
  }
}

@Injectable({ providedIn: 'root' })
export class CampaignDetailResolver {
  constructor(private campaignService: CampaignService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CampaignObject> {
    const campaignName: string = route.params.campaign;

    return this.campaignService.readByParam(campaignName);
  }
}

@Injectable({ providedIn: 'root' })
export class CampaignStatisticsResolver {
  constructor(private campaignService: CampaignService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CampaignObject> {
    const campaignName: string = route.params.campaign;

    return this.campaignService.statistics(campaignName);
  }
}

@Injectable({ providedIn: 'root' })
export class CampaignUpdateResolver extends BaseArticleUpdateResolver {
  dataModelClass = CampaignObject;

  constructor(
    private campaignService: CampaignService,
    router: Router,
    globalUrlParamsService: GlobalUrlParamsService,
    routing: RoutingService
  ) {
    super(campaignService, globalUrlParamsService, routing);
  }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    const campaign: CampaignOverview = await super.resolve(route, state);

    const modelData = this.isUpdateRoute(state)
      ? this.fetchData(campaign, null)
      : this.createData(campaign, null);
    return modelData;
  }

  async createData(
    campaign: CampaignOverview,
    queryParameters: any
  ): Promise<ArticleObject> {
    const dataModel: ArticleObject = new this.dataModelClass();
    return dataModel;
  }

  fetchData(
    campaign: CampaignOverview,
    queryParameters: any
  ): Promise<ArticleObject> {
    return this.campaignService.readByParam(campaign.name).toPromise();
  }
}
