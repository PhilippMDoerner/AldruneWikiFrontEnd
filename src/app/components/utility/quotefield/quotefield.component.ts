import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants, OverviewType } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { Character } from 'src/app/models/character';
import { OverviewItem, OverviewItemObject } from 'src/app/models/overviewItem';
import { Quote, QuoteConnection, QuoteConnectionObject, QuoteObject } from 'src/app/models/quote';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { OverviewService } from 'src/app/services/overview.service';
import { QuoteConnectionService } from 'src/app/services/quote-connection.service';
import { QuoteService } from 'src/app/services/quote.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { copyToClipboard } from 'src/app/utils/functions/copy-to-clipboard';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-quotefield',
  templateUrl: './quotefield.component.html',
  styleUrls: ['./quotefield.component.scss']
})
export class QuotefieldComponent extends PermissionUtilityFunctionMixin implements OnInit, OnChanges{
  //URLs
  connectedCharacterURLs: string[] = [];
  quoteOverviewUrl: string;
  
  constants: any = Constants;

  @Input() quote: Quote;
  @Input() character: Character;
  @Input() campaign: CampaignOverview;
  @Input() enableRandomQuotes: boolean = false;
  @Input() enableLinkToOverview: boolean = false;
  @Input() enableCreatingQuotes: boolean = false;
  @Input() inCreateState: boolean = false;
  
  @Output() delete: EventEmitter<Quote> = new EventEmitter<Quote>();
  @Output() create: EventEmitter<Quote> = new EventEmitter<Quote>();

  quote_subscription: Subscription;

  inDeleteState: boolean = false;
  inEditState: boolean = false;
  isLoadingNextQuote: boolean = false;

  baseQuoteConnection: QuoteConnection = new QuoteConnectionObject();
  inQuoteConnectionCreateState: boolean = false;
  characters: OverviewItem[];

  model: Quote;
  form = new FormGroup({});
  fields: FormlyFieldConfig[];

  constructor(
    private quoteService: QuoteService,
    private formlyService: MyFormlyService,
    private quoteConnectionservice: QuoteConnectionService,
    private overviewService: OverviewService,
    private warningsService: WarningsService,
    public routingService: RoutingService,
    route: ActivatedRoute,
    tokenService: TokenService,
  ) { 
    super(tokenService, route);
  }

  ngOnInit(){
    if(this.inCreateState || this.isEmptyQuote(this.quote)){
      this.quote = new QuoteObject();
      this.quote.connections = [];
      this.toggleCreateState();
    }

    this.fields = this.getFormlyFieldConfigurations(this.campaign);
    this.updateDynamicVariables(this.campaign, this.character, this.quote?.connections);
  }

  getFormlyFieldConfigurations(campaign: CampaignOverview): FormlyFieldConfig[]{
    return [
      this.formlyService.genericTextField({key: "quote", required: true}),
      this.formlyService.genericInput({key: "description", required: true}),
      this.formlyService.genericSelect({key: "session", overviewType: OverviewType.Session, required: true, campaign: campaign.name}),
      this.formlyService.genericSelect({key: "encounter", overviewType: OverviewType.Encounter, required: false, campaign: campaign.name})
    ]
  }

  updateDynamicVariables(campaign: CampaignOverview, articleData: Character, connectedCharacters: QuoteConnection[]){
    if(connectedCharacters != null){
      this.connectedCharacterURLs = connectedCharacters.map(
        (connection: QuoteConnection) => this.routingService.getRoutePath('character', {
          name: connection.character_details.name, 
          campaign: campaign.name
        })
      );
    }

    this.quoteOverviewUrl = this.routingService.getRoutePath('quote-overview', {name: articleData.name, campaign: campaign.name})
  }

  ngOnChanges(){
    if(this.inCreateState){
      this.toggleCreateState();
    }
  }

  isEmptyQuote(quote: Quote): boolean{
    return quote?.pk == null;
  }

  getNextRandomQuote(){
    this.isLoadingNextQuote = true;
    this.quoteService.getRandomQuote(this.campaign.name, this.character.name).pipe(first()).subscribe(
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
    const responseObservable = (this.inCreateState) ? 
        this.quoteService.create(this.model) : 
        this.quoteService.update(this.model.pk, this.model);
    try{
      this.quote = await responseObservable.toPromise();
      this.model = this.quote;

      if(this.inCreateState){
        const connectionToThisCharacter: QuoteConnection = {"quote": this.quote.pk, "character": this.character.pk};
        const connection: QuoteConnectionObject = await this.quoteConnectionservice.create(connectionToThisCharacter).toPromise();
        this.quote.connections = [connection];
        this.inCreateState = false;
        this.create.emit(this.quote);
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
      this.overviewService.getCampaignOverviewItems(this.campaign.name, OverviewType.Character).pipe(first()).subscribe(
        (characters: OverviewItemObject[]) => this.characters = characters,
        error => this.warningsService.showWarning(error)
      );
    }
  }

  createQuoteConnection(){
    this.baseQuoteConnection.quote = this.quote.pk;
    this.quoteConnectionservice.create(this.baseQuoteConnection).pipe(first()).subscribe(
      (quoteConnection: QuoteConnection) => {
        this.quote.connections.push(quoteConnection);
        this.inQuoteConnectionCreateState = false;
        this.resetBaseQuoteConnection();
      },
      error => this.warningsService.showWarning(error)
    );
  }

  deleteQuoteConnection(quoteConnection: QuoteConnection){
    this.quoteConnectionservice.delete(quoteConnection.pk).pipe(first()).subscribe(
      response => {
        const quoteConnectionIndex: number = this.quote.connections.indexOf(quoteConnection);
        this.quote.connections.splice(quoteConnectionIndex, 1);
      },
      error => this.warningsService.showWarning(error)
    );
  }

  hasConnection(character: OverviewItem){
    for(let connection of this.quote.connections){
      if (connection.character_details.pk === character.pk) return true;
    }
    return false;
  }

  resetBaseQuoteConnection(){
    this.baseQuoteConnection = new QuoteConnectionObject();
  }

  copyQuoteToClipboard(){
    const quoteLines = this.quote.quote.split("<br />");
    const modifiedQuoteLines = quoteLines.map( (line: string) => `\>${line.trim().trimStart()}`);
    const modifiedQuote = modifiedQuoteLines.join("<br />");

    const descriptionSuffix = `- ${this.quote.description} `;
    const text = `${modifiedQuote}\n>${descriptionSuffix}`;
    copyToClipboard(text);
  }

  deleteQuote(){
    this.quoteService.delete(this.quote.pk).pipe(first()).subscribe(
      response => {
        this.inDeleteState = false;
        this.delete.emit(this.quote);
      },
      error => this.warningsService.showWarning(error)
    )
  }

}
