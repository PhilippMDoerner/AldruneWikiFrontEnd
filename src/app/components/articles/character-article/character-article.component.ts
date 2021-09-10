import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharacterObject } from "src/app/models/character";
import { CharacterService } from "src/app/services/character/character.service";
import { ActivatedRoute } from "@angular/router";
import { WarningsService } from 'src/app/services/warnings.service';
import { RoutingService } from 'src/app/services/routing.service';
import { QuoteObject } from 'src/app/models/quote';
import { CharacterPlayerClassConnection } from 'src/app/models/playerclass';
import { ArticleMixin } from 'src/app/utils/functions/articleMixin';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';


@Component({
  selector: 'app-character-article',
  templateUrl: './character-article.component.html',
  styleUrls: ['./character-article.component.scss']
})

export class CharacterArticleComponent extends ArticleMixin implements OnInit, OnDestroy {
  //ArticleMixin Variables
  articleData: CharacterObject;
  deleteRoute = {routeName: "character-overview", params: {campaign: null}}
  queryParameterName = "name";

  //Custom Variables
  quote: QuoteObject;
  quoteCreateState: boolean = false;

  constructor(
    characterService: CharacterService,
    public route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    globalUrlParams: GlobalUrlParamsService,
    ) { 
      super(
        characterService,
        route,
        routingService,
        warnings,
        globalUrlParams
      );
    }

  createPlayerClassString(){
    return this.articleData.player_class_connections
      .map((connection: CharacterPlayerClassConnection) => connection.player_class_details.name)
      .join(", ");
  }

}
