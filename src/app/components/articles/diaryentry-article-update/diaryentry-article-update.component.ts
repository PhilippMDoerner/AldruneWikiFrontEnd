import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { DiaryEntryObject } from 'src/app/models/diaryentry';
import { DiaryentryService } from 'src/app/services/diaryentry/diaryentry.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleFormMixin } from 'src/app/utils/functions/articleFormMixin';

@Component({
  selector: 'app-diaryentry-article-update',
  templateUrl: './diaryentry-article-update.component.html',
  styleUrls: ['./diaryentry-article-update.component.scss']
})
export class DiaryentryArticleUpdateComponent extends ArticleFormMixin implements OnInit {
  //Defining ArticleFormMixin Properties
  serverModel: DiaryEntryObject;
  userModel: DiaryEntryObject;
  updateCancelRoute = {routeName: "diaryentry", params: {
    sessionNumber: null, isMainSession: null, authorName: null
  }};
  creationCancelRoute = {routeName: "diaryentry-overview", params: {}};
  
  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "title", isNameInput: true}),
    this.formlyService.genericSelect({key: "author", labelProp: "name", optionsType: "users"}),
    this.formlyService.genericSelect({key: 'session', optionsType: 'session', wrappers: ["session-update-wrapper"]}),
  ];

  //Custom Properties
  private parameter_subscription: Subscription;

  constructor(
    private formlyService: MyFormlyService,
    diaryEntryService: DiaryentryService,
    router: Router,
    private route: ActivatedRoute,
    warnings: WarningsService,  
    public routingService: RoutingService
  ) { 
    super(
      router,
      routingService,
      warnings,
      diaryEntryService
    )
  }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      if (this.isInUpdateState() || this.isInOutdatedUpdateState()){
        const isMainSession: string = params.isMainSession;
        const sessionNumber: string = params.sessionNumber;
        const authorName: string = params.authorName;

        //Update Cancel Route Params
        this.updateCancelRoute.params.authorName = authorName;
        this.updateCancelRoute.params.sessionNumber = sessionNumber;
        this.updateCancelRoute.params.isMainSession = isMainSession;
  
        //Get DiaryEntry
        this.articleService.readByParam({isMainSession, sessionNumber, authorName}).subscribe(
          (diaryEntry: DiaryEntryObject) => this.userModel = diaryEntry, 
          error => this.routingService.routeToErrorPage(error)
        );

      } else if (this.isInCreateState()) {
        this.userModel = new DiaryEntryObject();
      }
    });
  }

  /**
   * @description Overwrites onCreationSuccess on ArticleFormMixin. Routes the user after creation to the diaryentry-article
   * in display-state "encounter", so that they can immediately create encounters
   * @param {DiaryEntryObject} diaryEntry 
   */
  onCreationSuccess(diaryEntry: DiaryEntryObject){
    this.routingService.routeToPath('diaryentry2', {
      sessionNumber: diaryEntry.session_details.session_number,
      isMainSession: diaryEntry.session_details.is_main_session_int,
      authorName: diaryEntry.author_details.name,
      displayMode: "encounter"
    });
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
