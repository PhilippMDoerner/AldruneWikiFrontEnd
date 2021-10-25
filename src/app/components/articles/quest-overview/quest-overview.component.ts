import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { OverviewItemObject } from 'src/app/models/overviewItem';
import { Quest, QuestObject } from 'src/app/models/quest';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { QuestService } from 'src/app/services/quest.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { animateElement } from 'src/app/utils/functions/animationDecorator';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-quest-overview',
  templateUrl: './quest-overview.component.html',
  styleUrls: ['./quest-overview.component.scss']
})
export class QuestOverviewComponent extends PermissionUtilityFunctionMixin implements OnInit {
  //URLs
  homeUrl: string;

  //Other variables
  quests: Array<{key:string, value:QuestObject[]}>;
  filterStateTypes: string[];
  filterStates: object;
  constants: any = Constants;
  campaign: CampaignOverview;

  @ViewChild('overviewMainCard') articleElement: ElementRef;

  constructor(
    public routingService: RoutingService,
    route: ActivatedRoute,
    tokenService: TokenService,
  ) { 
    super(tokenService, route);
  }

  ngOnInit(): void {
    this.campaign = this.route.snapshot.data["campaign"];
    const ungroupedQuests = this.route.snapshot.data["overviewList"];
    this.quests = this.groupQuestsByTaker(ungroupedQuests);

    const questTakersWithDuplicates: string[] = ungroupedQuests.map((quest: QuestObject) => quest.taker_details.name);
    const questTakers = [... new Set(questTakersWithDuplicates)];
    this.filterStates = {};
    questTakers.forEach((questTaker: string) => this.filterStates[questTaker] = "Default");

    const questStatesWithDuplicates: string[] = ungroupedQuests.map(quest => quest.status);
    this.filterStateTypes = [... new Set(questStatesWithDuplicates)];

    this.updateDynamicVariables(this.campaign, ungroupedQuests, this.route.snapshot.params);
  }

  updateDynamicVariables(campaign: CampaignOverview, articles: QuestObject[], params: Params){
    this.homeUrl = this.routingService.getRoutePath('home1', {campaign: campaign.name});
  }

  ngAfterViewInit(): void{
    if(!this.articleElement?.nativeElement) return;

    animateElement(this.articleElement.nativeElement, 'fadeIn');
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
}
