import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { CampaignOverview } from 'src/app/models/campaign';
import { Character } from 'src/app/models/character';
import { OverviewItem } from 'src/app/models/overviewItem';
import { Quote, QuoteConnection, QuoteConnectionObject, QuoteObject } from 'src/app/models/quote';
import { CharacterService } from 'src/app/services/character/character.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { QuoteConnectionService } from 'src/app/services/quote-connection.service';
import { QuoteService } from 'src/app/services/quote.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleListMixin } from 'src/app/utils/functions/articleListMixin';

@Component({
  selector: 'app-quote-overview',
  templateUrl: './quote-overview.component.html',
  styleUrls: ['./quote-overview.component.scss']
})
export class QuoteOverviewComponent extends ArticleListMixin implements OnInit {
  //URLs
  characterUrl: string;

  //Other variables
  articles: any[];
  character: Character;

  baseQuoteConnection: QuoteConnection = new QuoteConnectionObject();
  inQuoteCreateState: boolean = false;
  inQuoteConnectionCreateState: boolean = false;
  characters: OverviewItem[];

  constructor(
    characterService: CharacterService,
    warning: WarningsService,
    routingService: RoutingService,
    route: ActivatedRoute,
    tokenService: TokenService,
    globalUrlParams: GlobalUrlParamsService,
  ) { 
    super(
      characterService,
      route,
      routingService,
      warning,
      globalUrlParams,
      tokenService
    );
  }

  ngOnInit(): void{
    this.character = this.route.snapshot.data["character"];
    super.ngOnInit();

    this.articles = this.articles.sort(this.sortQuotesBySession);
  }

  /**This is called in "onArticleLoadFinished", by that time both character and quotes will have been loaded */
  updateDynamicVariables(campaign: CampaignOverview, articles: any[], params: Params): void{//articles is Quote[] but Quotes aren't ArticleObjects...yet
    this.characterUrl = this.routingService.getRoutePath('character', {name: this.character.name, campaign: campaign.name});
  }

  sortQuotesBySession(quote1: Quote, quote2: Quote){
    if(quote1.session_details.session_number > quote2.session_details.session_number) return -1;
    if(quote1.session_details.session_number < quote2.session_details.session_number) return 1;
    return 0;
  }

  addArticle(){
    const newArticle: Quote = new QuoteObject();
    this.articles.unshift(newArticle);
  }

  onArticleDelete(index: number){
    this.articles.splice(index, 1);
  }
}
