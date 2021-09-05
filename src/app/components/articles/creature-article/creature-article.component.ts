import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatureObject } from 'src/app/models/creature';
import { CreatureService } from 'src/app/services/creature/creature.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleMixin } from 'src/app/utils/functions/articleMixin';

@Component({
  selector: 'app-creature-article',
  templateUrl: './creature-article.component.html',
  styleUrls: ['./creature-article.component.scss']
})
export class CreatureArticleComponent extends ArticleMixin implements OnInit {
  //ArticleMixin Variables
  articleData: CreatureObject;
  deleteRoute = {routeName: "creature-overview", params: {campaign: this.campaign}};
  queryParameterName = "name";

  constructor(
    creatureService: CreatureService,
    route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    globalUrlParams: GlobalUrlParamsService,
  ) { 
    super(
      creatureService,
      route,
      routingService,
      warnings,
      globalUrlParams
    )
  }
}
