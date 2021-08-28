import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { OverviewType } from 'src/app/app.constants';
import { DiaryEntryObject } from 'src/app/models/diaryentry';
import { OverviewItemObject } from 'src/app/models/overviewItem';
import { CampaignService } from 'src/app/services/campaign.service';
import { DiaryentryService } from 'src/app/services/diaryentry/diaryentry.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleFormMixin } from 'src/app/utils/functions/articleFormMixin';
import { sessionAlreadyHasAuthor } from 'src/app/utils/functions/formly-validation'

@Component({
  selector: 'app-diaryentry-article-update',
  templateUrl: './diaryentry-article-update.component.html',
  styleUrls: ['./diaryentry-article-update.component.scss']
})
export class DiaryentryArticleUpdateComponent extends ArticleFormMixin implements OnInit {
  //Defining ArticleFormMixin Properties
  serverModel: DiaryEntryObject;
  userModel: DiaryEntryObject;
  userModelClass = DiaryEntryObject;

  updateCancelRoute = {routeName: "diaryentry", params: {
    sessionNumber: null, isMainSession: null, authorName: null, campaign: this.campaign
  }};
  creationCancelRoute = {routeName: "diaryentry-overview", params: {campaign: this.campaign}};
  
  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "title", isNameInput: true}),
    /**
     * This is overly complicated. The async validator out here is ONLY there to enable/disable the
     * submit button if these two fields don't conform to a specific thing. Dis/Enabling individual
     * options is done by the "disabledExpression" function. This is also true for the showing/hiding
     * of the error message.
     */
    {
      asyncValidators:{
        validation: [
          { name: "sessionAuthorPairUnique", options: {errorPath: "session"}},
        ]
      },
      fieldGroup: [
        //Author
        this.formlyService.genericSelect({key: "author", labelProp: "username", overviewType: OverviewType.User, campaign: this.campaign}),
        //Session
        this.formlyService.genericDisableSelect({
          key: 'session', 
          overviewType: OverviewType.Session,
          campaign: this.campaign, 
          disabledExpression: this.hasDiaryentryForAuthor, 
          tooltipMessage: "Sessions may be impossible to select if the selected author already has a diaryentry for that session.",
          warningMessage: sessionAlreadyHasAuthor.message,
          wrappers: ["session-update-wrapper"],
          showWrapperLabel: false
        }),
      ]
    },
  ];

  //Custom Properties

  constructor(
    private formlyService: MyFormlyService,
    diaryEntryService: DiaryentryService,
    router: Router,
    route: ActivatedRoute,
    warnings: WarningsService,  
    public routingService: RoutingService,
    campaignService: CampaignService
  ) { 
    super(
      router,
      routingService,
      warnings,
      diaryEntryService,
      route,
      campaignService
    )
  }

  getQueryParameters(params: Params): object{
    const isMainSession: string = params.isMainSession;
    const authorName: string = params.authorName;
    const sessionNumber: string = params.sessionNumber;

    return {isMainSession, authorName, sessionNumber}
  }

  fetchUserModel(queryParameters: any): void{
    this.articleService.readByParam(this.campaign, queryParameters).subscribe(
      (diaryEntry: DiaryEntryObject) => this.userModel = diaryEntry, 
      error => this.routingService.routeToErrorPage(error)
    );
  }

  /**
   * @description Checks whether a given select option should be disabled for selecting or not. Disables select options
   * dependant on the previously selected author. If the database already contains a diaryentry for that author for that session,
   * the session option is disabled. 
   * Allows an option if it is an initial value, aka the value from the database AND when the session value hasn't been changed yet.
   * This runs once for every author-session combination
   * 
   * BUG: If you edit Diaryentry for session 48, select a different session, you can no longer "re-select" session 48. 
   * This is something that needs to be fixed in the way you check with "hasDiaryentryForAuthor"
   * 
   * If you wish to manipulate this validation, you also have to manipulate in diaryentry-article-update "hasDiaryentryForAuthor".
   * This function only handles enabling/disabling select options. Enabling/Disabling the submit button is done via validator
   */
  hasDiaryentryForAuthor(
    selectOption: OverviewItemObject, 
    templateOptions: FormlyTemplateOptions,
    model: any,
    formControl: AbstractControl
  ): boolean{
    const diaryentryAuthorPksForSession: number[] = selectOption.author_ids;
    const currentlySelectedAuthor: number = model.author;

    const valueHasntChanged = formControl.pristine;
    const selectOptionIsCurrentlySelectedValue: boolean = model.session === selectOption.pk;
    const isInitialValue: boolean = valueHasntChanged && selectOptionIsCurrentlySelectedValue;

    const userSelectedInvalidAuthorSessionCombo: boolean = !isInitialValue && diaryentryAuthorPksForSession.includes(currentlySelectedAuthor) 
    
    return userSelectedInvalidAuthorSessionCombo;
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
      campaign: this.campaign,
      displayMode: "encounter"
    });
  }
}
