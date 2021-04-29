import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { diaryEntryEncounterConnection, DiaryEntryEncounterConnectionObject } from 'src/app/models/diaryencounterconnection';
import { DiaryEntryObject } from 'src/app/models/diaryentry';
import { Encounter, EncounterObject } from 'src/app/models/encounter';
import { DiaryentryEncounterConnectionService } from 'src/app/services/diaryentry-encounter-connection.service';
import { EncounterServiceService } from 'src/app/services/encounter/encounter-service.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';
import { tryCatch } from 'src/app/utils/functions/utilityDecorators'

@Component({
  selector: 'app-diary-entry-encounter-list',
  templateUrl: './diary-entry-encounter-list.component.html',
  styleUrls: ['./diary-entry-encounter-list.component.scss']
})
export class DiaryEntryEncounterListComponent extends PermissionUtilityFunctionMixin implements OnInit{

  @Input() diaryEntry: DiaryEntryObject;
  encounters: Encounter[] = [];
  isEncounterUpdating: boolean[] = [];
  isUpdating: boolean = false;
  diaryEntryView: boolean = true;

  cutEncounterIndex: number;

  constructor(
    private warning: WarningsService,
    private encounterService: EncounterServiceService,
    private routingService: RoutingService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private diaryEntryEncounterConnectionService: DiaryentryEncounterConnectionService
  ) { super() }

  ngOnInit(){
    const hasDisplayModeParam = !(this.route.snapshot.params['displayMode'] == null);
    this.diaryEntryView = (hasDisplayModeParam) ? this.route.snapshot.params['displayMode'] === "diaryEntry" : true;

    for(const diaryEncounter of this.diaryEntry.encounters){
      const encounter: EncounterObject = new EncounterObject (diaryEncounter);
      this.encounters.push(encounter);
      this.isEncounterUpdating.push(false);
    }

    this.sortEncounters();
  }

  toggleDiaryEntryView(){
    this.diaryEntryView = !this.diaryEntryView;
  }

  /**
   * @description This function is in a complex relationship with "this.onEncounterCreate" and from
   * the child component "diary-entry-encounter" the function "OnCreationSuccess". 
   * They are triggered in that order: toggleEncounterCreate --> OnCreationSuccess --> onEncounterCreate
   * 1) A diary-entry-encounter needs first an initial own dataset, which is stored HERE as well as in the child-component.
   * Secondly it needs a connection to this encounter, which requires an order-index that tells you where to put the encounter.
   * The order-index must be given from the start, so you create the first half of that in here and put that into the
   * dummy dataset.
   * 2) When the form is submitted in the child-component, that triggers its OnCreationSuccess. The parents OnCreationSuccess will
   * REPLACE the current data with the new dataset that was received. That would lose you the connection created in 1) though!
   * So you move that over to the new dataset and emit that, so taht onEncounterCreate has access to it
   * 3) In OnEncounterCreate you now need to replace the old dataset with the new one. On top of that, you need to create
   * the half-finished connection, which is possible now since what was missing was a primary key of the encounter 
   * (Since that didn't exist before). So you finish the connection and put the finished connection into the created Encounter.
   * @param {number} encounterIndex Index at which the new encounter shall be created
   */
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

    //Create Connection Object for new Encounter, must be created here so that it has the accurate order index
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
      title: "New Encounter",
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
   
  @tryCatch
  async onEncounterCreate(createdEncounter: EncounterObject, createdEncounterIndex: number): Promise<void>{
    //Replace the newly createdEncounter with the Dataset currently being a placeholder for it at the given index
    const placeholderEncounter = this.encounters[createdEncounterIndex];
    this.encounters[createdEncounterIndex] = createdEncounter;

    //Increment Encounters up to last-encounter to order-index of next encounter
    this.encounters[createdEncounterIndex] = createdEncounter;
    const lastIndex = this.encounters.length - 1;
    const firstEncounterAfterCreatedEncounter = createdEncounterIndex + 1;
    await this.incrementOrderIndices(firstEncounterAfterCreatedEncounter, lastIndex);

    //Create the encounterConnection for the new encounter in the Db
    const newConnection: DiaryEntryEncounterConnectionObject = placeholderEncounter.connection;
    newConnection.order_index = newConnection.nextOrderIndex();
    newConnection.encounter = createdEncounter.pk;  //Needed to create the connection

    this.diaryEntryEncounterConnectionService.create(newConnection).pipe(first()).subscribe(
      (newCreatedConnection: DiaryEntryEncounterConnectionObject) => createdEncounter.connection = newCreatedConnection,
      error => this.warning.showWarning(error)
    );

  }

