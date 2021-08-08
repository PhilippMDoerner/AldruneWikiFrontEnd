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

@Component({
  selector: 'app-diary-entry-encounter-list',
  templateUrl: './diary-entry-encounter-list.component.html',
  styleUrls: ['./diary-entry-encounter-list.component.scss']
})
export class DiaryEntryEncounterListComponent extends PermissionUtilityFunctionMixin implements OnInit{

  @Input() diaryEntry: DiaryEntryObject;
  encounters: EncounterObject[] = [];
  isEncounterUpdating: boolean[] = [];
  isUpdating: boolean = false;
  diaryEntryView: boolean = true;

  cutEncounterIndex: number;

  constructor(
    private warning: WarningsService,
    private routingService: RoutingService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private diaryEntryEncounterConnectionService: DiaryentryEncounterConnectionService,
    private encounterService: EncounterServiceService,
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
      const firstEncounter: EncounterObject = this.encounters[0];
      newOrderIndex = firstEncounter.priorOrderIndex();

    } else {
      const priorEncounter: EncounterObject = this.encounters[encounterIndex];
      newOrderIndex = priorEncounter.getShiftedOrderIndex();
    }

    //Create Encounter
    const newEncounter: Encounter = {
      description: null, 
      diaryentry: this.diaryEntry.pk,
      location: null,
      title: "New Encounter",
      getAbsoluteRouterUrl: null,
      order_index: newOrderIndex
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
  async onEncounterCreate(createdEncounter: EncounterObject, createdEncounterIndex: number): Promise<void>{
    //Replace the newly createdEncounter with the Dataset currently being a placeholder for it at the given index
    this.encounters[createdEncounterIndex] = createdEncounter;

    //Increment Encounters up to last-encounter to order-index of next encounter
    this.encounters[createdEncounterIndex] = createdEncounter;
    const lastIndex = this.encounters.length - 1;
    const firstEncounterAfterCreatedEncounter = createdEncounterIndex + 1;
    await this.incrementOrderIndices(firstEncounterAfterCreatedEncounter, lastIndex);
  }

  /**
   * error1: What should be happening in line 142 is that the "newCreatedConnection" should, as annotated, be of type
   *    DiaryEntryEncounterConnectionObject. It is unclear how, but what diaryEntryEncounterConnectionService.create is 
   *    returning is the newConnection wrapped in an EncounterObject class, for some obscure reason. 
   *    I checked the service itself, it has the correct class. I checked the GenericObjectService, it receives the correct
   *    class in the constructor. Other methods on the service appear unaffected. I do not comprehend what is wrong here.
   */

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
      const encounter: EncounterObject = this.encounters[i];
      const nextEncounter: EncounterObject = this.encounters[i+1];

      encounter.order_index = nextEncounter.order_index;
      encounter.swapOrderIndexState();

      const updatePromise = this.encounterService.update(encounter.pk, encounter).toPromise();
      connectionUpdatePromises.push(updatePromise);
    }

    //Handle incrementing last encounter if necessary
    if(hasLastIndex){
      const lastEncounterIndex: number = this.encounters.length - 1;
      const lastEncounter: EncounterObject = this.encounters[lastEncounterIndex];
      lastEncounter.order_index = lastEncounter.nextOrderIndex();

      const updatePromise =  this.diaryEntryEncounterConnectionService.update(lastEncounter.pk, lastEncounter).toPromise();
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
  async decrementOrderIndices(rangeStartIndex: number, rangeEndIndex: number): Promise<Encounter[]>{
    //Guard Clauses
    if(rangeStartIndex < 0) throw `IndexOutOfBoundsExceptions. You can not increment encounters at index 
    ${rangeStartIndex}, Indices must be positive!`;
    if(rangeEndIndex >= this.encounters.length) throw `IndexOutOfBoundsExceptions. You can not decrement encounter at index
    ${rangeEndIndex}, you only have ${this.encounters.length} encounter(s)!`;
    if(rangeStartIndex > rangeEndIndex) return;

    const hasFirstIndex: boolean = rangeStartIndex === 0;
    const adjustedStartIndex: number = (hasFirstIndex) ? 1 : rangeStartIndex;

    const encounterUpdatePromises: Promise<Encounter>[] = [];
    for(let i=rangeEndIndex; i >= adjustedStartIndex; i--){
      const encounter: EncounterObject = this.encounters[i];
      const priorEncounter: EncounterObject = this.encounters[i-1];

      encounter.order_index = priorEncounter.order_index;
      encounter.swapOrderIndexState();

      const updatePromise = this.encounterService.update(encounter.pk, encounter).toPromise();
      encounterUpdatePromises.push(updatePromise);
    }

    //Handle decrementing first encounter if necessary
    if(hasFirstIndex){
      const firstEncounter: EncounterObject = this.encounters[0];
      firstEncounter.order_index = firstEncounter.priorOrderIndex();
      
      const updatePromise =  this.encounterService.update(firstEncounter.pk, firstEncounter).toPromise();
      encounterUpdatePromises.push(updatePromise);  
    }

    return Promise.all(encounterUpdatePromises);
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
      const order_index1: number = encounter1.order_index;
      const order_index2: number = encounter2.order_index;

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
    const encounter1: EncounterObject = this.encounters[encounterIndex1];
    const encounter2: EncounterObject = this.encounters[encounterIndex2];

    const temp = encounter1.order_index;
    encounter1.order_index = encounter2.order_index;
    encounter2.order_index = temp;

    try{
      await this.updateSwappedEncountersToDb(encounter1, encounter2);
    } catch(error){
      this.warning.showWarning(error);
    }

    // Display Encounters again
    this.isEncounterUpdating[encounterIndex1] = false;
    this.isEncounterUpdating[encounterIndex2] = false;

    this.sortEncounters();
  }

  async updateSwappedEncountersToDb(encounter1: EncounterObject, encounter2: EncounterObject): Promise<any>{
    //Ensure you don't trigger unique-together db-constraint by shifting/unshifting the encounter's order_index
    encounter1.swapOrderIndexState();
    encounter2.swapOrderIndexState();

    const updatedConnection1Promise = this.encounterService.update(encounter1.pk, encounter1).toPromise();
    const updatedConnection2Promise = this.encounterService.update(encounter2.pk, encounter2).toPromise();

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

      insertionOrderIndex = this.encounters[rangeEnd].order_index;

      await this.decrementOrderIndices(rangeStart, rangeEnd);
    } else {
      const rangeStart: number = insertionIndex; //Range starts directly where character is inserted
      const rangeEnd: number = this.cutEncounterIndex - 1; //You do not want to update the cut encounter

      insertionOrderIndex = this.encounters[rangeStart].order_index;

      await this.incrementOrderIndices(rangeStart, rangeEnd);
    }

    // Update cut encounter
    const cutEncounter: EncounterObject = this.encounters[this.cutEncounterIndex];
    cutEncounter.order_index = insertionOrderIndex;
    cutEncounter.swapOrderIndexState();

    await this.encounterService.update(cutEncounter.pk, cutEncounter).toPromise();

    this.cutEncounterIndex = null; //Reset cut feature
    this.sortEncounters();

    // Show UI again
    this.isUpdating = false;
  }
}
