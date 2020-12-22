import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { ArticleObject } from 'src/app/models/recentlyUpdatedArticle';
import { RecentlyUpdatedService } from 'src/app/services/recently-updated.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-recently-updated-article',
  templateUrl: './recently-updated-article.component.html',
  styleUrls: ['./recently-updated-article.component.scss']
})
export class RecentlyUpdatedArticleComponent implements OnInit {
  article_subscription: Subscription;
  articles: ArticleObject[];
  constants: any = Constants;

  constructor(
    private recentlyUpdatedArticleService: RecentlyUpdatedService,
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.article_subscription = this.recentlyUpdatedArticleService.getRecentlyUpdatedArticle().subscribe(
      (articles: ArticleObject[]) => this.articles = articles,
      error => this.routingService.routeToErrorPage(error)
    );
  }

  sidebarColor(articleType: string): string{
    return Constants.articleTypeSidebarColorMapping[articleType];
  }

  ngOnDestroy():void{
    this.article_subscription.unsubscribe();
  }

}
