import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { first } from 'rxjs/operators';
import { OverviewType } from 'src/app/app.constants';
import { ApiObject } from 'src/app/models/base-models';
import { CampaignObject } from 'src/app/models/campaign';
import { CampaignService } from 'src/app/services/campaign.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleFormMixin } from 'src/app/utils/functions/articleFormMixin';

@Component({
  selector: 'app-campaign-update',
  templateUrl: './campaign-update.component.html',
  styleUrls: ['./campaign-update.component.scss'],
})
export class CampaignUpdateComponent extends ArticleFormMixin {
  //URLs
  campaignAdminUrl: string;
  campaignOverviewUrl: string;

  //Defining ArticleFormMixin Properties
  serverModel: CampaignObject;
  userModel: any;
  userModelClass = CampaignObject;

  updateCancelRoute = { routeName: 'home2', params: { campaign: null } };
  creationCancelRoute = { routeName: 'campaign-overview', params: {} };

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({
      key: 'name',
      isNameInput: true,
      required: true,
      maxLength: 400,
    }),
    this.formlyService.genericInput({
      key: 'subtitle',
      isNameInput: false,
      required: false,
      maxLength: 400,
    }),
    this.formlyService.genericSelect({
      key: 'default_map',
      label: 'Default Map',
      valueProp: 'pk',
      overviewType: OverviewType.Map,
      campaign: this.campaign.name,
      required: false,
    }),
    this.formlyService.singleFileField({
      key: 'background_image',
      required: true,
    }),
    this.formlyService.singleFileField({ key: 'icon', required: true }),
  ];

  constructor(
    private formlyService: MyFormlyService,
    router: Router,
    routingService: RoutingService,
    warning: WarningsService,
    campaignService: CampaignService,
    route: ActivatedRoute,
    globalUrlParam: GlobalUrlParamsService,
    tokenService: TokenService
  ) {
    super(
      router,
      routingService,
      warning,
      campaignService,
      campaignService,
      globalUrlParam,
      route,
      tokenService
    );
  }

  getQueryParameters(params: Params): object {
    return { name: params.campaign };
  }

  updateRouterLinks(
    campaignName: string,
    userModel: CampaignObject,
    params: Params
  ): void {
    this.campaignAdminUrl = this.routingService.getRoutePath('campaign-admin', {
      campaign: params.campaign,
    });
    this.campaignOverviewUrl =
      this.routingService.getRoutePath('campaign-overview');
  }

  onUpdateSuccess(updatedArticle: any, self: any) {
    this.routingService.routeToPath('campaign-admin', {
      campaign: updatedArticle.name,
    });

    this.globalUrlParam.autoUpdateCampaignSet();
  }

  articleUpdate(userModel: any) {
    if (userModel.pk == null)
      throw `Invalid userModel Exception. The userModel provided here does not have a primary
    key defined. This primary key is necessary to update the correct article in the database. Please contact the developer`;

    const executionContext = this;

    this.articleService
      .patch(userModel.pk, userModel)
      .pipe(first())
      .subscribe(
        (response: ApiObject) =>
          this.onUpdateSuccess(response, executionContext),
        (errorResponse: any) =>
          this.onUpdateError(errorResponse, executionContext)
      );
  }

  async onCreationSuccess(createdArticle: any, self: ArticleFormMixin) {
    throw 'InvalidFunctionError. Campaign Update can not create campaigns';
  }
}
