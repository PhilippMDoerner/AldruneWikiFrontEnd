import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
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
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-diary-entry-encounter',
  templateUrl: './diary-entry-encounter.component.html',
  styleUrls: ['./diary-entry-encounter.component.scss']
})
export class DiaryEntryEncounterComponent extends CardFormMixin implements OnInit {
  //CardFormMixin variables
  cardData: EncounterObject;
  userModel: EncounterObject;
  serverModel: Encounter;

  cardDelete = new EventEmitter();

  @ViewChild('card') card: ElementRef;

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "title"}),
    this.formlyService.genericSelect({key: "author", labelProp: "name", optionsType: "users"}),
    this.formlyService.genericSelect({key: "session_number", label: "Session", optionsType: "session"}),
    this.formlyService.genericSelect({key: "location", label: "Encounter Location", optionsType: "location"}),
    this.formlyService.genericTextField({key: "description", required: true}),
  ];
  //TODO: Implement for the compare form container to display only the fields that differ
  //TODO: Implement for the compare form container to highlight text differences in the server version
  
  //Custom Variables
  @Input() diaryEntryView: boolean;
  @Input() cutEncounterIndex: number;
  
  @Output() encounterOrderIncrease: EventEmitter<number> = new EventEmitter();
  @Output() encounterOrderDecrease: EventEmitter<number> = new EventEmitter();
  @Output() cardCreate: EventEmitter<EncounterObject> = new EventEmitter();
  @Output() excisionStart: EventEmitter<void> = new EventEmitter();
  @Output() excisionCancel: EventEmitter<void> = new EventEmitter();


  characterOptions : OverviewItem[];

  inEncounterConnectionCreationState: boolean = false;
  baseEncounterConnection: EncounterConnectionObject = new EncounterConnectionObject();

  constructor(
    encounterService: EncounterServiceService,
    public warning: WarningsService,
    public routingService: RoutingService,
    private characterService: CharacterService,
    private encounterConnectionService: EncounterConnectionService,
    private formlyService: MyFormlyService,
    private tokenService: TokenService,
  ) { 
    super(
      warning,
      encounterService,
    ); 
  }

  ngOnInit(): void {
    const isEncounterCreateState: boolean = this.cardData.pk == null;
    this.formState = isEncounterCreateState ? Constants.createState : Constants.displayState;

    if (isEncounterCreateState){
      this.userModel = new EncounterObject();
      this.userModel.author = this.tokenService.getCurrentUserPk();
    }
  }

  //Code About Encounter
  onUpdateSuccess(updatedArticle: EncounterObject, parentClass: CardFormMixin){
    //You need to tranfer the connection object as the returning encounter won't carry a connection object - 
    //its API endpoint isn't diaryentries, where they are added, but the encounter-api, where you wouldn't 
    //know which connection you'd want with this encounter
    updatedArticle.connection = parentClass.cardData.connection;

    super.onUpdateSuccess(updatedArticle, parentClass);
  }

  onCreationSuccess(createdArticle: EncounterObject, parentClass: CardFormMixin){
    createdArticle.connection = this.cardData.connection;
    super.onCreationSuccess(createdArticle, parentClass);
    this.cardCreate.emit(createdArticle);
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


  //Code about EncounterConnection
  //### Handling EncounterConnections ###
  toggleEncounterConnectionCreationState(){
    this.inEncounterConnectionCreationState = !this.inEncounterConnectionCreationState;
    if (!this.characterOptions){
      this.characterService.getNonPlayerCharacters().pipe(first()).subscribe(
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
