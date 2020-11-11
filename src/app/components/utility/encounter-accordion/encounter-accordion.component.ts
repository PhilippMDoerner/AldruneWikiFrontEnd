import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { Character } from 'src/app/models/character';
import { EmptyFormEncounter, Encounter } from "src/app/models/encounter";
import { EncounterConnection } from 'src/app/models/encounterconnection';
import { OverviewItem } from 'src/app/models/overviewItem';
import { EncounterConnectionService } from 'src/app/services/encounter-connection.service';
import { EncounterServiceService } from "src/app/services/encounter/encounter-service.service";
import { OverviewService } from 'src/app/services/overview.service';

@Component({
  selector: 'app-encounter-accordion',
  templateUrl: './encounter-accordion.component.html',
  styleUrls: ['./encounter-accordion.component.scss']
})
export class EncounterAccordionComponent implements OnInit {
  @Input() encounters: Encounter[];
  @Input() articleCharacter: Character;
  characters : OverviewItem[];
  isOpen: object;

  inEncounterConnectionCreationState: boolean = false;
  baseEncounterConnection: EncounterConnection = {"character": null, "encounter": null};

  isEncounterDeleteState: boolean = false;
  isEncounterCreateState: boolean = false;
  isEncounterUpdateState: boolean = false;

  character_subscription: Subscription;
  connection_subscription: Subscription;

  form = new FormGroup({});
  model: Encounter | EmptyFormEncounter;
  fields: FormlyFieldConfig[] = [
    {
      key: "session_number",
      type: "select",
      templateOptions:{
        label: "Session",
        labelProp: "name_full",
        valueProp: "pk",
        options: this.overviewService.getOverviewItems('session'),
      }
    },
    {
      key: "location",
      type: "select",
      templateOptions:{
        label: "Encounter Location",
        labelProp: "name",
        valueProp: "pk",
        options: this.overviewService.getOverviewItems('location'),
      }
    },
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isOpen = {};

    this.encounters.forEach((encounter, index) => {
      const accordionPanelId = `static-${index}`;
      this.isOpen[accordionPanelId] = false;
    });
  }

  //TODO: Swap to pipe and ensure all subscriptions are only used once
  //### Handling Encounters ###
  onEncounterUpdate(updateText: string, encounterIndex: number){
    const encounter: Encounter = this.encounters[encounterIndex];
    encounter.description = updateText;
    this.encounterService.updateEncounter(encounter).subscribe(encounter => {
      this.encounters[encounterIndex] = encounter;
    }, error => console.log(error));
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
    this.encounterService.updateEncounter(model).subscribe(updatedEncounter => {
      this.encounters[encounterIndex] = updatedEncounter;
      this.isEncounterUpdateState = false;
    });
  }

  toggleEncounterDeleteState(){
    this.isEncounterDeleteState = !this.isEncounterDeleteState;
  }

  deleteEncounter(encounter: Encounter, encounterIndex: number){
    this.encounterService.deleteEncounter(encounter.pk).subscribe(response => {
      this.encounters.splice(encounterIndex, 1);
      this.toggleEncounterDeleteState();
    }, error => console.log(error));
  }

  toggleEncounterCreateState(){
    this.isEncounterCreateState = !this.isEncounterCreateState;
    if (!this.model){
      this.model = new EmptyFormEncounter();
    }
  }

  resetEncounterForm(){
    this.model = new EmptyFormEncounter();
  }

  createEncounter(model: Encounter){
    this.encounterService.createEncounter(model).subscribe(encounter => {
      this.toggleEncounterCreateState();
      this.encounters.unshift(encounter);
      this.connectCharacterToEncounter(encounter);
    }, error => console.log(error));
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
      this.character_subscription = this.overviewService.getOverviewItems('character').subscribe(characters => {
        this.characters = characters;
      });
    }
  }

  createEncounterConnection(encounter: Encounter){
    this.baseEncounterConnection.encounter = encounter.pk;
    this.encounterConnectionService.createEncounterConnection(this.baseEncounterConnection).subscribe(encounterConnection => {
      encounter.encounterConnections.push(encounterConnection);
      this.resetBaseEncounterConnection();
      this.inEncounterConnectionCreationState = false;
    });
  }

  deleteEncounterConnection(encounter: Encounter, connection: EncounterConnection){
    this.connection_subscription = this.encounterConnectionService.deleteEncounterConnection(connection.pk).subscribe(response => {
      const connectionIndex: number = encounter.encounterConnections.indexOf(connection);
      if (connectionIndex > -1){
        encounter.encounterConnections.splice(connectionIndex, 1);
      }
    });
  }

  resetBaseEncounterConnection(){
    this.baseEncounterConnection = {"character": null, "encounter": null};
  }

  ngOnDestroy(){
    if(this.character_subscription) this.character_subscription.unsubscribe();
    if(this.connection_subscription) this.connection_subscription.unsubscribe();
  }
}
