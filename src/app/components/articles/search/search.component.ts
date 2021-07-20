import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Article, OverviewArticleObject } from 'src/app/models/recentlyUpdatedArticle';
import { RecentlyUpdatedService } from 'src/app/services/recently-updated.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  articles: Article[];
  searchString: string;
  emptySearchSubtitle: string;
  filterOptions: string[] = [];

  constants: any = Constants;

  parameter_subscription: Subscription;

  constructor(
    private articleService: RecentlyUpdatedService,
    private route: ActivatedRoute,
    private router: Router,  
    public routingService: RoutingService,
  ) { }
  
  //TODO: Turn this into a table in the backend
  nothingFoundSubtitles: string[] = [
    "This page is about as empty as Illfae's heart.",
    "Were you looking for Barbatos conscience?",
    "Ah, I see, you were trying to find moments where Rhiannon was humble.",
    "You know, looking for moments where Cait had normal goals was never going to get you anything.",
    "Of course you wouldn't find anything on Relentless' crimes, he's innocent!",
    "... I'm surprised, I did expect to find more supporting Fen's conspiracy theories.",
    "If you were looking for Bathilde's age, it's ancient and nobody knows for sure.",
    "Yeah, that's about as much as Murtagh leaves of his enemies if he's pissed off.",
  ]

  ngOnInit(): void {    
    this.parameter_subscription = this.route.params.subscribe(params => {
      this.searchString = params['searchString'];
      this.articleService.getSearchedArticles(this.searchString).pipe(first()).subscribe(
        (articles: OverviewArticleObject[]) => this.articles = articles,
        error => this.routingService.routeToErrorPage(error)
      )
    });

    this.emptySearchSubtitle = this.getRandomSubtitle();
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

  getRandomSubtitle(): string{
    const subtitleCount = this.nothingFoundSubtitles.length;
    const subtitleIndex = Math.floor(Math.random()*subtitleCount);
    return this.nothingFoundSubtitles[subtitleIndex];
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }

}
