import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Character } from 'src/app/models/character';
import { OverviewItem } from 'src/app/models/overviewItem';
import { QuoteObject, QuoteConnectionObject, Quote, QuoteConnection } from 'src/app/models/quote';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { OverviewService } from 'src/app/services/overview.service';
import { QuoteConnectionService } from 'src/app/services/quote-connection.service';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  selector: 'app-quote-gallery',
  templateUrl: './quote-gallery.component.html',
  styleUrls: ['./quote-gallery.component.scss']
})

export class QuoteGalleryComponent implements OnInit {
  constants: any = Constants;
  quote: Quote;
  quote_subscription: Subscription;
  @Input() character: Character;
  isLoadingNextQuote: boolean = false;

  inCreateState: boolean = false;
  inDeleteState: boolean = false;
  inEditState: boolean = false;

  baseQuoteConnection: QuoteConnection = new QuoteConnectionObject();
  inQuoteConnectionCreateState: boolean = false;
  characters: OverviewItem[];

  model: Quote;
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericTextField({key: "quote", required: true}),
    this.formlyService.genericInput({key: "description"}),
    this.formlyService.genericSelect({key: "session", optionsType: "session", required: true}),
    this.formlyService.genericSelect({key: "encounter", optionsType: "encounter", required: false})
  ]

  constructor(
    private quoteService: QuoteService,
    private formlyService: MyFormlyService,
    private quoteConnectionservice: QuoteConnectionService,
    private overviewService: OverviewService,
  ) { }

  ngOnInit(): void {
    this.getNextRandomQuote()
  }

  getNextRandomQuote(){
    this.isLoadingNextQuote = true;
    this.quoteService.getRandomQuote(this.character.name).pipe(first()).subscribe(quote => {
      if (quote.quote){
        this.quote = quote;
      }
      this.isLoadingNextQuote = false;
    })
  }

  onSubmit(){
    const responseObservable = (this.inCreateState) ? this.quoteService.createQuote(this.model) : this.quoteService.updateQuote(this.model);
    
    responseObservable.pipe(first()).subscribe(quote => {
      this.quote = quote;

      if (this.inCreateState){
        const connectionToThisCharacter: QuoteConnection = {"quote": quote.pk, "character": this.character.pk};
        this.quoteConnectionservice.createQuoteConnection(connectionToThisCharacter).pipe(first()).subscribe(connection => {
          this.quote.connections = [connection];
          this.inCreateState = false;
        })
      } else {
        this.inEditState = false;
      }
    })

  }

  toggleCreateState(){
    this.inCreateState = true;
    this.model = new QuoteObject();
    this.model.encounter = null;
  }

  toggleEditState(){
    this.inEditState = true;
    this.model = this.quote;
  }

  toggleQuoteConnectionCreateState(){
    this.inQuoteConnectionCreateState = !this.inQuoteConnectionCreateState;

    if (!this.characters){
      this.overviewService.getOverviewItems('character').pipe(first()).subscribe(characters => {
        this.characters = characters;
      });
    }
  }

  createQuoteConnection(){
    this.baseQuoteConnection.quote = this.quote.pk;
    this.quoteConnectionservice.createQuoteConnection(this.baseQuoteConnection).pipe(first()).subscribe((quoteConnection: QuoteConnection) => {
      this.quote.connections.push(quoteConnection);
      this.inQuoteConnectionCreateState = false;
      this.resetBaseQuoteConnection();
    });
  }

  deleteQuoteConnection(quoteConnection: QuoteConnection){
    this.quoteConnectionservice.deleteQuoteConnection(quoteConnection.pk).pipe(first()).subscribe(response => {
      const quoteConnectionIndex: number = this.quote.connections.indexOf(quoteConnection);
      this.quote.connections.splice(quoteConnectionIndex, 1);
    });
  }

  hasConnection(character: OverviewItem){
    for(let connection of this.quote.connections){
      if (connection.character_details.pk === character.pk){
        return true;
      }
    }
    return false;
  }

  resetBaseQuoteConnection(){
    this.baseQuoteConnection = new QuoteConnectionObject();
  }

  deleteQuote(){
    this.quoteService.deleteQuote(this.quote.pk).pipe(first()).subscribe(response => {
      this.inDeleteState = false;
      this.getNextRandomQuote();
    })
  }
}
