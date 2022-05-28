import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CampaignOverview } from 'src/app/models/campaign';
import { Organization, OrganizationObject } from 'src/app/models/organization';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleMixin } from 'src/app/utils/functions/articleMixin';

@Component({
  selector: 'app-organization-article',
  templateUrl: './organization-article.component.html',
  styleUrls: ['./organization-article.component.scss']
})
export class OrganizationArticleComponent extends ArticleMixin implements OnInit {
  //URLs
  organizationOverviewUrl: string;
  characterCreateUrl: string;
  headquartersUrl: string;
  organizationLeaderUrl: string;

  //ArticleMixinVariables
  articleData: Organization;
  deleteRoute = {routeName: "organization-overview", params: {campaign: null}};
  queryParameterName: string = 'name';


  constructor(
    organizationService: OrganizationService,
    public route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    globalUrlParams: GlobalUrlParamsService,
    tokenService: TokenService,
  ) {
    super(
      organizationService,
      route,
      routingService,
      warnings,
      globalUrlParams,
      tokenService,
    )
   }

   ngOnInit(): void {
     super.ngOnInit();
     this.articleData.members = this.articleData.members.sort((char1, char2) => char1.name > char2.name ? 1 : -1);
   }

   updateDynamicVariables(campaign: CampaignOverview, articleData: OrganizationObject, params: Params): void{
    this.organizationOverviewUrl = this.routingService.getRoutePath('organization-overview', {campaign: campaign.name});
    this.characterCreateUrl = this.routingService.getRoutePath('character-create', {campaign: campaign.name});
    this.headquartersUrl = this.routingService.getRoutePath('location', {
      name: articleData.headquarter_details.name, 
      parent_name: articleData.headquarter_details.parent_name,
      campaign: campaign.name
    });
    this.organizationLeaderUrl = this.routingService.getRoutePath('character', {name: articleData.leader, campaign: campaign.name})
   }
}
