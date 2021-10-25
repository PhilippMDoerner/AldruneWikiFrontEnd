import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CampaignOverview } from 'src/app/models/campaign';
import { CreatureObject } from 'src/app/models/creature';
import { CreatureService } from 'src/app/services/creature/creature.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleMixin } from 'src/app/utils/functions/articleMixin';

@Component({
  selector: 'app-creature-article',
  templateUrl: './creature-article.component.html',
  styleUrls: ['./creature-article.component.scss']
})
export class CreatureArticleComponent extends ArticleMixin implements OnInit {
  //URLs
  creatureOverviewUrl: string;
  
  //ArticleMixin Variables
  articleData: CreatureObject;
  deleteRoute = {routeName: "creature-overview", params: {campaign: null}};
  queryParameterName = "name";

  constructor(
    creatureService: CreatureService,
    route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    globalUrlParams: GlobalUrlParamsService,
    tokenService: TokenService,
  ) { 
    super(
      creatureService,
      route,
      routingService,
      warnings,
      globalUrlParams,
      tokenService,
    )
  }
  
  updateDynamicVariables(campaign: CampaignOverview, articleData: CreatureObject, params: Params){
    this.creatureOverviewUrl = this.routingService.getRoutePath('creature-overview', {campaign: campaign.name});
  }
}
