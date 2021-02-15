import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Character } from 'src/app/models/character';
import { OverviewItem, OverviewItemObject } from 'src/app/models/overviewItem';
import { Quote, QuoteConnection, QuoteConnectionObject, QuoteObject } from 'src/app/models/quote';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { OverviewService } from 'src/app/services/overview.service';
import { QuoteConnectionService } from 'src/app/services/quote-connection.service';
import { QuoteService } from 'src/app/services/quote.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';
import { createNew } from 'typescript';

@Component({
  selector: 'app-quotefield',
  templateUrl: './quotefield.component.html',
  styleUrls: ['./quotefield.component.scss']
})
export class QuotefieldComponent extends PermissionUtilityFunctionMixin implements OnInit{
  constants: any = Constants;

  @Input() quote: Quote;
  @Input() character: Character;
  @Input() enableRandomQuotes: boolean = false;
  @Input() enableLinkToOverview: boolean = false;
  @Input() enableCreatingQuotes: boolean = false;

  @Output() delete: EventEmitter<Quote> = new EventEmitter<Quote>();

  quote_subscription: Subscription;

  inCreateState: boolean = false;
  inDeleteState: boolean = false;
  inEditState: boolean = false;
  isLoadingNextQuote: boolean = false;

  baseQuoteConnection: QuoteConnection = new QuoteConnectionObject();
  inQuoteConnectionCreateState: boolean = false;
  characters: OverviewItem[];

  model: Quote;
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericTextField({key: "quote", required: true}),
    this.formlyService.genericInput({key: "description", required: true}),
    this.formlyService.genericSelect({key: "session", optionsType: "session", required: true}),
    this.formlyService.genericSelect({key: "encounter", optionsType: "encounter", required: false})
  ]

  constructor(
    private quoteService: QuoteService,
    private formlyService: MyFormlyService,
    private quoteConnectionservice: QuoteConnectionService,
    private overviewService: OverviewService,
    private warningsService: WarningsService,
    public routingService: RoutingService,
  ) { super() }

  ngOnInit(){
    const isRequestToCreateNewQuest = this.quote.pk == null;
    if(isRequestToCreateNewQuest){
      this.toggleCreateState();
    }
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

  async onSubmit(){
    const responseObservable = (this.inCreateState) ? this.quoteService.createQuote(this.model) : this.quoteService.updateQuote(this.model);
    try{
      this.quote = await responseObservable.toPromise();

      if(this.inCreateState){
        const connectionToThisCharacter: QuoteConnection = {"quote": this.quote.pk, "character": this.character.pk};
        const connection: QuoteConnectionObject = await this.quoteConnectionservice.createQuoteConnection(connectionToThisCharacter).toPromise();
        this.quote.connections = [connection];
        this.inCreateState = false;
      } else {
        this.inEditState = false;
      }

    } catch (error){
      this.warningsService.showWarning(error);
    }
  }

  onCancel(){
    if(this.inCreateState){
      this.delete.emit();
    }

    this.inCreateState=false; 
    this.inEditState=false
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
      this.overviewService.getOverviewItems('character').pipe(first()).subscribe(
        (characters: OverviewItemObject[]) => this.characters = characters,
        error => this.warningsService.showWarning(error)
      );
    }
  }

  createQuoteConnection(){
    this.baseQuoteConnection.quote = this.quote.pk;
    this.quoteConnectionservice.createQuoteConnection(this.baseQuoteConnection).pipe(first()).subscribe(
      (quoteConnection: QuoteConnection) => {
        this.quote.connections.push(quoteConnection);
        this.inQuoteConnectionCreateState = false;
        this.resetBaseQuoteConnection();
      },
      error => this.warningsService.showWarning(error)
    );
  }

  deleteQuoteConnection(quoteConnection: QuoteConnection){
    this.quoteConnectionservice.deleteQuoteConnection(quoteConnection.pk).pipe(first()).subscribe(
      response => {
        const quoteConnectionIndex: number = this.quote.connections.indexOf(quoteConnection);
        this.quote.connections.splice(quoteConnectionIndex, 1);
      },
      error => this.warningsService.showWarning(error)
    );
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
    this.quoteService.deleteQuote(this.quote.pk).pipe(first()).subscribe(
      response => {
        this.inDeleteState = false;
        this.delete.emit(this.quote);
      },
      error => this.warningsService.showWarning(error)
    )
  }

}
