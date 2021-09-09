import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { DiaryEntryObject } from 'src/app/models/diaryentry';
import { Encounter, EncounterObject } from 'src/app/models/encounter';
import { CampaignService } from 'src/app/services/campaign.service';
import { EncounterServiceService } from 'src/app/services/encounter/encounter-service.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-diary-entry-encounter-list',
  templateUrl: './diary-entry-encounter-list.component.html',
  styleUrls: ['./diary-entry-encounter-list.component.scss']
})
export class DiaryEntryEncounterListComponent extends PermissionUtilityFunctionMixin implements OnInit, AfterViewInit{
  constants = Constants;
  //TODO: Create a mixin for lists

  @Input() diaryEntry: DiaryEntryObject;
  @ViewChildren("encounters") encounterElements: QueryList<any>;
  encounters: EncounterObject[] = [];
  isEncounterUpdating: boolean[] = [];
  isUpdating: boolean = false;
  diaryEntryView: boolean = true;

  cutEncounterIndex: number;

  constructor(
    private warning: WarningsService,
    private routingService: RoutingService,
    private route: ActivatedRoute,
    private encounterService: EncounterServiceService,
    private campaignService: CampaignService,
  ) { super() }

  ngOnInit(): void{
    const hasDisplayModeParam = !(this.route.snapshot.params['displayMode'] == null);
    this.diaryEntryView = (hasDisplayModeParam) ? this.route.snapshot.params['displayMode'] === "diaryEntry" : true;

    for(const diaryEncounter of this.diaryEntry.encounters){
      const encounter: EncounterObject = new EncounterObject (diaryEncounter);
      this.encounters.push(encounter);
      this.isEncounterUpdating.push(false);
    }

    this.sortEncounters();
  }

  ngAfterViewInit(): void{
    const urlEncounterTitle: string = this.route.snapshot.params["encounterTitle"];
    this.scrollToEncounterInQueryList(this.encounterElements, urlEncounterTitle);
  }

  scrollToEncounterInQueryList(queryList: QueryList<any>, encounterTitle: string){
    if (encounterTitle == null) return;
    encounterTitle = encounterTitle.toLowerCase();

    const targetEncounter = queryList.find( encounter => encounter.cardData.title.toLowerCase() == encounterTitle);
    const hasTargetEncounter = targetEncounter != null;

    if(hasTargetEncounter){
      targetEncounter.card.nativeElement.scrollIntoView();
    }
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
    
    const newOrderIndex: number = this.getOrderIndexForNewEncounter(encounterIndex);

    //Create and add Encounter
    const newEncounterData: Encounter = {
      description: null, 
      diaryentry: this.diaryEntry.pk,
      location: null,
      title: "New Encounter",
      getAbsoluteRouterUrl: null,
      order_index: newOrderIndex
    };
    const newEncounter: EncounterObject = new EncounterObject(newEncounterData);

    const isNewFirstEncounter: boolean = encounterIndex < 0;
    const insertionIndex: number = (isNewFirstEncounter) ? 0 : encounterIndex + 1;

    this.insertEncounter(newEncounter, insertionIndex);
  }

  insertEncounter(encounter: EncounterObject, insertionIndex: number): void{
    const entriesToDelete: number = 0;
    this.encounters.splice(insertionIndex, entriesToDelete, encounter);
  }

