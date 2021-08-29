import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { first } from 'rxjs/operators';
import { Constants, OverviewType } from 'src/app/app.constants';
import { Encounter, EncounterObject } from 'src/app/models/encounter';
import { EncounterConnection, EncounterConnectionObject } from 'src/app/models/encounterconnection';
import { OverviewItem, OverviewItemObject } from 'src/app/models/overviewItem';
import { CharacterService } from 'src/app/services/character/character.service';
import { EncounterConnectionService } from 'src/app/services/encounter-connection.service';
import { EncounterServiceService } from 'src/app/services/encounter/encounter-service.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { CardFormMixin } from 'src/app/utils/functions/cardMixin';

@Component({
  selector: 'app-diary-entry-encounter',
  templateUrl: './diary-entry-encounter.component.html',
  styleUrls: ['./diary-entry-encounter.component.scss']
})
export class DiaryEntryEncounterComponent extends CardFormMixin {
  //CardFormMixin variables
  cardData: EncounterObject; //If the Encounter is being newly created, this is an old encounter, else its the current encounter

  userModel: EncounterObject;
  serverModel: Encounter;
  userModelClass = EncounterObject;

  cardDelete = new EventEmitter();

  @ViewChild('card') card: ElementRef;

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "title"}),
    this.formlyService.genericSelect({key: "location", label: "Encounter Location", overviewType: OverviewType.Location, required: false, campaign: this.campaign_details.name}),
    this.formlyService.genericTextField({key: "description", required: true}),
  ];
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
  ) { 
    super(
      warning,
      encounterService,
      route
    ); 
  }


  //TODO: Overhaul when specific data is loaded, ideally put some stuff like loading character choices or the like in an afterviewinit on the list component managing these cards
  createUserModel(): void{
    this.userModel = new EncounterObject();
    this.userModel.campaign = this.campaign_details.pk;
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

    console.log("article create on diaryentry encounter component")
    console.log(executionContext);

    this.encounterService.createForDiaryentry(this.campaign_details.name, userModel).subscribe(
        (response: any) => this.onCreationSuccess(response, executionContext),
        (errorResponse: any) => this.onCreationError(errorResponse, executionContext)
    )
  }


  //Code about EncounterConnection
  //### Handling EncounterConnections ###
  toggleEncounterConnectionCreationState(){
    this.inEncounterConnectionCreationState = !this.inEncounterConnectionCreationState;
    if (!this.characterOptions){
      this.characterService.getNonPlayerCharacters(this.campaign_details.name).pipe(first()).subscribe(
        (characters: OverviewItemObject[]) => this.characterOptions = characters,
        error => this.warning.showWarning(error)
      );
    }
  }

  createEncounterConnection(encounter: Encounter){
    this.baseEncounterConnection.encounter = encounter.pk;
    this.encounterConnectionService.create(this.baseEncounterConnection).pipe(first()).subscribe(
      (encounterConnection: EncounterConnectionObject) => {
        encounter.encounterConnections.push(encounterConnection);
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
