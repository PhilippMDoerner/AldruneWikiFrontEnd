import { Component, HostListener, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ArticleMetaData, Constants } from 'src/app/app.constants';
import { OverviewItemObject } from 'src/app/models/overviewItem';
import { RecentlyUpdatedService } from 'src/app/services/recently-updated.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-recently-updated-articles-list',
  templateUrl: './recently-updated-articles-list.component.html',
  styleUrls: ['./recently-updated-articles-list.component.scss'],
})
export class RecentlyUpdatedArticlesListComponent implements OnInit {
  articles: OverviewItemObject[];
  @Input() campaign: string;

  constants: Constants = Constants;
  pageNumber: number = 0;
  isLoadingNextPage: boolean = false;
  hasLoadedAllArticles: boolean = false;

  constructor(
    private recentUpdatesServices: RecentlyUpdatedService,
    private routingService: RoutingService,
    private warnings: WarningsService
  ) {}

  ngOnInit(): void {
    this.recentUpdatesServices
      .getRecentlyUpdatedArticle(this.campaign, this.pageNumber)
      .pipe(first())
      .subscribe(
        (articles: OverviewItemObject[]) => (this.articles = articles),
        (error) => this.routingService.routeToErrorPage(error)
      );
  }

  getArticleTypeMetaData(article_type: string) {
    const allMetaData: ArticleMetaData[] = Constants.articleTypeMetaData;
    const metaData: ArticleMetaData[] = allMetaData.filter((metaDataEntry) =>
      metaDataEntry.article_types?.includes(article_type)
    );

    const hasArticleTypeCollision = metaData.length > 1;
    if (hasArticleTypeCollision) {
      throw `ArticleTypeCollisionException. The article type ${article_type} is being used multiple times. Please fix this`;
    }

    return metaData[0];
  }

  getArticleName(article: OverviewItemObject) {
    if (this.isDiaryEntry(article))
      return `#${article.session_details.session_number} - ${article.name}`;
    if (article.article_type === 'location') return article.name;

    return article.name_full;
  }

  isDiaryEntry(article: OverviewItemObject) {
    return article.article_type === 'diaryentry';
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    if (this.isNearPageEnd()) {
      this.loadNextPage();
    }
  }

  isNearPageEnd(): boolean {
    const totalPageHeight: number = document.documentElement.scrollHeight;
    const visiblePageHeight: number = document.documentElement.clientHeight;
    const maxScrollHeight: number = totalPageHeight - visiblePageHeight;

    const scrolledHeight: number = window.pageYOffset;
    const pixelDistanceToPageBottom: number = maxScrollHeight - scrolledHeight;

    return (
      pixelDistanceToPageBottom <
      Constants.maxDistanceToPageBottomForPaginationLoad
    );
  }

  loadNextPage(): void {
    if (
      this.isLoadingNextPage ||
      this.articles == null ||
      this.hasLoadedAllArticles
    )
      return;

    this.pageNumber += 1;
    this.isLoadingNextPage = true;

    this.recentUpdatesServices
      .getRecentlyUpdatedArticle(this.campaign, this.pageNumber)
      .pipe(first())
      .subscribe(
        (articles: OverviewItemObject[]) => {
          this.articles = this.articles.concat(articles);
          this.isLoadingNextPage = false;
          if (articles.length === 0) this.hasLoadedAllArticles = true;
        },
        (error) => this.warnings.showWarning(error)
      );
  }
}
