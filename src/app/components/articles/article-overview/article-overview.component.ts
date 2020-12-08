import { Component, OnDestroy, OnInit } from '@angular/core';
import { OverviewItem } from "src/app/models/overviewItem";
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { OverviewService } from 'src/app/services/overview.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-article-overview',
  templateUrl: './article-overview.component.html',
  styleUrls: ['./article-overview.component.scss'],
})
export class ArticleOverviewComponent implements OnInit, OnDestroy {
  listItems: OverviewItem[];
  listItemArray: Array<OverviewItem>;
  constants: any = Constants;
  overviewImages = {
    character: `${this.constants.wikiStaticUrl}/frontpage/images/pic01.jpg`,
    item: `${this.constants.wikiStaticUrl}/frontpage/images/pic07.jpg`,
    creature: `${this.constants.wikiStaticUrl}/frontpage/images/pic06.jpg`,
    location: `${this.constants.wikiStaticUrl}/frontpage/images/pic02.jpg`,
    organization: `${this.constants.wikiStaticUrl}/frontpage/images/pic03.jpg`,
    diaryentry: `${this.constants.wikiStaticUrl}/frontpage/images/pic04.png`,
  };
  overviewType: string;

  characterOverview: string = "character";
  itemOverview: string = "item";
  creatureOverview: string = "creature";
  locationOverview: string = "location";
  organizationOverview: string = "organization";
  diaryentryOverview: string = "diaryentry";

  private listItemSubscription: Subscription;

  constructor(
    private overviewService: OverviewService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const urlSplit = this.router.url.split('/');
    this.overviewType = urlSplit[urlSplit.length - 1];

    const listItemObs = this.overviewService.getOverviewItems(this.overviewType) 
    this.listItemSubscription = listItemObs.subscribe(listItems => {
      this.listItems = listItems;
      this.listItemArray = [];
      for(let item of listItems){
        this.listItemArray.push(item);
      }
    }, error =>{
      console.log(error);
      if (error.status === 403){
        const url: string = `${this.constants.wikiUrl}/users/login`;
        window.location.href = url;
      } else {
        this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}/error`);
      }
    });
  }

  capitalizeString(s : string){
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  filterListItems(){
    //This function exists only so that it triggers the NgClass of the listItems in the template
  }

  ngOnDestroy(){
    this.listItemSubscription.unsubscribe();
  }
}
