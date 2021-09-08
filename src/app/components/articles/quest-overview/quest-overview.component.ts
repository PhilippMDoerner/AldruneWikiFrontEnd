import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Quest, QuestObject } from 'src/app/models/quest';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { QuestService } from 'src/app/services/quest.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-quest-overview',
  templateUrl: './quest-overview.component.html',
  styleUrls: ['./quest-overview.component.scss']
})
export class QuestOverviewComponent extends PermissionUtilityFunctionMixin implements OnInit {
  quests: Array<{key:string, value:QuestObject[]}>;
  filterStateTypes: string[];
  filterStates: object;
  constants: any = Constants;
  campaign: string;
  parameterSubscription: Subscription;

  private quest_subscription: Subscription;

  constructor(
    private questService: QuestService,
    public routingService: RoutingService,
    private route: ActivatedRoute,
    private warning: WarningsService,
    private globalUrlParams: GlobalUrlParamsService,
  ) { super() }

  ngOnInit(): void {
    this.parameterSubscription = this.route.params.subscribe( params => {
        this.campaign = params.campaign;
        this.globalUrlParams.updateCurrentlySelectedCampaign(params.campaign);

        this.questService.campaignList(this.campaign).pipe(first()).subscribe(
          (quests: QuestObject[]) => {
            this.quests = this.groupQuestsByTaker(quests);
    
            this.filterStateTypes = [];
            this.filterStates = {};
            for(let quest of quests){
              if (!this.filterStates[quest.taker_details.name]){
                this.filterStates[quest.taker_details.name] = 'Default';
              }
    
              if (!this.filterStateTypes.includes(quest.status)){
                this.filterStateTypes.push(quest.status);
              }
            };
          }, 
          error => this.routingService.routeToErrorPage(error)
        );
      },
      error => this.warning.showWarning(error)
    );
  }

  groupQuestsByTaker(itemArray: QuestObject[]): Array<{key:string, value:QuestObject[]}>{
    /**
     * Turns an array of QuestObjects into an array of objects, the object containing 
     * an array of all quests associated with a given quest Taker 
     * */
    const callback = (accumulator: object, quest: Quest) => {
        const questTaker: string = quest.taker_details.name;
        if(accumulator.hasOwnProperty(questTaker)) accumulator[questTaker].push(quest);
        else accumulator[questTaker] = [quest];
        return accumulator;
    }
    const groupedQuests = itemArray.reduce(callback, {});

    const result = Object.keys(groupedQuests).map(key => ({key, value: groupedQuests[key] }));
  
    // Sort by Quest-Taker alphabetically, but put "Group" quests always at the start
    const sortedResults = result.sort((objA, objB) =>{
        if (objA.key === "Group") return -1;
        else if (objB.key === "Group") return 1;
        else if (objA.key > objB.key) return 1;
        else if (objA.key === objB.key) return 0;
        else return -1;
    });

    // Sort individual quests by quest-status, In-progress > On Hold > Completed > Failed
    const statusValues = {"In progress": 1, "On Hold": 2, "Completed": 3, "Failed": 4 }
    for (const [index, quest] of sortedResults.entries()){
        sortedResults[index].value = quest.value.sort((objA, objB) => {
            if (objA.status !== objB.status){
                return statusValues[objA.status] - statusValues[objB.status];
            } else {
                if (objA.name > objB.name) return 1;
                else if (objA.name <objB.name) return -1;
            }
        })
    }

    return sortedResults;
  }

  isFilteredOut(filterState: string, questState: string){
    if (filterState === 'All') return false;
    if (questState === filterState) return false;
    if (filterState === 'Default' && (questState === 'In progress' || questState === 'On Hold')) return false;
    return true;
  }

  capitalizeString(s : string){
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  ngOnDestroy(): void{
    if (this.quest_subscription) this.quest_subscription.unsubscribe();
    if (this.parameterSubscription) this.parameterSubscription.unsubscribe();
  }
}
