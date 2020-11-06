import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { Article } from 'src/app/models/recentlyUpdatedArticle';
import { RecentlyUpdatedService } from 'src/app/services/recently-updated.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  articles: Article[];

  parameter_subscription: Subscription;
  article_subscription: Subscription;

  constructor(
    private articleService: RecentlyUpdatedService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const searchString: string = params['searchString'];
      this.article_subscription = this.articleService.getSearchedArticles(searchString).subscribe(articles => {
        this.articles = articles;
      })
    })
  }

  sidebarColor(articleType: string): string{
    return Constants.articleTypeSidebarColorMapping[articleType];
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
    if (this.article_subscription) this.article_subscription.unsubscribe();
  }

}
