import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { OverviewItem } from 'src/app/models/overviewItem';
import { Article, OverviewArticleObject } from 'src/app/models/recentlyUpdatedArticle';
import { RecentlyUpdatedService } from 'src/app/services/recently-updated.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss'],
})
export class Home2Component implements OnInit {
  @ViewChild("search") searchField: ElementRef;

  searchString: string;
  constants = Constants;

  recentlyUpdatedArticles: OverviewItem[];

  constructor(
    private recentUpdatesServices: RecentlyUpdatedService,
    private routingService: RoutingService,
    private warnings: WarningsService
  ) { }

  ngOnInit(): void {
    this.recentUpdatesServices.getRecentlyUpdatedArticle().pipe(first()).subscribe(
      (articles: OverviewItem[]) => this.recentlyUpdatedArticles = articles,
      error => this.routingService.routeToErrorPage(error)
    );
  }

  sidebarColor(articleType: string): string{
    return Constants.articleTypeSidebarColorMapping[articleType];
  }

  startSearch(): void{
    if (this.searchString != null){
      const cleaned_search = this.searchString.replace(/[^a-zA-Z0-9]/g,' ').trim();
      const cleaned_trimmed_search = cleaned_search.replace(/\s\s+/g, ' '); //Removes scenarios with more than 1 consecutive whitespace
  
      this.searchString = cleaned_trimmed_search;
    }

    const isInvalidSearchString = this.searchString == null || this.searchString === ""
    if (isInvalidSearchString) return; //TODO: Make this route to some kind of help page instead

    this.routingService.routeToPath('search', {searchString: this.searchString});
  }

  getArticleTypeMetaData(article_type: string){
    const allMetaData: any = this.constants.articleTypeMetaData;
    const metaData = allMetaData.filter(
      metaDataEntry => metaDataEntry.article_types?.includes(article_type)
    );

    const hasArticleTypeCollision = metaData.length > 1;
    if (hasArticleTypeCollision) throw `ArticleTypeCollisionException. The article type ${article_type}
    is being used multiple times. Please fix this`;

    return metaData[0];
  }

  getArticleName(article: OverviewItem){
    return this.isDiaryEntry(article) ? `#${article.session_details.session_number} - ${article.name}` : article.name_full;
  }

  isDiaryEntry(article: OverviewItem){
    return article.article_type === "diaryentry";
  }

  /** Necessary to still allow selecting the search field on this page. Else the "preventDefault" bit on the touch events blocks that */
  focusSearchField(){
    this.searchField.nativeElement.click();
    this.searchField.nativeElement.focus();
  }
}
