import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { Observable, Subscription } from 'rxjs';
import { DiaryEntryObject } from 'src/app/models/diaryentry';
import { OverviewItemObject } from 'src/app/models/overviewItem';
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

  sessionAlreadyHasAuthorWarning: string = `The author you selected already has a diaryentry in the session you selected. You 
  can't have 2 diaryentries from the same author in the same session. Consider writing 
  your diaryentry as an encounter instead into the diaryentry at the spot you just considered.`
  
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
        this.formlyService.genericSelect({key: "author", labelProp: "name", optionsType: "users"}),
        //Session
        this.formlyService.genericDisableSelect({
          key: 'session', 
          optionsType: 'session', 
          disabledExpression: this.hasDiaryentryForAuthor, 
          tooltipMessage: "Sessions may be impossible to select if the selected author already has a diaryentry for that session.",
          warningMessage: this.sessionAlreadyHasAuthorWarning
        }),
      ]
    },
    
    //this.formlyService.genericSelect({key: 'session', optionsType: 'session', wrappers: ["session-update-wrapper"]}),

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
   * Callback for the session select field. Enables/Disables a select option based on if the
   * currently selected author already has a diaryentry for this session or not.
   */
  hasDiaryentryForAuthor(
    selectOption: OverviewItemObject, 
    templateOptions: FormlyTemplateOptions,
    model: any,
    formControl: AbstractControl
  ): boolean{

    const diaryentryAuthorPksForSession: number[] = selectOption.author_ids;
    const currentlySelectedAuthor: number = model.author;
    return diaryentryAuthorPksForSession.includes(currentlySelectedAuthor);
  }

  async isValidSessionField(control: any){
    console.log("Is valid session field control");
    console.log(control);
    return null;
    const { author: selectedAuthorId, session: selectedSessionId} = control.value;
    const selectFieldOptionsObservable: Observable<any> = control.controls.session._fields[1].templateOptions.options;
    const selectFieldOptions: any = await selectFieldOptionsObservable.toPromise();

    const selectedOption = selectFieldOptions.find(option => option.pk === selectedSessionId)

    if (selectedOption == null) throw "WeirdError. You selected a session, its id got into the model and somehow that field is no longer among the options (?)";

    const authorIdsWithDiaryentriesOnSession: number[] = selectedOption.author_ids;
    const selectedAuthorAlreadyHasDiaryentryOnSession: boolean = authorIdsWithDiaryentriesOnSession.includes(selectedAuthorId);
    const isRespectingUniqueness = !selectedAuthorAlreadyHasDiaryentryOnSession
    return isRespectingUniqueness;
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
