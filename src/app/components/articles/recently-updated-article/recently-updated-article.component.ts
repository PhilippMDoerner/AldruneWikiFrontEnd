import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { OverviewArticleObject } from 'src/app/models/recentlyUpdatedArticle';
import { RecentlyUpdatedService } from 'src/app/services/recently-updated.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-recently-updated-article',
  templateUrl: './recently-updated-article.component.html',
  styleUrls: ['./recently-updated-article.component.scss']
})
export class RecentlyUpdatedArticleComponent implements OnInit {
  article_subscription: Subscription;
  articles: OverviewArticleObject[];
  constants: any = Constants;

  constructor(
    private recentlyUpdatedArticleService: RecentlyUpdatedService,
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.article_subscription = this.recentlyUpdatedArticleService.getRecentlyUpdatedArticle().subscribe(
      (articles: OverviewArticleObject[]) => {
        this.articles = articles;
        this.articles.sort(this.sortByDate);
      },
      error => this.routingService.routeToErrorPage(error)
    );
  }

  sortByDate(article1: OverviewArticleObject, article2: OverviewArticleObject){
    const date1 = new Date(article1.update_date);
    const date2 = new Date(article2.update_date);
    
    if (date1 > date2) return 1;
    if (date1 < date2) return -1;
    return 0;
  }

  sidebarColor(articleType: string): string{
    return Constants.articleTypeSidebarColorMapping[articleType];
  }

  ngOnDestroy():void{
    this.article_subscription.unsubscribe();
  }

}
