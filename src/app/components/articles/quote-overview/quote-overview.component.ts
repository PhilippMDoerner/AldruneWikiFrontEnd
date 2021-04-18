import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { CharacterObject } from 'src/app/models/character';
import { OverviewItem } from 'src/app/models/overviewItem';
import { Quote, QuoteConnection, QuoteConnectionObject, QuoteObject } from 'src/app/models/quote';
import { CharacterService } from 'src/app/services/character/character.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { QuoteConnectionService } from 'src/app/services/quote-connection.service';
import { QuoteService } from 'src/app/services/quote.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-quote-overview',
  templateUrl: './quote-overview.component.html',
  styleUrls: ['./quote-overview.component.scss']
})
export class QuoteOverviewComponent extends PermissionUtilityFunctionMixin implements OnInit, OnDestroy {
  quotes: Quote[];
  character: CharacterObject;

  baseQuoteConnection: QuoteConnection = new QuoteConnectionObject();
  inQuoteCreateState: boolean = false;
  inQuoteConnectionCreateState: boolean = false;
  characters: OverviewItem[];

  quoteModel: QuoteObject;
  quoteForm = new FormGroup({});
  quoteFields: FormlyFieldConfig[] = [
    this.formlyService.genericTextField({key: "quote", required: true}),
    this.formlyService.genericInput({key: "description", required: true}),
    this.formlyService.genericSelect({key: "session", optionsType: "session", required: true}),
    this.formlyService.genericSelect({key: "encounter", optionsType: "encounter", required: false})
  ]

  parameter_subscription: Subscription;


  constructor(
    private formlyService: MyFormlyService,
    private quoteService: QuoteService,
    private quoteConnectionService: QuoteConnectionService,
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private warning: WarningsService,
    public routingService: RoutingService,
  ) { super() }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(
      params => {
        const characterName = params.name;
        // Get Character
        this.characterService.readByParam(characterName).pipe(first()).subscribe(
          (character: CharacterObject) => this.character = character,
          error => this.routingService.routeToErrorPage(error)
        );
        
        // Get Character Quotes
        this.quoteService.getAllCharacterQuotes(characterName).pipe(first()).subscribe(
          (quotes: Quote[]) => {
            this.quotes = quotes;
            this.quotes.sort(this.sortQuotesBySession);
          },
          error => this.routingService.routeToErrorPage(error)
        );

      },
      error => this.warning.showWarning(error)
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

  async onSubmit(){
    try{
      // Create Quote
      const quote: QuoteObject = await this.quoteService.create(this.quoteModel).toPromise();

      // Create QuoteConnection
      const connectionToThisCharacter: QuoteConnection = {"quote": quote.pk, "character": this.character.pk};
      const connection: QuoteConnectionObject = await this.quoteConnectionService.create(connectionToThisCharacter).toPromise();
      
      // Combine in Frontend, add to quotes and sort
      quote.connections = [connection];
      this.quotes.unshift(quote);
      this.quotes.sort(this.sortQuotesBySession);

    } catch (error){
      this.warning.showWarning(error);
    }

    this.inQuoteCreateState = false;
  }

  onCancel(){
    this.inQuoteCreateState = false;
  }

  deleteQuote(quoteIndex: number){
    const quotesToDeleteCount: number = 1;
    this.quotes.splice(quoteIndex, quotesToDeleteCount);
  }

  ngOnDestroy(){
    if(this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }

}
