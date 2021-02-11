import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { DiaryEntryEncounterConnectionObject, diaryEntryEncounterConnection } from 'src/app/models/diaryencounterconnection';
import { DiaryEntry, diaryEntryEncounter, DiaryEntryObject } from 'src/app/models/diaryentry';
import { Encounter, EncounterObject } from 'src/app/models/encounter';
import { SessionObject } from 'src/app/models/session';
import { DiaryentryEncounterConnectionService } from 'src/app/services/diaryentry-encounter-connection.service';
import { EncounterServiceService } from 'src/app/services/encounter/encounter-service.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-diary-entry-encounter-list',
  templateUrl: './diary-entry-encounter-list.component.html',
  styleUrls: ['./diary-entry-encounter-list.component.scss']
})
export class DiaryEntryEncounterListComponent implements OnInit{

  @Input() diaryEntry: DiaryEntryObject;
  encounters: EncounterObject[] = [];
  isWaitingForResponse: boolean = false;

  constructor(
    private formlyService: MyFormlyService,
    private warning: WarningsService,
    private encounterService: EncounterServiceService,
    private routingService: RoutingService,
    private tokenService: TokenService,
    private diaryEntryEncounterConnectionService: DiaryentryEncounterConnectionService
  ) { }

  ngOnInit(){
    

    for(const diaryEncounter of this.diaryEntry.encounters){
      const encounter: EncounterObject = new EncounterObject (diaryEncounter);
      this.encounters.push(encounter);
    }

    this.sortEncounters();
  }


  toggleEncounterCreateState(encounterIndex: number): void{
    const isNewFirstEncounter = encounterIndex < 0;

    let newOrderIndex: number;
    if (isNewFirstEncounter){
      const firstEncounterConnection: DiaryEntryEncounterConnectionObject = this.encounters[0].connection;
      newOrderIndex = (firstEncounterConnection == null) ? 0 : firstEncounterConnection.priorOrderIndex();
    } else {
      
      //Create Connection Object for new Encounter
      const priorEncounterConnection: DiaryEntryEncounterConnectionObject = this.encounters[encounterIndex].connection;
      newOrderIndex = (priorEncounterConnection == null) ? 0 : priorEncounterConnection.getShiftedOrderIndex();
    }
    const newConnection: DiaryEntryEncounterConnectionObject = new DiaryEntryEncounterConnectionObject({
      diaryentry: this.diaryEntry.pk,
      encounter: null,
      order_index: newOrderIndex,
    });

    //Create Encounter
    const newEncounter: Encounter = {
      description: null, 
      session_number: this.diaryEntry.session,
      location: null,
      author: this.tokenService.getCurrentUserPk(),
      title: null,
      getAbsoluteRouterUrl: null,
      connection: newConnection
    };
    //Insert encounter
    const entriesToDelete: number = 0;
    const insertionIndex: number = (isNewFirstEncounter) ? 0 : encounterIndex + 1;
    this.encounters.splice(insertionIndex, entriesToDelete, new EncounterObject(newEncounter));
  }

  /**
   * Is triggered when a new encounter shall be created. Before this can be done, all other encounters that
   * come after this one need their connection's order_index shifted upwards. This is done recursively, one connection
   * after the other.
   * @param createdEncounterIndex : The index in this.encounters of the new created Encounter
   */
  onEncounterCreate(createdEncounterIndex: number): void{
    const lastEncounterIndex = this.encounters.length - 1;
    this.isWaitingForResponse = true;

    const pendingEncounter = this.encounters[createdEncounterIndex];
    this.encounterService.createEncounter(pendingEncounter).pipe(first()).subscribe(
      (encounter: EncounterObject) => {
        encounter.connection = pendingEncounter.connection;
        encounter.connection.encounter = encounter.pk; //Needed to create the connection
        this.encounters[createdEncounterIndex] = encounter;
        this.updateConnectionsCreateEncounter(createdEncounterIndex, lastEncounterIndex);
      },
      error => this.warning.showWarning(error)
    );

    //this.recursiveIndexUpdate(createdEncounterIndex, lastEncounterIndex);
  }

