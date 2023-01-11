import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { first } from 'rxjs/operators';
import { OverviewType } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { Encounter, EncounterObject } from 'src/app/models/encounter';
import { EncounterConnection, EncounterConnectionObject } from 'src/app/models/encounterconnection';
import { OverviewItem, OverviewItemObject } from 'src/app/models/overviewItem';
import { CharacterService } from 'src/app/services/character/character.service';
import { EncounterConnectionService } from 'src/app/services/encounter-connection.service';
import { EncounterServiceService } from 'src/app/services/encounter/encounter-service.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { CardFormMixin } from 'src/app/utils/functions/cardMixin';

@Component({
  selector: 'app-diary-entry-encounter',
  templateUrl: './diary-entry-encounter.component.html',
  styleUrls: ['./diary-entry-encounter.component.scss']
})
export class DiaryEntryEncounterComponent extends CardFormMixin {
  //URLs
  connectedCharacterUrls: string[];

  //CardFormMixin variables
  cardData: EncounterObject; //If the Encounter is being newly created, this is an old encounter, else its the current encounter

  userModel: EncounterObject;
  serverModel: Encounter;
  userModelClass = EncounterObject;

  cardDelete = new EventEmitter();

  @ViewChild('card') card: ElementRef;

  formlyFields: FormlyFieldConfig[] = [];
  //TODO: Implement for the compare form container to display only the fields that differ
  //TODO: Implement for the compare form container to highlight text differences in the server version
  
  //Custom Variables
  @Input() diaryEntryView: boolean;
  @Input() cutEncounterIndex: number;
  
  @Output() encounterOrderIncrease: EventEmitter<number> = new EventEmitter();
  @Output() encounterOrderDecrease: EventEmitter<number> = new EventEmitter();
  @Output() cardCreate: EventEmitter<EncounterObject[]> = new EventEmitter();
  @Output() excisionStart: EventEmitter<void> = new EventEmitter();
  @Output() excisionCancel: EventEmitter<void> = new EventEmitter();


  characterOptions : OverviewItem[];

  inEncounterConnectionCreationState: boolean = false;
  baseEncounterConnection: EncounterConnectionObject = new EncounterConnectionObject();

  constructor(
    public encounterService: EncounterServiceService,
    public warning: WarningsService,
    public routingService: RoutingService,
    private characterService: CharacterService,
    private encounterConnectionService: EncounterConnectionService,
    private formlyService: MyFormlyService,
    route: ActivatedRoute,
    tokenService: TokenService,
  ) { 
    super(
      warning,
      encounterService,
      route,
      tokenService,
    ); 
  }

  updateDynamicVariables(campaign: CampaignOverview, articleData: EncounterObject, params: Params){
    this.connectedCharacterUrls = articleData.encounterConnections.map(
      (connection: EncounterConnection) => this.routingService.getRoutePath('character', {
          name: connection.character_details.name, 
          campaign: campaign.name
      })
    );
  }

  getFormlyFieldConfigurations(campaign: CampaignOverview): FormlyFieldConfig[]{
    return [
      this.formlyService.genericInput({key: "title"}),
      this.formlyService.genericSelect({key: "location", label: "Encounter Location", sortProp: "name_full", overviewType: OverviewType.Location, required: false, campaign: campaign.name}),
      this.formlyService.genericTextField({key: "description", required: true}),
    ];
  }


  //TODO: Overhaul when specific data is loaded, ideally put some stuff like loading character choices or the like in an afterviewinit on the list component managing these cards
  createUserModel(): void{
    this.userModel = new EncounterObject();
    this.userModel.campaign = this.campaign.pk;
    this.userModel.diaryentry = this.cardData.diaryentry;
    this.userModel.order_index = this.cardData.nextOrderIndex(); //CardData is the prior encounter if this encounter is being newly created. Thus you want the nextOrderIndex from there
  }

  //Code About Encounter
  onCreationSuccess(createdArticles: EncounterObject[], parentClass: CardFormMixin){
    super.onCreationSuccess(createdArticles, parentClass);
    this.cardCreate.emit(createdArticles);
  }

  onDeletionSuccess(deletionResponse: any, parentClass: CardFormMixin){
    super.onDeletionSuccess(deletionResponse, parentClass);
    this.cardDelete.emit(this.index);
  }

  toggleCutState(){
    const isBeingCut = this.cutEncounterIndex === this.index;
    if(!isBeingCut){
      this.excisionStart.emit();
    } else {
      this.excisionCancel.emit();
    }
  }

  increaseEncounterOrderIndex(){
    this.encounterOrderIncrease.emit(this.index);
  }

  decreaseEncounterOrderIndex(){
    this.encounterOrderDecrease.emit(this.index);
  }


  articleCreate(userModel: any){
    const executionContext = this;

    this.encounterService.createForDiaryentry(this.campaign.name, userModel)
      .subscribe(
        (response: any) => this.onCreationSuccess(response, executionContext),
        (errorResponse: any) => this.onCreationError(errorResponse, executionContext)
      )
  }


  //Code about EncounterConnection
  //### Handling EncounterConnections ###
  toggleEncounterConnectionCreationState(){
    this.inEncounterConnectionCreationState = !this.inEncounterConnectionCreationState;
    if (!this.characterOptions){
      this.characterService.getNonPlayerCharacters(this.campaign.name).pipe(first()).subscribe(
        (characters: OverviewItemObject[]) => this.characterOptions = characters,
        error => this.warning.showWarning(error)
      );
    }
  }

  createEncounterConnection(encounter: Encounter){
    this.baseEncounterConnection.encounter = encounter.pk;
    this.baseEncounterConnection.campaign = this.campaign.pk;
    this.encounterConnectionService.create(this.baseEncounterConnection).pipe(first()).subscribe(
      (encounterConnection: EncounterConnectionObject) => {
        console.log("The connection")
        console.log(encounterConnection);
        encounter.encounterConnections.push(encounterConnection);
        this.updateDynamicVariables(this.campaign, encounter as EncounterObject, this.route.snapshot.params);
        this.resetBaseEncounterConnection();
        this.inEncounterConnectionCreationState = false;
      },
      error => this.warning.showWarning(error)
    );
  }

  deleteEncounterConnection(encounter: Encounter, connection: EncounterConnection){
    this.encounterConnectionService.delete(connection.pk).pipe(first()).subscribe(
      response => {
        const connectionIndex: number = encounter.encounterConnections.indexOf(connection);
        const encounterHasConnection = connectionIndex > -1;
        if (encounterHasConnection){
          encounter.encounterConnections.splice(connectionIndex, 1);
        }
      },
      error => this.warning.showWarning(error)
    );
  }

  resetBaseEncounterConnection(){
    this.baseEncounterConnection = new EncounterConnectionObject();
  }
}
