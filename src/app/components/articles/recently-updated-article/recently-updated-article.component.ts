import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { Article } from 'src/app/models/recentlyUpdatedArticle';
import { RecentlyUpdatedService } from 'src/app/services/recently-updated.service';

@Component({
  selector: 'app-recently-updated-article',
  templateUrl: './recently-updated-article.component.html',
  styleUrls: ['./recently-updated-article.component.scss']
})
export class RecentlyUpdatedArticleComponent implements OnInit {
  article_subscription: Subscription;
  articles: Article[];

  constructor(private recentlyUpdatedArticleService: RecentlyUpdatedService) { }

  ngOnInit(): void {
    this.article_subscription = this.recentlyUpdatedArticleService.getRecentlyUpdatedArticle().subscribe(articles => {
      this.articles = articles;
    })
  }

  sidebarColor(articleType: string): string{
    return Constants.articleTypeSidebarColorMapping[articleType];
  }

  ngOnDestroy():void{
    this.article_subscription.unsubscribe();
  }

}
