import { Component, OnDestroy, OnInit } from '@angular/core';
import { OverviewItem, OverviewItemObject } from "src/app/models/overviewItem";
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { OverviewService } from 'src/app/services/overview.service';
import { Constants } from 'src/app/app.constants';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';
import { RoutingService } from 'src/app/services/routing.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-article-overview',
  templateUrl: './article-overview.component.html',
  styleUrls: ['./article-overview.component.scss'],
})
export class ArticleOverviewComponent extends PermissionUtilityFunctionMixin implements OnInit {
  listItems: OverviewItemObject[];

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
    public routingService: RoutingService
  ) { super() }

  ngOnInit(): void {
    const urlSplit: string[] = this.router.url.split('/');
    this.overviewType = urlSplit[urlSplit.length - 1];

    const listItemObs: Observable<OverviewItem[]> = this.overviewService.getOverviewItems(this.overviewType);
    listItemObs.pipe(first()).subscribe(
      (listItems: OverviewItemObject[]) => this.listItems = listItems, 
      error => this.routingService.routeToErrorPage(error)
    );
  }

  capitalizeString(s : string){
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  filterListItems(){
    //This function exists only so that it triggers the NgClass of the listItems in the template
  }

  buildDiaryEntryNameForList(diaryEntry: OverviewItemObject): string{
    const startWithSessionNumber: string = diaryEntry.name_full;

    let daysCoveredByEntry: string = "";
    if(diaryEntry.session_details.start_day && diaryEntry.session_details.end_day){
      const padLength = 3;
      const startDay: string = this.padNumber(diaryEntry.session_details.start_day, padLength, "");
      const endDay: string = this.padNumber(diaryEntry.session_details.end_day, padLength, "");
      daysCoveredByEntry = `- Days ${startDay}-${endDay}`;
    }

    let title: string = "";
    if (diaryEntry.name){
      title = `- ${diaryEntry.name}`;
    }
    
    return `${startWithSessionNumber} ${daysCoveredByEntry} ${title}`;
  }

  padNumber(num: number, padCount: number, paddingCharacter="0"): string{
    const overlengthString: string = paddingCharacter.repeat(padCount) + num;
    return overlengthString.slice(padCount*-1);
  }
}
