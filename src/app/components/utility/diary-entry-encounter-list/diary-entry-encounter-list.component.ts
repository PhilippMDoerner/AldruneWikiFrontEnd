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
  encounters: Encounter[] = [];
  isEncounterUpdating: boolean[] = [];
  isWaitingForResponse: boolean = false;
  diaryEntryView: boolean = true;

  constructor(
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
      this.isEncounterUpdating.push(false);
    }
    console.log(this.isEncounterUpdating);

    this.sortEncounters();
  }

  toggleDiaryEntryView(){
    this.diaryEntryView = !this.diaryEntryView;
  }


  toggleEncounterCreateState(encounterIndex: number): void{
    const isNewFirstEncounter: boolean = encounterIndex < 0;
    const isEmptyDiaryEntry: boolean = this.encounters.length === 0;
    
    let newOrderIndex: number;
    if (isEmptyDiaryEntry){
      newOrderIndex = 0;

    } else if (!isEmptyDiaryEntry && isNewFirstEncounter){
      const firstEncounterConnection: DiaryEntryEncounterConnectionObject = this.encounters[0].connection;
      newOrderIndex = firstEncounterConnection.priorOrderIndex();

    } else {
      const priorEncounterConnection: DiaryEntryEncounterConnectionObject = this.encounters[encounterIndex].connection;
      newOrderIndex = priorEncounterConnection.getShiftedOrderIndex();
    }

    //Create Connection Object for new Encounter
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
   * Is triggered when a new encounter shall be created. Together with an encounter, you must create an
   * encounterConnection to this diaryentry.
   * @param createdEncounterIndex : The index in this.encounters of the new created Encounter
   */
  async onEncounterCreate(createdEncounterIndex: number): Promise<void>{
    this.isWaitingForResponse = true;

    const pendingEncounter = this.encounters[createdEncounterIndex];
    let newEncounter: Encounter;
    try{
      newEncounter = await this.encounterService.createEncounter(pendingEncounter).toPromise();
    } catch (error){
      this.warning.showWarning(error);
      return;
    }

    newEncounter.connection = pendingEncounter.connection;
    newEncounter.connection.encounter = newEncounter.pk; //Needed to create the connection
    this.encounters[createdEncounterIndex] = newEncounter;
    this.updateConnectionsCreateEncounter(createdEncounterIndex);
  }

  /**
   * Creates encounterConnection for newly created Encounter. Updates all encounters following after the newly created one
   * first though, to avoid assigning the same order_index to 2 different encounterConnections.
   * @param encounterIndexLimit 
   */
  async updateConnectionsCreateEncounter(encounterIndexLimit: number): Promise<void>{

    //Increment all order-indices of encounters after the encounter at encounterIndexLimit
    const maxIndex: number = this.encounters.length - 1;
    for (let encounterIndex = maxIndex; encounterIndex > encounterIndexLimit; encounterIndex--){
      const connection: DiaryEntryEncounterConnectionObject = this.encounters[encounterIndex].connection;
      connection.order_index = connection.nextOrderIndex();

      try{
        await this.diaryEntryEncounterConnectionService.updateConnection(connection).toPromise();
      } catch(error){
        this.warning.showWarning(error);
        return;
      }
    }

    //Create the encounterConnection for the new encounter in the Db
    const newEncounter: Encounter = this.encounters[encounterIndexLimit];
    const newConnection: DiaryEntryEncounterConnectionObject = newEncounter.connection;
    newConnection.order_index = newConnection.nextOrderIndex();

    this.diaryEntryEncounterConnectionService.createConnection(newConnection).pipe(first()).subscribe(
      (newCreatedConnection: DiaryEntryEncounterConnectionObject) => newEncounter.connection = newCreatedConnection,
      error => this.warning.showWarning(error)
    );

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
    const isLastEncounter = encounterIndex === this.encounters.length - 1;
    if(isLastEncounter) return; //encounter is already last

    const nextEncounterIndex = encounterIndex + 1;

    this.swapEncounters(encounterIndex, nextEncounterIndex);
  }

  onEncounterOrderDecrease(encounterIndex: number): void{
    const isFirstEncounter = encounterIndex === 0;
    if(isFirstEncounter) return; //encounter is already first

    const priorEncounterIndex = encounterIndex - 1;

    this.swapEncounters(encounterIndex, priorEncounterIndex);
  }

  async swapEncounters(encounterIndex1: number, encounterIndex2: number): Promise<void>{
    // Hide Encounters during Update
    this.isEncounterUpdating[encounterIndex1] = true;
    this.isEncounterUpdating[encounterIndex2] = true;

    // Swap order indices of both encounter's connections
    const encounterConnection1: DiaryEntryEncounterConnectionObject = this.encounters[encounterIndex1].connection;
    const encounterConnection2: DiaryEntryEncounterConnectionObject = this.encounters[encounterIndex2].connection;

    const temp = encounterConnection1.order_index;
    encounterConnection1.order_index = encounterConnection2.order_index;
    encounterConnection2.order_index = temp;

    try{
      await this.updateSwappedEncountersToDb(encounterConnection1, encounterConnection2);
    } catch(error){
      this.warning.showWarning(error);
    }

    // Display Encounters again
    this.isEncounterUpdating[encounterIndex1] = false;
    this.isEncounterUpdating[encounterIndex2] = false;

    this.sortEncounters();
  }

  async updateSwappedEncountersToDb(connection1: DiaryEntryEncounterConnectionObject, connection2: DiaryEntryEncounterConnectionObject): Promise<any>{
    //Ensure you don't trigger unique-together db-constraint by shifting/unshifting the encounter's order_index
    connection1.swapOrderIndexState();
    connection2.swapOrderIndexState();

    const updatedConnection1Promise = this.diaryEntryEncounterConnectionService.updateConnection(connection1).toPromise();
    const updatedConnection2Promise = this.diaryEntryEncounterConnectionService.updateConnection(connection2).toPromise();

    return Promise.all([updatedConnection1Promise, updatedConnection2Promise]);  
  }


  //Only use on a sorted encounters array where last connection means highest orderIndex
  getNewHighestOrderIndex(): number{
    const lastEncounterIndex: number = this.encounters.length - 1;
    const lastEncounterWithHighestOrderIndex: Encounter = this.encounters[lastEncounterIndex];
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
