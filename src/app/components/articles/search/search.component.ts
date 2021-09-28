import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Article, OverviewArticleObject } from 'src/app/models/recentlyUpdatedArticle';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RecentlyUpdatedService } from 'src/app/services/recently-updated.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  //URLs
  homeUrl: string;

  articles: Article[];
  searchString: string;
  emptySearchSubtitle: string;
  filterOptions: string[] = [];
  campaign: string;

  constants: any = Constants;

  parameter_subscription: Subscription;

  constructor(
    private articleService: RecentlyUpdatedService,
    private route: ActivatedRoute,
    private router: Router,  
    public routingService: RoutingService,
    private globalUrlParams: GlobalUrlParamsService,
  ) { }


  ngOnInit(): void {  
    this.parameter_subscription = this.route.params.subscribe(params => {
      this.searchString = params['searchString'];
      this.campaign = params.campaign;

      this.articleService.getCampaignSearchArticle(this.campaign, this.searchString)
        .pipe(first())
        .subscribe(
          (response: any) => {
            this.articles = response.articles;
            this.emptySearchSubtitle = response.empty_response;
            this.onAfterArticleLoadFinished(params.campaign, response.articles, params);
          },
          error => this.routingService.routeToErrorPage(error)
        );      
    });
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

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }

}
