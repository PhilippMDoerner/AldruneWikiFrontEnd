import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { OverviewItem } from 'src/app/models/overviewItem';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss'],
})
export class Home2Component implements OnInit {
  @ViewChild("search") searchField: ElementRef;

  searchString: string;
  constants = Constants;
  campaign: string;
  parameterSubscription: Subscription;

  recentlyUpdatedArticles: OverviewItem[];

  constructor(
    private routingService: RoutingService,
    private route: ActivatedRoute,
    private globalUrlParams: GlobalUrlParamsService
  ) { }

  ngOnInit(): void {
    this.parameterSubscription = this.route.params.subscribe(
      params => {
        this.campaign = params.campaign;
        this.globalUrlParams.updateCampaignBackgroundImage(this.campaign);
      },
      error => this.routingService.routeToErrorPage(error)
    )
  }

  sidebarColor(articleType: string): string{
    return Constants.articleTypeSidebarColorMapping[articleType];
  }

  startSearch(): void{
    if (this.searchString != null){
      const cleaned_search = this.searchString.replace(/[^a-zA-Z0-9]/g,' ').trim();
      const cleaned_trimmed_search = cleaned_search.replace(/\s\s+/g, ' '); //Removes scenarios with more than 1 consecutive whitespace
  
      this.searchString = cleaned_trimmed_search;
    }

    const isInvalidSearchString = this.searchString == null || this.searchString === ""
    if (isInvalidSearchString) return; //TODO: Make this route to some kind of help page instead

    this.routingService.routeToPath('campaignSearch', {campaign: this.campaign, searchString: this.searchString});
  }

  /** Necessary to still allow selecting the search field on this page. Else the "preventDefault" bit on the touch events blocks that */
  focusSearchField(){
    this.searchField.nativeElement.click();
    this.searchField.nativeElement.focus();
  }
}
