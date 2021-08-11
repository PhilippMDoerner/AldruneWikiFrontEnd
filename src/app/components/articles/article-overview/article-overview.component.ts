import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { OverviewItem, OverviewItemObject } from "src/app/models/overviewItem";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OverviewService } from 'src/app/services/overview.service';
import { Constants } from 'src/app/app.constants';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';
import { RoutingService } from 'src/app/services/routing.service';
import { first } from 'rxjs/operators';
import { CharacterService } from 'src/app/services/character/character.service';
import { SSL_OP_NO_TLSv1_1 } from 'constants';

@Component({
  selector: 'app-article-overview',
  templateUrl: './article-overview.component.html',
  styleUrls: ['./article-overview.component.scss'],
})
export class ArticleOverviewComponent extends PermissionUtilityFunctionMixin implements OnInit {
  listItems: OverviewItemObject[];
  playerCharacters: OverviewItemObject[];
  isInitialAnimationFinished: boolean = false;

  @ViewChildren("filter") filterField: QueryList<ElementRef>;

  constants: any = Constants;
  overviewImages = {
    character: `${Constants.wikiStaticUrl}/frontpage/images/pic01.jpg`,
    item: `${Constants.wikiStaticUrl}/frontpage/images/pic07.jpg`,
    creature: `${Constants.wikiStaticUrl}/frontpage/images/pic06.jpg`,
    location: `${Constants.wikiStaticUrl}/frontpage/images/pic02.jpg`,
    organization: `${Constants.wikiStaticUrl}/frontpage/images/pic03.jpg`,
    diaryentry: `${Constants.wikiStaticUrl}/frontpage/images/pic04.png`,
  };
  overviewType: string;

  characterOverview: string = "character";
  itemOverview: string = "item";
  creatureOverview: string = "creature";
  locationOverview: string = "location";
  organizationOverview: string = "organization";
  diaryentryOverview: string = "diaryentry";

  processOverviewFunctions = {
    character: null,
    item: null,
    creature: null,
    organization: null,
    diaryentry: this.processDiaryentryOverviewItems,
    location: this.processLocationOverviewItems,
  }

  constructor(
    private overviewService: OverviewService,
    private router: Router,  
    public routingService: RoutingService,
    private characterService: CharacterService,
  ) { super() }

  ngOnInit(): void {
    const urlSplit: string[] = this.router.url.split('/');
    this.overviewType = urlSplit[urlSplit.length - 1];

    const listItemObs: Observable<OverviewItem[]> = this.overviewService.getOverviewItems(this.overviewType);
    listItemObs.pipe(first()).subscribe(
      (listItems: OverviewItemObject[]) => {
        this.listItems = listItems;

        const processingFunction = this.processOverviewFunctions[this.overviewType];
        if(processingFunction != null) processingFunction(this);
      }, 
      error => this.routingService.routeToErrorPage(error)
    );

    if(this.overviewType === this.characterOverview){
      this.characterService.getPlayerCharacters().pipe(first()).subscribe(
        (playerCharacters: OverviewItemObject[]) => this.playerCharacters = playerCharacters,
        error => this.routingService.routeToErrorPage(error)
      )
    }
    
  }

  //This function exists only so that it triggers the NgClass of the listItems in the template
  filterListItems(){}

  openFirstArticle(filterValue: string){
    const filterValueLower:string = filterValue.toLowerCase();
  
    const filteredListItems: OverviewItemObject[] = this.listItems.filter(
      (item: OverviewItemObject) => item.name.toLowerCase().includes(filterValueLower)
    );

    const firstFilteredListItem = filteredListItems[0];
    this.routingService.routeToApiObject(firstFilteredListItem);
  }

  processDiaryentryOverviewItems(context: this): void{
    context.listItems.forEach( 
      (diaryEntryItem: OverviewItemObject) => diaryEntryItem.name_full = context.buildDiaryEntryNameForList(diaryEntryItem)
    );
  }
  
  /**
   * @description Generates the full name of a location based on its path in the location tree, concatenating 
   * any parent name at the start.
   * @param {this} context - This component, needed to grant access despite the function being assigned to an object.
   */
  processLocationOverviewItems(context: this): void{
    context.listItems.forEach(
      (locationItem: OverviewItemObject) => {
        const parents: OverviewItemObject[] = context.getParentLocations(locationItem, context);
        const parentNames: string[] = parents.map((location: OverviewItemObject) => location.name).reverse();
        const locationPath: string = parentNames.join(" - ");

        locationItem.name_full = locationPath;      
      }
    );

    context.sortLocationsByNameFull(context);
  }

  getParentLocations(location: OverviewItemObject, context: this): OverviewItemObject[]{
    const parents: OverviewItemObject[] = [location];

    var currentLocation: OverviewItemObject = location; 

    while(currentLocation.parent_location_details.pk != null){ // aka hasParentLocation
      const parentLocationPk: number = currentLocation.parent_location_details.pk;
      const parentLocation: OverviewItemObject = context.getListItemByPk(parentLocationPk);
      parents.push(parentLocation);

      currentLocation = parentLocation;
    }

    return parents;
  }

  getListItemByPk(pk: number): OverviewItemObject{
    if (pk == null) return null;

    const targetItem: OverviewItemObject = this.listItems.find((item: OverviewItemObject) => item.pk === pk);
    return targetItem;
  }

  sortLocationsByNameFull(context: this){
    const locations: OverviewItemObject[] = context.listItems;
    locations.sort((loc1: OverviewItemObject, loc2: OverviewItemObject) => (loc1.name_full > loc2.name_full) ? 1 : -1);
  }

  buildDiaryEntryNameForList(diaryEntry: OverviewItemObject): string{
    const startWithSessionNumber: string = `#${diaryEntry.session_details.session_number}`;
    let title: string = (diaryEntry.name != null) ? `- ${diaryEntry.name}` : "";

    if (Constants.isSmallScreen) return `${startWithSessionNumber} ${title}`

    let daysCoveredByEntry: string = "";
    if(diaryEntry.session_details.start_day != null && diaryEntry.session_details.end_day != null){
      const padLength: number = 3;
      const startDay: string = this.padNumber(diaryEntry.session_details.start_day, padLength, "");
      const endDay: string = this.padNumber(diaryEntry.session_details.end_day, padLength, "");
      daysCoveredByEntry = `- Days ${startDay}-${endDay}`;
    }
    
    return `${startWithSessionNumber} ${daysCoveredByEntry} ${title}`;
  }


  padNumber(num: number, padCount: number, paddingCharacter="0"): string{
    const overlengthString: string = paddingCharacter.repeat(padCount) + num;
    return overlengthString.slice(padCount*-1);
  }
}
