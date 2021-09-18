import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants, OverviewType } from 'src/app/app.constants';
import { Character } from 'src/app/models/character';
import { EncounterObject, Encounter } from "src/app/models/encounter";
import { EncounterConnectionObject, EncounterConnection } from 'src/app/models/encounterconnection';
import { OverviewItem, OverviewItemObject } from 'src/app/models/overviewItem';
import { EncounterConnectionService } from 'src/app/services/encounter-connection.service';
import { EncounterServiceService } from "src/app/services/encounter/encounter-service.service";
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { OverviewService } from 'src/app/services/overview.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';


//TODO: ADD Pagination to the encounter. not as in server loading, but as in only showing X entries at a time.
@Component({
  selector: 'app-encounter-accordion',
  templateUrl: './encounter-accordion.component.html',
  styleUrls: ['./encounter-accordion.component.scss']
})
export class EncounterAccordionComponent extends PermissionUtilityFunctionMixin implements OnInit {
  //URLs
  encounterConnectionUrls: string[][];

  constants: any = Constants;
  @Input() encounters: EncounterObject[];
  @Input() articleCharacter: Character;
  campaign: string = this.route.snapshot.params.campaign;

  formState: string = Constants.displayState;
  characters : OverviewItem[];
  isOpen: object;

  inEncounterConnectionCreationState: boolean = false;
  baseEncounterConnection: EncounterConnectionObject = new EncounterConnectionObject();
  //TODO: Create access-permissions for every individual campaign. The campaign name here is used to identify the required rights. If the user has the necessary rights, they can be author. This is a change needed on the formly service and the backend
  userModel: EncounterObject;
  serverModel: Encounter;
  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "title"}),
    this.formlyService.genericSelect({key: "author", labelProp: "name", overviewType: OverviewType.User, campaign: this.campaign}),
    this.formlyService.genericSelect({key: "session_number", label: "Session", overviewType: OverviewType.Session, campaign: this.campaign}),
    this.formlyService.genericSelect({key: "location", label: "Encounter Location", sortProp: "name_full", overviewType: OverviewType.Location, campaign: this.campaign}),
    this.formlyService.genericTextField({key: "description", required: true}),
  ];

  constructor(
    private overviewService: OverviewService,
    private encounterService: EncounterServiceService,
    private encounterConnectionService: EncounterConnectionService,
    private formlyService: MyFormlyService,
    private warnings: WarningsService,  
    public routingService: RoutingService,
    route: ActivatedRoute,
    tokenService: TokenService,
  ) { 
    super(tokenService, route);
  }

  ngOnInit(): void {
    this.isOpen = {};

    this.encounterConnectionUrls = [];
    this.encounters.forEach((encounter, index) => {
      const accordionPanelId = `static-${index}`;
      this.isOpen[accordionPanelId] = false;

      const connections: EncounterConnection[] = encounter.encounterConnections;
      const connectionUrls: string[] = connections.map(connection => this.routingService.getRoutePath('character', {name: connection.character_details.name, campaign: this.campaign}))
      this.encounterConnectionUrls.push(connectionUrls);
    });
    
  }

  isInCreateState(): boolean{
    return this.formState === Constants.createState;
  }

  isInUpdateState(): boolean{
      return this.formState === Constants.updateState;
  }

  isInOutdatedUpdateState(): boolean{
      return this.formState === Constants.outdatedUpdateState;
  }

  isInDeleteState(): boolean{
      return this.formState === Constants.deleteState;
  }

  isInDisplayState(): boolean{
    return this.formState === Constants.displayState;
  }

  //### Handling Encounters ###
  onEncounterUpdate(updateText: string, encounterIndex: number){
    const encounter: Encounter = this.encounters[encounterIndex];
    encounter.description = updateText;
    this.encounterService.update(encounter.pk, encounter).pipe(first()).subscribe(
      (encounter: EncounterObject) => this.encounters[encounterIndex] = encounter,
      error => this.warnings.showWarning(error)
    );
  }

  fullEditEncounter(encounter: EncounterObject){
    this.userModel = JSON.parse(JSON.stringify(encounter));
    this.formState = Constants.updateState;
  }

  updateEncounter(model: Encounter, encounterIndex: number){
    this.encounterService.update(model.pk, model).pipe(first()).subscribe(
      (updatedEncounter: EncounterObject) => {
        this.encounters[encounterIndex] = updatedEncounter;
        this.formState = Constants.displayState;
      },
      error => this.onEncounterUpdateError(error)
    );
  }


   onEncounterUpdateError(errorResponse: any){
    const isOutdatedUpdateError = errorResponse?.status === 409;
    if(isOutdatedUpdateError){ 
        const serverEncounter: Encounter = errorResponse.error;
        this.serverModel = serverEncounter;

        this.formState = Constants.outdatedUpdateState;
    } else {
      this.warnings.showWarning(errorResponse);
    }
  }

  deleteEncounter(encounter: Encounter, encounterIndex: number){
    this.encounterService.delete(encounter.pk).pipe(first()).subscribe(
      response => {
        this.encounters.splice(encounterIndex, 1);
      },
      error => this.warnings.showWarning(error)
    );
  }

  resetEncounterForm(){
    this.userModel = new EncounterObject();
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
      this.overviewService.getCampaignOverviewItems(this.campaign, OverviewType.Character).pipe(first()).subscribe(
        (characters: OverviewItemObject[]) => this.characters = characters,
        error => this.warnings.showWarning(error)
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
      error => this.warnings.showWarning(error)
    );
  }

  deleteEncounterConnection(encounter: Encounter, connection: EncounterConnection){
    this.encounterConnectionService.delete(connection.pk).pipe(first()).subscribe(
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