  /**
   * Updates each encounter within the range to the orderIndex of its following encounter.
   * @param rangeStartIndex - An index on the encounters array
   * @param rangeEndIndex - An index on the encounters array after rangeStartIndex. Must be smaller than the last
   * index of encounters, as you can not increment the last encounter to a higher order-index, since there is no 
   * encounter after it.
   */
  async incrementOrderIndices(rangeStartIndex: number, rangeEndIndex: number): Promise<diaryEntryEncounterConnection[]>{
    //Guard Clauses
    if(rangeEndIndex >= this.encounters.length) throw `IndexOutOfBoundsException. You can not increment 
    encounters at index ${rangeEndIndex}! You only have ${this.encounters.length} encounter(s)!`;
    if(rangeStartIndex < 0) throw `IndexOutOfBoundsExceptions. You can not increment encounters at index 
    ${rangeStartIndex}, Indices must be positive!`;
    if(rangeStartIndex > rangeEndIndex) return;

    const hasLastIndex: boolean = rangeEndIndex === this.encounters.length - 1;
    const adjustedEndIndex: number = (hasLastIndex) ? rangeEndIndex - 1 : rangeEndIndex;

    const connectionUpdatePromises: Promise<diaryEntryEncounterConnection>[] = [];
    for(let i=rangeStartIndex; i <= adjustedEndIndex; i++){
      const encounter: Encounter = this.encounters[i];
      const nextEncounter: Encounter = this.encounters[i+1];

      encounter.connection.order_index = nextEncounter.connection.order_index;
      encounter.connection.swapOrderIndexState();

      const pk: number = encounter.connection.pk;
      const updatePromise = this.diaryEntryEncounterConnectionService.update(pk, encounter.connection).toPromise();
      connectionUpdatePromises.push(updatePromise);
    }

    //Handle incrementing last encounter if necessary
    if(hasLastIndex){
      const lastEncounterIndex: number = this.encounters.length - 1;
      const lastEncounter: Encounter = this.encounters[lastEncounterIndex];
      lastEncounter.connection.order_index = lastEncounter.connection.nextOrderIndex();

      const pk: number = lastEncounter.connection.pk;
      const updatePromise =  this.diaryEntryEncounterConnectionService.update(pk, lastEncounter.connection).toPromise();
      connectionUpdatePromises.push(updatePromise);  
    }

    return Promise.all(connectionUpdatePromises);
  }

  /**
   * Updates each encounter within the range to the orderIndex of its prior encounter.
   * @param rangeStartIndex - An index on the encounters array. Must be larger than 0, as you can not
   * decrement the first encounter to a smaller order-index, since there is no encounter prior to it.
   * @param rangeEndIndex - An index on the encounters array after rangeStartIndex.
   */
  async decrementOrderIndices(rangeStartIndex: number, rangeEndIndex: number): Promise<diaryEntryEncounterConnection[]>{
    //Guard Clauses
    if(rangeStartIndex < 0) throw `IndexOutOfBoundsExceptions. You can not increment encounters at index 
    ${rangeStartIndex}, Indices must be positive!`;
    if(rangeEndIndex >= this.encounters.length) throw `IndexOutOfBoundsExceptions. You can not decrement encounter at index
    ${rangeEndIndex}, you only have ${this.encounters.length} encounter(s)!`;
    if(rangeStartIndex > rangeEndIndex) return;

    const hasFirstIndex: boolean = rangeStartIndex === 0;
    const adjustedStartIndex: number = (hasFirstIndex) ? 1 : rangeStartIndex;

    const connectionUpdatePromises: Promise<diaryEntryEncounterConnection>[] = [];
    for(let i=rangeEndIndex; i >= adjustedStartIndex; i--){
      const encounter: Encounter = this.encounters[i];
      const priorEncounter: Encounter = this.encounters[i-1];

      encounter.connection.order_index = priorEncounter.connection.order_index;
      encounter.connection.swapOrderIndexState();
      const pk: number = encounter.connection.pk;
      const updatePromise = this.diaryEntryEncounterConnectionService.update(pk, encounter.connection).toPromise();
      connectionUpdatePromises.push(updatePromise);
    }

    //Handle decrementing first encounter if necessary
    if(hasFirstIndex){
      const firstEncounter: Encounter = this.encounters[0];
      firstEncounter.connection.order_index = firstEncounter.connection.priorOrderIndex();
      
      const pk: number = firstEncounter.connection.pk;
      const updatePromise =  this.diaryEntryEncounterConnectionService.update(pk, firstEncounter.connection).toPromise();
      connectionUpdatePromises.push(updatePromise);  
    }

    return Promise.all(connectionUpdatePromises);
  }

