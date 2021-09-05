import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { DiaryEntry } from 'src/app/models/diaryentry';
import { DiaryentryService } from 'src/app/services/diaryentry/diaryentry.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleMixin } from 'src/app/utils/functions/articleMixin';

@Component({
  selector: 'app-diaryentry-article',
  templateUrl: './diaryentry-article.component.html',
  styleUrls: ['./diaryentry-article.component.scss']
})
export class DiaryentryArticleComponent extends ArticleMixin {
  //ArticleMixin Variables
  articleData: DiaryEntry;
  nextDiaryentryUrl: string;
  priorDiaryentryUrl: string;
  deleteRoute = {routeName: 'diaryentry-overview', params: {campaign: this.campaign}};

  constructor(
    diaryEntryService: DiaryentryService,
    public route: ActivatedRoute,
    public warning: WarningsService,  
    public routingService: RoutingService,
    globalUrlParams: GlobalUrlParamsService,
  ) { 
    super(
      diaryEntryService,
      route,
      routingService,
      warning,
      globalUrlParams
    )
  }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const isMainSession: number = parseInt(params.isMainSession);
      const sessionNumber: number = parseInt(params.sessionNumber);
      const authorName: string = params.authorName;
      this.campaign = params.campaign;
  
      this.articleService.readByParam(this.campaign, {isMainSession, sessionNumber, authorName}).pipe(first()).subscribe(
        diaryEntry => {
          this.articleData = diaryEntry;

          const priorDiaryentryStub = this.articleData.adjacent_diaryentries.prior_diaryentry;
          this.priorDiaryentryUrl = this.createDiaryentryURL(priorDiaryentryStub);
          
          const nextDiaryentryStub = this.articleData.adjacent_diaryentries.next_diaryentry;
          this.nextDiaryentryUrl = this.createDiaryentryURL(nextDiaryentryStub);
        },
        error => this.routingService.routeToErrorPage(error)
      );
    });
  }

  onDescriptionUpdate(){
    throw "InvalidFunctionUseException. This functionality does not exist on diaryentry-article"
  }

  createDiaryentryURL(diaryentry_data:any): string{
    if (diaryentry_data == null) return "";

    const sessionNumber: number = diaryentry_data.session_details.session_number;
    const authorName: string = diaryentry_data.author_details.name;
    const isMainSession: number = diaryentry_data.session_details.is_main_session_int;

    return this.routingService.getRoutePath('diaryentry', {
      sessionNumber: sessionNumber,
      isMainSession: isMainSession,
      authorName: authorName,
      campaign: this.campaign
    });
  }
}
