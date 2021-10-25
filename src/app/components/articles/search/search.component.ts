import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { Article, OverviewArticleObject } from 'src/app/models/recentlyUpdatedArticle';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RecentlyUpdatedService } from 'src/app/services/recently-updated.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  //URLs
  homeUrl: string;

  articles: Article[];
  searchString: string;
  emptySearchSubtitle: string;
  filterOptions: string[] = [];
  campaign: CampaignOverview;

  constants: any = Constants;

  constructor(
    private route: ActivatedRoute,
    public routingService: RoutingService,
  ) { }


  ngOnInit(): void { 
    this.campaign = this.route.snapshot.data["campaign"];
    this.searchString = this.route.snapshot.params.searchString;

    const searchData = this.route.snapshot.data["searchResults"];
    this.articles = searchData.articles;
    this.emptySearchSubtitle = searchData.empty_response;

    this.onAfterArticleLoadFinished(this.campaign.name, searchData.articles, null);
  }

  onAfterArticleLoadFinished(campaignName: string, articles: OverviewArticleObject[], params: Params){    
    this.homeUrl = this.routingService.getRoutePath('home1', {campaign: campaignName});
  }

  sidebarColor(articleType: string): string{
    return Constants.articleTypeSidebarColorMapping[articleType];
  }

  filterSearchResults(filterOptions: string[]): void{
    this.filterOptions = filterOptions;
  }

  hasActiveFilter(): boolean{
    return this.filterOptions.length > 0;
  }
}
