import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { OverviewItem } from 'src/app/models/overviewItem';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';
import { animateElement } from 'src/app/utils/functions/animationDecorator';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss'],
})
export class Home2Component implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("search") searchField: ElementRef;
  @ViewChild('article') articleElement: ElementRef;

  searchString: string;
  constants = Constants;
  campaignData: CampaignOverview;

  campaignSubscription: Subscription;

  recentlyUpdatedArticles: OverviewItem[];

  constructor(
    private routingService: RoutingService,
    private globalUrlParams: GlobalUrlParamsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.campaignData = this.route.snapshot.data["campaign"];
  }

  ngAfterViewInit(): void{
    this.animateHomePage();
  }

  animateHomePage(): void{
    if(!this.articleElement?.nativeElement) return;

    animateElement(this.articleElement.nativeElement, 'fadeIn');
  }

  startSearch(): void{
    if (this.searchString != null){
      const cleaned_search = this.searchString.replace(/[^a-zA-Z0-9']/g,' ').trim();
      const cleaned_trimmed_search = cleaned_search.replace(/\s\s+/g, ' '); //Removes scenarios with more than 1 consecutive whitespace
  
      this.searchString = cleaned_trimmed_search;
    }

    const isInvalidSearchString = this.searchString == null || this.searchString === ""
    if (isInvalidSearchString) return; //TODO: Make this route to some kind of help page instead

    this.routingService.routeToPath('campaignSearch', {campaign: this.campaignData.name, searchString: this.searchString});
  }

  ngOnDestroy(): void{
    if(this.campaignSubscription) this.campaignSubscription.unsubscribe();
  }
}
