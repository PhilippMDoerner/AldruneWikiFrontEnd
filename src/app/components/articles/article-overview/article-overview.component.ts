import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { OverviewItem, OverviewItemObject } from "src/app/models/overviewItem";
import { Router } from '@angular/router';
import { animateElement } from 'src/app/utils/functions/animationDecorator';
import { Observable } from 'rxjs';
import { OverviewService } from 'src/app/services/overview.service';
import { Constants } from 'src/app/app.constants';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';
import { RoutingService } from 'src/app/services/routing.service';
import { first } from 'rxjs/operators';
import { CharacterService } from 'src/app/services/character/character.service';

@Component({
  selector: 'app-article-overview',
  templateUrl: './article-overview.component.html',
  styleUrls: ['./article-overview.component.scss'],
})
export class ArticleOverviewComponent extends PermissionUtilityFunctionMixin implements OnInit, AfterViewInit {
  listItems: OverviewItemObject[];
  playerCharacters: OverviewItemObject[];
  isInitialAnimationFinished: boolean = false;

  @ViewChild('overviewMainCard') overviewMainCard: ElementRef;
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
      (listItems: OverviewItemObject[]) => this.listItems = listItems, 
      error => this.routingService.routeToErrorPage(error)
    );

    if(this.overviewType === this.characterOverview){
      this.characterService.getPlayerCharacters().pipe(first()).subscribe(
        (playerCharacters: OverviewItemObject[]) => this.playerCharacters = playerCharacters,
        error => this.routingService.routeToErrorPage(error)
      )
    }
  }

  ngAfterViewInit(): void{
    animateElement(this.overviewMainCard.nativeElement, 'zoomIn');
  }

  filterListItems(){
    //This function exists only so that it triggers the NgClass of the listItems in the template
  }

  openFirstArticle(filterValue: string){
    const filterValueLower:string = filterValue.toLowerCase();
  
    const filteredListItems: OverviewItemObject[] = this.listItems.filter(
      (item: OverviewItemObject) => item.name.toLowerCase().includes(filterValueLower)
    );

    const firstFilteredListItem = filteredListItems[0];
    this.routingService.routeToApiObject(firstFilteredListItem);
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
