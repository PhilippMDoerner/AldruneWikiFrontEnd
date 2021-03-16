import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Character } from 'src/app/models/character';
import { QuoteObject, Quote } from 'src/app/models/quote';
import { QuoteService } from 'src/app/services/quote.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-quote-gallery',
  templateUrl: './quote-gallery.component.html',
  styleUrls: ['./quote-gallery.component.scss']
})

export class QuoteGalleryComponent extends PermissionUtilityFunctionMixin implements OnInit {
  constants: any = Constants;
  quote: Quote;
  quote_subscription: Subscription;
  @Input() character: Character;
  isLoadingNextQuote: boolean = false;

  inCreateState: boolean = false;
  inDeleteState: boolean = false;
  inEditState: boolean = false;

  constructor(
    private quoteService: QuoteService,
    private warningsService: WarningsService,
    public routingService: RoutingService,
  ) { super() }

  ngOnInit(): void {
    this.getNextRandomQuote()
  }

  getNextRandomQuote(){
    this.isLoadingNextQuote = true;
    this.quoteService.getRandomQuote(this.character.name).pipe(first()).subscribe(
      (quote: QuoteObject) => {
        if (quote.quote){
          this.quote = quote;
        }
        this.isLoadingNextQuote = false;
      },
      error => this.warningsService.showWarning(error)
    );
  }

  toggleCreateState(){
    this.inCreateState = !this.inCreateState;
  }

  onQuoteDelete(){
    this.getNextRandomQuote();
    this.inCreateState=false;
  }
}
