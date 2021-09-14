import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CampaignOverview } from 'src/app/models/campaign';
import {  QuestObject } from 'src/app/models/quest';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { QuestService } from 'src/app/services/quest.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleMixin } from 'src/app/utils/functions/articleMixin';
import { CampaignOverviewComponent } from '../campaign-overview/campaign-overview.component';

@Component({
  selector: 'app-quest-article',
  templateUrl: './quest-article.component.html',
  styleUrls: ['./quest-article.component.scss']
})
export class QuestArticleComponent extends ArticleMixin implements OnInit {
  //URLs
  questGiverUrl: string;
  questOverviewUrl: string;

  //ArticleMixin Variables
  articleData: QuestObject;
  queryParameterName = "name";
  deleteRoute = {routeName: "quest-overview", params: {campaign: this.campaign}};

  constructor(
    questService: QuestService,
    public route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    globalUrlParams: GlobalUrlParamsService,
    tokenService: TokenService,
  ) {
    super(
      questService,
      route,
      routingService,
      warnings,
      globalUrlParams,
      tokenService,
    )
   }

   updateDynamicVariables(campaign: CampaignOverview, articleData: QuestObject, params: Params): void{
    this.questGiverUrl = this.routingService.getRoutePath('character', {name: articleData.giver_details.name, campaign: campaign.name});
    this.questOverviewUrl = this.routingService.getRoutePath('quest-overview', {campaign: campaign.name});
   }
}
