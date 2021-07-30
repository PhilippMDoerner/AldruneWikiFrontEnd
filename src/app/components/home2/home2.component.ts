import { Component, HostBinding, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
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
  @HostBinding('flex-column') someField: boolean = true;
  searchString: string;
  constants = Constants;

  recentlyUpdatedArticles: Article[];

  constructor(
    private recentUpdatesServices: RecentlyUpdatedService,
    private routingService: RoutingService,
    private warnings: WarningsService
  ) { }

  ngOnInit(): void {
    this.recentUpdatesServices.getRecentlyUpdatedArticle().pipe(first()).subscribe(
      (articles: Article[]) => this.recentlyUpdatedArticles = articles,
      error => this.routingService.routeToErrorPage(error)
    );
  }

  sidebarColor(articleType: string): string{
    return Constants.articleTypeSidebarColorMapping[articleType];
  }

  search(): void{
    if (this.searchString != null){
      const cleaned_search = this.searchString.replace(/[^a-zA-Z0-9]/g,' ').trim();
      const cleaned_trimmed_search = cleaned_search.replace(/\s\s+/g, ' '); //Removes scenarios with more than 1 consecutive whitespace
  
      this.searchString = cleaned_trimmed_search;
    }

    const isInvalidSearchString = this.searchString == null || this.searchString === ""
    if (isInvalidSearchString) return; //TODO: Make this route to some kind of help page instead

    this.routingService.routeToPath('search', {searchString: this.searchString});
  }

  getOverviewImage(article: Article): string{
    const articleImageUrlStub = article.image_url;

    if (articleImageUrlStub == null) return this.constants.defaultImageUrl;

    const articleImageUrl = `${Constants.wikiUrl}/${articleImageUrlStub}`;
    return articleImageUrl;
  }
}
