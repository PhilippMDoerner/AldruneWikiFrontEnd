import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { first } from 'rxjs/operators';
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
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-diary-entry-encounter',
  templateUrl: './diary-entry-encounter.component.html',
  styleUrls: ['./diary-entry-encounter.component.scss']
})
export class DiaryEntryEncounterComponent extends PermissionUtilityFunctionMixin implements OnInit {
  @Input() encounter: EncounterObject;
  @Input() encounterIndex: number;
  @Input() diaryEntryView: boolean;
  @Input() cutEncounterIndex: number;
  
  @Output() encounterDelete: EventEmitter<EncounterObject> = new EventEmitter();
  @Output() encounterOrderIncrease: EventEmitter<number> = new EventEmitter();
  @Output() encounterOrderDecrease: EventEmitter<number> = new EventEmitter();
  @Output() encounterCreate: EventEmitter<EncounterObject> = new EventEmitter();
  @Output() excisionStart: EventEmitter<void> = new EventEmitter();
  @Output() excisionCancel: EventEmitter<void> = new EventEmitter();

  characterOptions : OverviewItem[];

  isEncounterCreateState: boolean = false;
  isEncounterUpdateState: boolean = false;

  form = new FormGroup({});
  model: EncounterObject;
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "title"}),
    this.formlyService.genericSelect({key: "author", labelProp: "name", optionsType: "users"}),
    this.formlyService.genericSelect({key: "session_number", label: "Session", optionsType: "session"}),
    this.formlyService.genericSelect({key: "location", label: "Encounter Location", optionsType: "location"}),
    this.formlyService.genericTextField({key: "description", required: true}),
  ];

  inEncounterConnectionCreationState: boolean = false;
  baseEncounterConnection: EncounterConnectionObject = new EncounterConnectionObject();

  constructor(
    private encounterService: EncounterServiceService,
    private warning: WarningsService,
    public routingService: RoutingService,
    private characterService: CharacterService,
    private encounterConnectionService: EncounterConnectionService,
    private formlyService: MyFormlyService,
    private tokenService: TokenService,
  ) { super(); }

  ngOnInit(): void {
    this.encounter;
    this.isEncounterCreateState = this.encounter.pk == null;

    if (this.isEncounterCreateState){
      this.encounter.author = this.tokenService.getCurrentUserPk();
    }
  }

  //Code About Encounter
  onDescriptionUpdate(updatedDescription: string){
    const oldDescription = this.encounter.description;

    this.encounter.description = updatedDescription;
    this.encounterService.update(this.encounter.pk, this.encounter).pipe(first()).subscribe(
      (encounter: EncounterObject) => {},
      error => {
        this.encounter.description = oldDescription;
        this.warning.showWarning(error);
      }
    )
  }

  toggleFormState(){
    if(this.isEncounterUpdateState){
      this.isEncounterCreateState = false;
      this.isEncounterUpdateState = false;
    } else if (this.isEncounterCreateState){
      this.encounterDelete.emit(this.encounter);
    } else {
      this.isEncounterUpdateState = true;
    }
  }

  toggleCutState(){
    const isBeingCut = this.cutEncounterIndex === this.encounterIndex;
    if(!isBeingCut){
      this.excisionStart.emit();
    } else {
      this.excisionCancel.emit();
    }
  }

  toggleEncounterUpdateState(){
    this.isEncounterUpdateState = !this.isEncounterUpdateState;
    this.isEncounterCreateState = false;
  }

  updateEncounter(model: Encounter){
    this.encounterService.update(model.pk, model).pipe(first()).subscribe(
      (updatedEncounter: EncounterObject) => {
        //You need to tranfer the connection object as the returning encounter won't carry a connection object - 
        //it's API endpoint isn't diaryentries, where they are added, but the encounter-api, where you wouldn't 
        //know which connection you'd want with this encounter
        updatedEncounter.connection = this.encounter.connection; 

        this.encounter = updatedEncounter;
        this.isEncounterUpdateState = false;
      },
      error => this.warning.showWarning(error)
    );
  }

  toggleEncounterCreateState(){
    this.isEncounterCreateState = !this.isEncounterCreateState;
    this.isEncounterUpdateState = false;
  }

  createEncounter(model: EncounterObject){
    this.isEncounterCreateState = false;
    this.encounterCreate.emit(model);
  }

  increaseEncounterOrderIndex(){
    this.encounterOrderIncrease.emit(this.encounterIndex);
  }

  decreaseEncounterOrderIndex(){
    this.encounterOrderDecrease.emit(this.encounterIndex);
  }

  deleteArticle(): void{
    this.encounterService.delete(this.encounter.pk).pipe(first()).subscribe(
      response => this.encounterDelete.emit(this.encounter),
      error => this.warning.showWarning(error)
    );
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
    this.encounterConnectionService.createEncounterConnection(this.baseEncounterConnection).pipe(first()).subscribe(
      (encounterConnection: EncounterConnectionObject) => {
        encounter.encounterConnections.push(encounterConnection);
        this.resetBaseEncounterConnection();
        this.inEncounterConnectionCreationState = false;
      },
      error => this.warning.showWarning(error)
    );
  }

  deleteEncounterConnection(encounter: Encounter, connection: EncounterConnection){
    this.encounterConnectionService.deleteEncounterConnection(connection.pk).pipe(first()).subscribe(
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
