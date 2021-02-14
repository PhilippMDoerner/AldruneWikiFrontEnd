import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { OverviewItem, OverviewItemObject } from 'src/app/models/overviewItem';
import { Quote, QuoteConnection, QuoteConnectionObject } from 'src/app/models/quote';
import { OverviewService } from 'src/app/services/overview.service';
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
export class QuoteOverviewComponent extends PermissionUtilityFunctionMixin implements OnInit {
  quotes: Quote[];

  baseQuoteConnection: QuoteConnection = new QuoteConnectionObject();
  inQuoteConnectionCreateState: boolean = false;
  characters: OverviewItem[];

  parameter_subscription: Subscription;


  constructor(
    private quoteService: QuoteService,
    private route: ActivatedRoute,
    private warning: WarningsService,
    public routingService: RoutingService,
    private quoteConnectionservice: QuoteConnectionService,
    private overviewService: OverviewService
  ) { super() }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(
      params => {
        const characterName: string = params.name;
        
        this.quoteService.getAllCharacterQuotes(characterName).pipe(first()).subscribe(
          (quotes: Quote[]) => {
            this.quotes = quotes;
            this.quotes.sort(this.sortQuotesBySession);
          },
          error => this.warning.showWarning(error)
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

  hasConnection(character: OverviewItem, quoteIndex: number){
    const quote: Quote = this.quotes[quoteIndex];
    for(let connection of quote.connections){
      if (connection.character_details.pk === character.pk){
        return true;
      }
    }
    return false;
  }

  toggleQuoteConnectionCreateState(){
    this.inQuoteConnectionCreateState = !this.inQuoteConnectionCreateState;

    if (!this.characters){
      this.overviewService.getOverviewItems('character').pipe(first()).subscribe(
        (characters: OverviewItemObject[]) => this.characters = characters,
        error => this.warning.showWarning(error)
      );
    }
  }

  resetBaseQuoteConnection(){
    this.baseQuoteConnection = new QuoteConnectionObject();
  }

  createQuoteConnection(quoteIndex: number){
    const quote: Quote = this.quotes[quoteIndex];

    this.baseQuoteConnection.quote = quote.pk;
    this.quoteConnectionservice.createQuoteConnection(this.baseQuoteConnection).pipe(first()).subscribe(
      (quoteConnection: QuoteConnection) => {
        quote.connections.push(quoteConnection);
        this.inQuoteConnectionCreateState = false;
        this.resetBaseQuoteConnection();
      },
      error => this.warning.showWarning(error)
    );
  }


  deleteQuoteConnection(quoteIndex: number, quoteConnection: QuoteConnection){
    const quote: Quote = this.quotes[quoteIndex];
    this.quoteConnectionservice.deleteQuoteConnection(quoteConnection.pk).pipe(first()).subscribe(
      response => {
        const quoteConnectionIndex: number = quote.connections.indexOf(quoteConnection);
        quote.connections.splice(quoteConnectionIndex, 1);
      },
      error => this.warning.showWarning(error)
    );
  }

}