  /**
   * Determines the order index the encounter should have based on the place where it is supposed to be inserted into
   * @param {number} encounterIndex - The index on this.encounters after which the new encounter shall be inserted.
   * This will increment the index of the encounter currently there and all after it by one, though not in this function
   */
  getOrderIndexForNewEncounter(insertionIndex: number): number{
    const isNewFirstEncounter: boolean = insertionIndex < 0;
    const isNewFirstEncounterInEmptyDiaryentry: boolean = this.encounters.length === 0;
    const isNewFirstEncounterInFullDiaryentry: boolean = isNewFirstEncounter && !isNewFirstEncounterInEmptyDiaryentry;

    let newOrderIndex: number;
    if (isNewFirstEncounterInEmptyDiaryentry){
      newOrderIndex = 0;

    } else if (isNewFirstEncounterInFullDiaryentry){
      const firstEncounter: EncounterObject = this.encounters[0];
      newOrderIndex = firstEncounter.priorOrderIndex();

    } else { //is new encounter after some other encounter
      const priorEncounter: EncounterObject = this.encounters[insertionIndex];
      newOrderIndex = priorEncounter.getShiftedOrderIndex();
    }

    return newOrderIndex;
  }

  /**
   * Is triggered when a new encounter shall be created. Together with an encounter, you must create an
   * encounterConnection to this diaryentry.
   * @param createdEncounterIndex : The index in this.encounters of the new created Encounter
   */   
  onEncounterCreate(newDiaryentryEncounters: EncounterObject[]): void{
    //Replace the newly createdEncounter with the Dataset currently being a placeholder for it at the given index
    this.encounters = newDiaryentryEncounters;
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
    if(isLastEncounter) return; //encounter is already last, can't increase more

    const nextEncounterIndex = encounterIndex + 1;

    this.swapEncounters(encounterIndex, nextEncounterIndex);
  }

  onEncounterOrderDecrease(encounterIndex: number): void{
    const isFirstEncounter = encounterIndex === 0;
    if(isFirstEncounter) return; //encounter is already first, can't decrease more

    const priorEncounterIndex = encounterIndex - 1;

    this.swapEncounters(encounterIndex, priorEncounterIndex);
  }

  async swapEncounters(encounterIndex1: number, encounterIndex2: number): Promise<void>{
    // Hide Encounters during Update
    this.isEncounterUpdating[encounterIndex1] = true;
    this.isEncounterUpdating[encounterIndex2] = true;

    // Swap order indices of both encounters
    const encounter1: EncounterObject = this.encounters[encounterIndex1];
    const encounter2: EncounterObject = this.encounters[encounterIndex2];

    try{
      const swappedEncounters: EncounterObject[] = await this.swapEncountersInDb(encounter1.pk, encounter2.pk);

      //Update the encounters themselves
      const updatedEncounter1 = swappedEncounters.find((encounter: EncounterObject) => encounter.pk === encounter1.pk);
      const updatedEncounter2 = swappedEncounters.find((encounter: EncounterObject) => encounter.pk === encounter2.pk);

      this.encounters[encounterIndex1] = updatedEncounter1;
      this.encounters[encounterIndex2] = updatedEncounter2;

    } catch(error){
      this.warning.showWarning(error);
    }
    
    // Display Encounters again
    this.isEncounterUpdating[encounterIndex1] = false;
    this.isEncounterUpdating[encounterIndex2] = false;

    this.sortEncounters();
  }

  async swapEncountersInDb(encounter1_pk: number, encounter2_pk: number): Promise<EncounterObject[]>{
    //Ensure you don't trigger unique-together db-constraint by shifting/unshifting the encounter's order_index
    const campaignName = this.diaryEntry.campaign_details.name;
    const swappingEncountersPromise: Promise<EncounterObject[]> = this.encounterService.swapEncounterOrder(campaignName, encounter1_pk, encounter2_pk).toPromise();

    return swappingEncountersPromise;
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

    const encounter: EncounterObject = this.encounters[this.cutEncounterIndex];
    const newOrderIndex: number = this.encounters[insertionIndex].order_index;

    this.isUpdating = true;
    
    this.encounterService.cutInsertEncounter(this.diaryEntry.campaign_details.name, encounter, newOrderIndex).pipe(first()).subscribe(
      reorderedEncounters => {
        this.encounters = reorderedEncounters;
        this.isUpdating = false;
        this.cutEncounterIndex = null;
      },
      error => this.warning.showWarning(error)
    )
  }
}
