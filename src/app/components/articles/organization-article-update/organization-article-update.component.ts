import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OverviewType } from 'src/app/app.constants';
import { OrganizationObject, Organization } from 'src/app/models/organization';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { RoutingService } from 'src/app/services/routing.service';
import { ArticleFormMixin } from 'src/app/utils/functions/articleFormMixin';
import { CampaignService } from 'src/app/services/campaign.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-organization-article-update',
  templateUrl: './organization-article-update.component.html',
  styleUrls: ['./organization-article-update.component.scss']
})
export class OrganizationArticleUpdateComponent extends ArticleFormMixin implements OnInit {
  //Defining ArticleFormMixin
  userModel: OrganizationObject;
  serverModel: Organization;
  userModelClass = OrganizationObject;

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", isNameInput: true}),
    this.formlyService.genericSelect({key: "leader", valueProp: "name", overviewType: OverviewType.Character, campaign: this.campaign.name, required: false}),
    this.formlyService.genericSelect({key: "headquarter", sortProp: "name_full", overviewType: OverviewType.Location, campaign: this.campaign.name, required: false}),
  ];

  //Custom Properties

  constructor(
    organizationService: OrganizationService,
    router: Router,
    route: ActivatedRoute,
    private formlyService: MyFormlyService,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    campaignService: CampaignService,
    globalUrlParams: GlobalUrlParamsService,
    tokenService: TokenService,
  ) { 
    super(
      router,
      routingService,
      warnings,
      organizationService,
      campaignService,
      globalUrlParams,
      route,
      tokenService,
    )
  }

  updateRouterLinks(campaignName: string, userModel: OrganizationObject, params: Params){
    this.creationCancelUrl = this.routingService.getRoutePath("organization-overview", {campaign: campaignName});
    this.updateCancelUrl = this.routingService.getRoutePath("organization", {campaign: campaignName, name: params.name});
  }
}