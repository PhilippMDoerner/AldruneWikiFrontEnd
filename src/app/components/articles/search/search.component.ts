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

  constants: any = Constants;

  parameter_subscription: Subscription;

  constructor(
    private articleService: RecentlyUpdatedService,
    private route: ActivatedRoute,
    private router: Router,  
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const searchString: string = params['searchString'];
      this.articleService.getSearchedArticles(searchString).pipe(first()).subscribe(
        (articles: OverviewArticleObject[]) => this.articles = articles,
        error => this.routingService.routeToErrorPage(error)
      )
    });
  }

  sidebarColor(articleType: string): string{
    return Constants.articleTypeSidebarColorMapping[articleType];
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }

}