  deleteEncounter(encounterIndex: number): void{
    const numberOfEncountersToDelete = 1;
    this.encounters.splice(encounterIndex, numberOfEncountersToDelete);

    const hasNoEncounters = this.encounters.length === 0;
    if(hasNoEncounters){
      this.routingService.routeToPath('diaryentry-overview');
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

  //SWAP ENCOUNTERS FUNCTIONALITY
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

    const updatedConnection1Promise = this.diaryEntryEncounterConnectionService.update(connection1.pk, connection1).toPromise();
    const updatedConnection2Promise = this.diaryEntryEncounterConnectionService.update(connection2.pk, connection2).toPromise();

    return Promise.all([updatedConnection1Promise, updatedConnection2Promise]);  
  }


  //ENCOUNTER EXCISSION FUNCTIONALITY
  onExcisionStart(encounterIndex: number): void{
    this.cutEncounterIndex = encounterIndex;
  }

  onExcisionCancel(encounterIndex: number): void{
    if (this.cutEncounterIndex === encounterIndex){
      this.cutEncounterIndex = null;
    }
  }

  
  async insertExcisedEncounter(insertionIndex: number){
    //Guard clauses
    if(this.cutEncounterIndex == null) return;
    const isInsertingAfterItself: boolean = this.cutEncounterIndex + 1 === insertionIndex;
    const isInsertingBeforeItself: boolean = this.cutEncounterIndex === insertionIndex;
    if(isInsertingAfterItself || isInsertingBeforeItself){
      this.cutEncounterIndex = null; //Reset the index;
      return;
    };

    //Hide UI while updating
    this.isUpdating = true;

    // Update encounter-orderIndices between the cut encounter and the place where it shall be inserted
    let insertionOrderIndex: number; //Temp Store for future orderIndex of cut encounter
    const isInsertingAfterCutIndex: boolean = insertionIndex > this.cutEncounterIndex;

    if (isInsertingAfterCutIndex){
      const rangeStart: number = this.cutEncounterIndex + 1; //You do not want to update the cut encounter
      const rangeEnd: number = insertionIndex - 1; //Range ends before the place where cutEncounter is inserted

      insertionOrderIndex = this.encounters[rangeEnd].connection.order_index;

      await this.decrementOrderIndices(rangeStart, rangeEnd);
    } else {
      const rangeStart: number = insertionIndex; //Range starts directly where character is inserted
      const rangeEnd: number = this.cutEncounterIndex - 1; //You do not want to update the cut encounter

      insertionOrderIndex = this.encounters[rangeStart].connection.order_index;

      await this.incrementOrderIndices(rangeStart, rangeEnd);
    }

    // Update cut encounter
    const cutEncounter: Encounter = this.encounters[this.cutEncounterIndex];
    cutEncounter.connection.order_index = insertionOrderIndex;
    cutEncounter.connection.swapOrderIndexState();
    const pk: number = cutEncounter.connection.pk;
    await this.diaryEntryEncounterConnectionService.update(pk, cutEncounter.connection).toPromise();

    this.cutEncounterIndex = null; //Reset cut feature
    this.sortEncounters();

    // Show UI again
    this.isUpdating = false;
  }
}
