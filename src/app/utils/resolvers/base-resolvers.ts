import { ArticleObject } from 'src/app/models/base-models';
import {
  ActivatedRouteSnapshot,
  Params,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { catchError, filter, first } from 'rxjs/operators';
import { GenericService } from 'src/app/services/generic.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { CampaignOverview } from 'src/app/models/campaign';
import { RoutingService } from 'src/app/services/routing.service';

export class BaseArticleResolver implements Resolve<ArticleObject> {
  constructor(
    public service: GenericObjectService | GenericService,
    public routing: RoutingService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ArticleObject> | Promise<ArticleObject> {
    const params: Params = route.params;
    const campaignName: string = params.campaign;
    const queryParameters: any = this.getQueryParameter(params);

    return this.service.readByParam(campaignName, queryParameters).pipe(
      catchError((error) => {
        console.error(error);
        this.routing.routeToErrorPage(error);
        return of(null);
      }),
      first()
    );
  }

  getQueryParameter(params: Params) {
    return { name: params.name };
  }
}

export class BaseArticleListResolver implements Resolve<ArticleObject[]> {
  constructor(
    public service: GenericObjectService | GenericService,
    public routing: RoutingService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ArticleObject[]> | Promise<ArticleObject[]> {
    const params: Params = route.params;
    const campaignName: string = params.campaign;

    return this.service.campaignList(campaignName).pipe(
      catchError((error) => {
        console.error(error);
        this.routing.routeToErrorPage(error);
        return of(null);
      }),
      first()
    );
  }
}

export class BaseArticleDetailListResolver implements Resolve<ArticleObject[]> {
  constructor(
    public service: GenericObjectService | GenericService,
    public routing: RoutingService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ArticleObject[]> | Promise<ArticleObject[]> {
    const params: Params = route.params;
    const campaignName: string = params.campaign;

    return this.service.campaignDetailList(campaignName).pipe(
      catchError((error) => {
        console.error(error);
        this.routing.routeToErrorPage(error);
        return of(null);
      }),
      first()
    );
  }
}

export class BaseArticleUpdateResolver {
  dataModelClass: any;

  constructor(
    public service: GenericObjectService | GenericService,
    public globalUrlParamsService: GlobalUrlParamsService,
    public routing: RoutingService
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    const params: Params = route.params;
    const queryParameters: object = this.getQueryParameters(params);

    const campaign: CampaignOverview =
      await this.globalUrlParamsService.getCurrentCampaign();

    const modelData: Promise<ArticleObject> = this.isUpdateRoute(state)
      ? this.fetchData(campaign, queryParameters)
      : this.createData(campaign, queryParameters);
    return modelData;
  }

  isUpdateRoute(state: RouterStateSnapshot): boolean {
    return state.url.includes('update');
  }

  getQueryParameters(params: Params): object {
    return { name: params.name };
  }

  async createData(
    campaign: CampaignOverview,
    queryParameters: any
  ): Promise<ArticleObject> {
    if (this.dataModelClass == null)
      throw new Error(`Undefined dataModelClass in modelData Resolver. You tried to 
        create a model for a create route without telling in the resolver for the modelData which class the model is
        supposed to have`);

    const dataModel: ArticleObject = new this.dataModelClass();
    dataModel.campaign = campaign.pk;
    return dataModel;
  }

  async fetchData(
    campaign: CampaignOverview,
    queryParameters: any
  ): Promise<ArticleObject> {
    return this.service
      .readByParam(campaign.name, queryParameters)
      .pipe(
        catchError((error) => {
          console.error(error);
          this.routing.routeToErrorPage(error);
          return of(null);
        }),
        first()
      )
      .toPromise();
  }
}
