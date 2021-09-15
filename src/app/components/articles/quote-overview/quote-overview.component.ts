import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { OverviewType } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { Character, CharacterObject } from 'src/app/models/character';
import { OverviewItem } from 'src/app/models/overviewItem';
import { Quote, QuoteConnection, QuoteConnectionObject, QuoteObject } from 'src/app/models/quote';
import { CharacterService } from 'src/app/services/character/character.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
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
export class QuoteOverviewComponent extends ArticleListMixin implements OnInit, OnDestroy {
  //URLs
  characterUrl: string;

  //Other variables
  articles: any[];
  character: Character;

  baseQuoteConnection: QuoteConnection = new QuoteConnectionObject();
  inQuoteCreateState: boolean = false;
  inQuoteConnectionCreateState: boolean = false;
  characters: OverviewItem[];

  quoteModel: QuoteObject;
  quoteForm = new FormGroup({});
  quoteFields: FormlyFieldConfig[];

  constructor(
    private formlyService: MyFormlyService,
    private quoteService: QuoteService,
    private quoteConnectionService: QuoteConnectionService,
    private characterService: CharacterService,
    private warning: WarningsService,
    public routingService: RoutingService,
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
  
  async onArticleRouteChange(campaign: CampaignOverview, params: Params): Promise<void>{
    super.onArticleRouteChange(campaign, params);

    this.updateFormlyFields(campaign, params);
  }

  updateFormlyFields(campaign: CampaignOverview, params: Params): void{
    this.quoteFields = [
      this.formlyService.genericTextField({key: "quote", required: true}),
      this.formlyService.genericInput({key: "description", required: true}),
      this.formlyService.genericSelect({key: "session", overviewType: OverviewType.Session, required: true, campaign: campaign.name}),
      this.formlyService.genericSelect({key: "encounter", overviewType: OverviewType.Encounter, required: false, campaign: campaign.name})
    ]
  }

  /**This is called in "onArticleLoadFinished", by that time both character and quotes will have been loaded */
  updateDynamicVariables(campaign: CampaignOverview, articles: any[], params: Params): void{//articles is Quote[] but Quotes aren't ArticleObjects...yet
    this.characterUrl = this.routingService.getRoutePath('character', {name: this.character.name, campaign: campaign.name});
  }

  async loadArticleData(campaign: CampaignOverview, params: Params): Promise<void>{
    console.log(this);
    const campaignName: string = campaign.name;
    if(campaignName == null) return;

    const characterName: string = params.name;

    this.character = await this.characterService.readByParam(campaignName, {name: characterName}).toPromise();

    this.quoteService.getAllCharacterQuotes(campaign.name, characterName)
      .pipe(
        first(),
        map((quotes: Quote[]) => {
          quotes.sort(this.sortQuotesBySession);
          return quotes;
        })
      )
      .subscribe((quotes: any[]) => this.onArticleLoadFinished(quotes),
      error => this.routingService.routeToErrorPage(error)
    );
  }

  sortQuotesBySession(quote1: Quote, quote2: Quote){
    if(quote1.session_details.session_number > quote2.session_details.session_number) return -1;
    if(quote1.session_details.session_number < quote2.session_details.session_number) return 1;
    return 0;
  }

  toggleQuoteCreateState(){
    this.inQuoteCreateState = !this.inQuoteCreateState;

    if(this.inQuoteCreateState){
      this.quoteModel = new QuoteObject();
      this.quoteModel.encounter = null;
    };
  }

  async addArticle(){
    try{
      // Create Quote
      const quote: QuoteObject = await this.quoteService.create(this.quoteModel).toPromise();

      // Create QuoteConnection
      const connectionToThisCharacter: QuoteConnection = {"quote": quote.pk, "character": this.character.pk};
      const connection: QuoteConnectionObject = await this.quoteConnectionService.create(connectionToThisCharacter).toPromise();
      
      // Combine in Frontend, add to quotes and sort
      quote.connections = [connection];
      this.articles.unshift(quote);
      this.articles.sort(this.sortQuotesBySession);

    } catch (error){
      this.warning.showWarning(error);
    }

    this.inQuoteCreateState = false;
  }

  onCancel(){
    this.inQuoteCreateState = false;
  }
}
