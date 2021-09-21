import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Session } from 'inspector';
import { first, map, tap } from 'rxjs/operators';
import { CampaignOverview } from 'src/app/models/campaign';
import { RuleObject } from 'src/app/models/rule';
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

  mainSessions: SessionObject[];
  sideSessions: SessionObject[];

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

  // onArticleLoadFinished(articles: any[]){
  //   const mainSessions: SessionObject[] = [];
  //   const sideSessions: SessionObject[] = [];

  //   articles.forEach((article: SessionObject) => {
  //     article.is_main_session ? mainSessions.push(article) : sideSessions.push(article);
  //   });
  // }

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
}
