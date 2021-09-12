import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  QuestObject } from 'src/app/models/quest';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { QuestService } from 'src/app/services/quest.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleMixin } from 'src/app/utils/functions/articleMixin';

@Component({
  selector: 'app-quest-article',
  templateUrl: './quest-article.component.html',
  styleUrls: ['./quest-article.component.scss']
})
export class QuestArticleComponent extends ArticleMixin implements OnInit {
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
}