  updateConnectionsCreateEncounter(encounterIndexLimit: number, currentEncounterIndex: number): void{
    //Error Case 
    if(currentEncounterIndex < encounterIndexLimit){
      throw `Index error! Only encounters up to ${encounterIndexLimit} should be updated, but this function 
      attempted an update for ${currentEncounterIndex} !`;
    }

    const hasUnupdatedConnections: boolean = currentEncounterIndex > encounterIndexLimit

    // Base Case: Create connection for new Encounter
    if(!hasUnupdatedConnections){
      const newEncounter: EncounterObject = this.encounters[encounterIndexLimit];
      const newConnection: DiaryEntryEncounterConnectionObject = newEncounter.connection;
      newConnection.order_index = newConnection.nextOrderIndex();

      this.diaryEntryEncounterConnectionService.createConnection(newConnection).pipe(first()).subscribe(
        (newCreatedConnection: DiaryEntryEncounterConnectionObject) => {
          newEncounter.connection = newCreatedConnection;
          this.isWaitingForResponse = false;
        },
        error => this.warning.showWarning(error)
      );

      
    } else {  //Recursive Step: Update all connections with that are placed after the newly created Encounter
    
      const connection: DiaryEntryEncounterConnectionObject = this.encounters[currentEncounterIndex].connection;
      connection.order_index = connection.nextOrderIndex();

      this.diaryEntryEncounterConnectionService.updateConnection(connection).pipe(first()).subscribe(
        (newConnection: DiaryEntryEncounterConnectionObject) => {
          const nextEncounterIndex = currentEncounterIndex - 1;
          this.updateConnectionsCreateEncounter(encounterIndexLimit, nextEncounterIndex);
        },
        error => console.log(error) //TODO: Replace this with warnings call
      );

    }

  }

  sortEncounters(){
    this.encounters.sort((encounter1: Encounter, encounter2: Encounter) => {
      const order_index1: number = encounter1.connection.order_index;
      const order_index2: number = encounter2.connection.order_index;

      if(order_index1 == null && order_index2 == null){
        return 0
      }else if (order_index1 == null){
        return 1;
      } else if (order_index2 == null){
        return -1;
      } else {
        return order_index1 - order_index2;
      }
    })
  }

  onEncounterOrderIncrease(encounterIndex: number): void{
    console.log("increase triggered");
    const isLastEncounter = encounterIndex === this.encounters.length - 1;
    if(isLastEncounter) return; //encounter is already last

    const nextEncounterIndex = encounterIndex + 1;

    this.swapEncounters(encounterIndex, nextEncounterIndex);
  }

  onEncounterOrderDecrease(encounterIndex: number): void{
    console.log("Decrease Triggered");
    const isFirstEncounter = encounterIndex === 0;
    if(isFirstEncounter) return; //encounter is already first

    const priorEncounterIndex = encounterIndex - 1;

    this.swapEncounters(encounterIndex, priorEncounterIndex);
  }

  swapEncounters(encounterIndex1: number, encounterIndex2: number): void{
    const encounterConnection1: DiaryEntryEncounterConnectionObject = this.encounters[encounterIndex1].connection;
    const encounterConnection2: DiaryEntryEncounterConnectionObject = this.encounters[encounterIndex2].connection;

    const temp = encounterConnection1.order_index;
    encounterConnection1.order_index = encounterConnection2.order_index;
    encounterConnection2.order_index = temp;

    this.updateSwappedEncountersToDb(encounterConnection1, encounterConnection2);
  }

  updateSwappedEncountersToDb(connection1: DiaryEntryEncounterConnectionObject, connection2: DiaryEntryEncounterConnectionObject): void{
    //Ensure you don't trigger unique-together db-constraint by shifting/unshifting the encounter's order_index
    connection1.swapOrderIndexState();
    connection2.swapOrderIndexState();

    this.isWaitingForResponse = true;
    this.diaryEntryEncounterConnectionService.updateConnection(connection1).pipe(first()).subscribe(
      (updatedConnection1: DiaryEntryEncounterConnectionObject) => {

        this.diaryEntryEncounterConnectionService.updateConnection(connection2).pipe(first()).subscribe(
          (updatedConnection2: DiaryEntryEncounterConnectionObject) => {
            this.sortEncounters();
            this.isWaitingForResponse = false;
          },
          error => this.warning.showWarning(error)
        );

      },
      error => this.warning.showWarning(error)
    );

  }


  //Only use on a sorted encounters array where last connection means highest orderIndex
  getNewHighestOrderIndex(): number{
    const lastEncounterIndex: number = this.encounters.length - 1;
    const lastEncounterWithHighestOrderIndex: EncounterObject = this.encounters[lastEncounterIndex];
    const lastConnection: DiaryEntryEncounterConnectionObject = lastEncounterWithHighestOrderIndex.connection;

    return lastConnection.nextOrderIndex();
  }

  deleteEncounter(encounterIndex: number): void{
    const numberOfEncountersToDelete = 1;
    this.encounters.splice(encounterIndex, numberOfEncountersToDelete);

    if(this.hasNoEncounters()){
      this.routingService.routeToPath('diaryentry-overview');
    }
  }

  hasNoEncounters(): boolean{
    return this.encounters.length === 0;
  }
}
