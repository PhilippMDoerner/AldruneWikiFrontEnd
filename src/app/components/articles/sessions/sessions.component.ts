import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { first, map, tap } from 'rxjs/operators';
import { CampaignOverview } from 'src/app/models/campaign';
import { SessionObject } from 'src/app/models/session';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';
import { SessionService } from 'src/app/services/session.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleListMixin } from 'src/app/utils/functions/articleListMixin';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent extends ArticleListMixin implements OnInit, OnDestroy, AfterViewInit {
  //URLs
  homeUrl: string;

  articleModelClass = SessionObject;
  articleStarterTitle = "New Session";
  articlesSortProperty = "-session_date";

  @ViewChildren("sessionElements") articleElements: QueryList<any>;
  articlesInitialScrollParameter = "name";

  constructor(
    sessionService: SessionService,
    route: ActivatedRoute,
    routingService: RoutingService,
    warnings: WarningsService,
    globalUrlParams: GlobalUrlParamsService,
    tokenService: TokenService,
  ) { 
    super(
      sessionService,
      route,
      routingService,
      warnings,
      globalUrlParams,
      tokenService
    );
  }

  updateDynamicVariables(campaign: CampaignOverview, articles: any[], params: Params){
    this.homeUrl = this.routingService.getRoutePath('home2', {campaign: campaign.name});
  }

  async loadArticleData(campaign: CampaignOverview, params: Params): Promise<void>{
    const campaignName: string = campaign.name;
    if(campaignName == null) return;

    this.articleService.campaignDetailList(campaignName)
        .pipe(
            first(),
            tap((articles: SessionObject[]) => this.showArticleArray = articles.map(article => true)),
            map((articles: SessionObject[]) => {
                const isReverseSort: boolean = this.articlesSortProperty.startsWith("-");

                const articleSortProperty: string = isReverseSort ? this.articlesSortProperty.slice(1) : this.articlesSortProperty;
                
                const sortedArticles: SessionObject[] = articles.sort((article1, article2) => {
                    return article1[articleSortProperty] < article2[articleSortProperty] ? -1 : 1;
                });

                return isReverseSort ? sortedArticles.reverse() : sortedArticles;
            })
        )
        .subscribe(
            (articles: any[]) => {
                this.articles = articles;
                this.onArticleLoadFinished(articles);
            },
            error => this.routingService.routeToErrorPage(error)
        );
  }

  addArticle(): void{
    const newArticle: any = new SessionObject();
    newArticle.name = this.articleStarterTitle;

    const maxSessionNumber: number = Math.max.apply(Math, this.articles.map((session: any) => session.session_number));
    newArticle.session_number = maxSessionNumber + 1;

    const lastSession: any = this.articles[0];
    newArticle.session_date = this.getNextSessionDate(lastSession);

    this.articles.unshift(newArticle);
  }


  getNextSessionDate(lastSession: any): string{
    const lastSessionDate: Date = new Date(lastSession.session_date);
    const assumedThisSessionDate: Date = this.addDaysToDate(7, lastSessionDate);
    return this.dateToYYYMMDDString(assumedThisSessionDate);
  }

  addDaysToDate(days: number, oldDate: Date): Date{
    const daysInSeconds = days * 86400000;
    return new Date(oldDate.setTime( oldDate.getTime() + daysInSeconds));
  }

  dateToYYYMMDDString(date: Date){
    return date.toISOString().slice(0,10);
  }
}
