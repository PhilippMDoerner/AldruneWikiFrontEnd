import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Character } from 'src/app/models/character';
import { EncounterObject, Encounter } from "src/app/models/encounter";
import { EncounterConnectionObject, EncounterConnection } from 'src/app/models/encounterconnection';
import { OverviewItem, OverviewItemObject } from 'src/app/models/overviewItem';
import { EncounterConnectionService } from 'src/app/services/encounter-connection.service';
import { EncounterServiceService } from "src/app/services/encounter/encounter-service.service";
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { OverviewService } from 'src/app/services/overview.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-encounter-accordion',
  templateUrl: './encounter-accordion.component.html',
  styleUrls: ['./encounter-accordion.component.scss']
})
export class EncounterAccordionComponent extends PermissionUtilityFunctionMixin implements OnInit {
  constants: any = Constants;
  @Input() encounters: Encounter[];
  @Input() articleCharacter: Character;
  characters : OverviewItem[];
  isOpen: object;

  inEncounterConnectionCreationState: boolean = false;
  baseEncounterConnection: EncounterConnectionObject = new EncounterConnectionObject();

  isEncounterDeleteState: boolean = false;
  isEncounterCreateState: boolean = false;
  isEncounterUpdateState: boolean = false;

  form = new FormGroup({});
  model: EncounterObject;
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericSelect({key: "session_number", label: "Session", optionsType: "session"}),
    this.formlyService.genericSelect({key: "location", label: "Encounter Location", optionsType: "location"}),
    {
      key: "description",
      type: "tinymce",
      templateOptions:{
        label: "Description",
      }
    }
  ];

  constructor(
    private overviewService: OverviewService,
    private encounterService: EncounterServiceService,
    private encounterConnectionService: EncounterConnectionService,
    private formlyService: MyFormlyService,
    private warnings: WarningsService,  
    public routingService: RoutingService,
  ) { super(); }

  ngOnInit(): void {
    this.isOpen = {};

    this.encounters.forEach((encounter, index) => {
      const accordionPanelId = `static-${index}`;
      this.isOpen[accordionPanelId] = false;
    });
  }

  //### Handling Encounters ###
  onEncounterUpdate(updateText: string, encounterIndex: number){
    const encounter: Encounter = this.encounters[encounterIndex];
    encounter.description = updateText;
    this.encounterService.updateEncounter(encounter).pipe(first()).subscribe(
      (encounter: EncounterObject) => this.encounters[encounterIndex] = encounter,
      error => this.warnings.showWarning(error)
    );
  }

  toggleEncounterUpdateState(){
    this.isEncounterUpdateState = !this.isEncounterUpdateState;
  }

  fullEditEncounter(encounter: Encounter){
    this.model = encounter;
    this.isEncounterUpdateState = true;
    this.isEncounterCreateState = false;
  }

  updateEncounter(model: Encounter, encounterIndex: number){
    this.encounterService.updateEncounter(model).pipe(first()).subscribe(
      (updatedEncounter: EncounterObject) => {
        this.encounters[encounterIndex] = updatedEncounter;
        this.isEncounterUpdateState = false;
      },
      error => this.warnings.showWarning(error)
    );
  }

  toggleEncounterDeleteState(){
    this.isEncounterDeleteState = !this.isEncounterDeleteState;
  }

  deleteEncounter(encounter: Encounter, encounterIndex: number){
    this.encounterService.deleteEncounter(encounter.pk).pipe(first()).subscribe(
      response => {
        this.encounters.splice(encounterIndex, 1);
        this.toggleEncounterDeleteState();
      },
      error => this.warnings.showWarning(error)
    );
  }

  toggleEncounterCreateState(){
    this.isEncounterCreateState = !this.isEncounterCreateState;
    
    if (this.isEncounterCreateState){
      this.model = new EncounterObject();
    }
  }

  resetEncounterForm(){
    this.model = new EncounterObject();
  }

  createEncounter(model: Encounter){
    this.encounterService.createEncounter(model).pipe(first()).subscribe(
      (encounter: EncounterObject) => {
        this.toggleEncounterCreateState();
        this.encounters.unshift(encounter);
        this.connectCharacterToEncounter(encounter);
      }, 
      error => this.warnings.showWarning(error)
    );
  }

  connectCharacterToEncounter(encounter: Encounter){
    this.resetBaseEncounterConnection()
    this.baseEncounterConnection.encounter = encounter.pk;
    this.baseEncounterConnection.character = this.articleCharacter.pk;
    this.createEncounterConnection(encounter);
  }

  //### Handling Accordion ###
  onPanelChange({panelId}){
    for (const key in this.isOpen) {
      const isClickedPanel: boolean = (key === panelId);
      this.isOpen[key] = isClickedPanel ? !this.isOpen[key]: false;
    }
  }

  panelIsOpen(index: number){
    return this.isOpen[`static-${index}`];
  }

  //### Handling EncounterConnections ###
  toggleEncounterConnectionCreationState(){
    this.inEncounterConnectionCreationState = !this.inEncounterConnectionCreationState;
    if (!this.characters){
      this.overviewService.getOverviewItems('character').pipe(first()).subscribe(
        (characters: OverviewItemObject[]) => this.characters = characters,
        error => this.warnings.showWarning(error)
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
      error => this.warnings.showWarning(error)
    );
  }

  deleteEncounterConnection(encounter: Encounter, connection: EncounterConnection){
    this.encounterConnectionService.deleteEncounterConnection(connection.pk).pipe(first()).subscribe(
      response => {
        const connectionIndex: number = encounter.encounterConnections.indexOf(connection);
        if (connectionIndex > -1){
          encounter.encounterConnections.splice(connectionIndex, 1);
        }
      },
      error => this.warnings.showWarning(error)
    );
  }

  resetBaseEncounterConnection(){
    this.baseEncounterConnection = new EncounterConnectionObject();
  }
}

