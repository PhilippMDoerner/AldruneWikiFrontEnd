import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharacterObject } from "src/app/models/character";
import { CharacterService } from "src/app/services/character/character.service";
import { ActivatedRoute, Params } from "@angular/router";
import { WarningsService } from 'src/app/services/warnings.service';
import { RoutingService } from 'src/app/services/routing.service';
import { QuoteObject } from 'src/app/models/quote';
import { CharacterPlayerClassConnection } from 'src/app/models/playerclass';
import { ArticleMixin } from 'src/app/utils/functions/articleMixin';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { TokenService } from 'src/app/services/token.service';
import { CampaignOverview } from 'src/app/models/campaign';


@Component({
  selector: 'app-character-article',
  templateUrl: './character-article.component.html',
  styleUrls: ['./character-article.component.scss']
})

export class CharacterArticleComponent extends ArticleMixin implements OnInit, OnDestroy {
  //URLs
  characterOverviewUrl: string;
  organizationUrls: string[];
  locationUrl: string;
  itemCreateUrl: string;

  playerClassString: string;

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
    public routing: RoutingService,
    globalUrlParams: GlobalUrlParamsService,
    tokenService: TokenService,
    ) { 
      super(
        characterService,
        route,
        routing,
        warnings,
        globalUrlParams,
        tokenService,
      );
    }
  
  ngOnInit(): void {
    super.ngOnInit();
    this.articleData.items.sort((item1, item2) => item1.name > item2.name ? 1: -1);
  }


  updateDynamicVariables(campaign: CampaignOverview, articleData: CharacterObject, params: Params): void{
      this.updateRouteLinks(campaign, articleData, params);

      this.playerClassString = this.createPlayerClassString(articleData);
  }

  updateRouteLinks(campaign: CampaignOverview, articleData: CharacterObject, params: Params): void{
    this.characterOverviewUrl = this.routing.getRoutePath('character-overview', {campaign: campaign.name});
    this.itemCreateUrl = this.routing.getRoutePath('item-character-create', {character_name: articleData.name, campaign: campaign.name})
    this.locationUrl = this.routing.getRoutePath('location', {
      name: articleData.current_location_details?.name,
      parent_name: articleData.current_location_details?.parent_location,
      campaign: campaign.name
    }); 
    this.organizationUrls = articleData.organizations.map(organization => {
      return this.routing.getRoutePath(
        'organization', 
        {name: organization.name, campaign: campaign.name}
      );
    });
  }

  createPlayerClassString(articleData: CharacterObject): string{
    return articleData.player_class_connections
      .map((connection: CharacterPlayerClassConnection) => connection.player_class_details.name)
      .join(", ");
  }
}
