import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CampaignOverview } from 'src/app/models/campaign';
import {  RuleObject } from "src/app/models/rule";
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';
import { RuleService } from 'src/app/services/rule.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleListMixin } from 'src/app/utils/functions/articleListMixin';
@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent extends ArticleListMixin implements OnInit, AfterViewInit {
  //URLs
  homeUrl: string;

  articleModelClass = RuleObject;
  articleStarterTitle = "New Rule";

  @ViewChildren("ruleElements") articleElements: QueryList<any>;
  articlesInitialScrollParameter = "name";

  constructor(
    ruleService: RuleService,
    public routingService: RoutingService,
    tokenService: TokenService,
    route: ActivatedRoute,
    warning: WarningsService,
    globalUrlParams: GlobalUrlParamsService
  ) { 
    super(
      ruleService,
      route,
      routingService,
      warning,
      globalUrlParams,
      tokenService,
    )
  }

  updateDynamicVariables(campaign: CampaignOverview, articles: RuleObject[], params: Params){
    this.homeUrl = this.routingService.getRoutePath('home2', {campaign: campaign.name});
  }
}
