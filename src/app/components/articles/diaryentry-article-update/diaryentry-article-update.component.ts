import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { DiaryEntry, DiaryEntryObject } from 'src/app/models/diaryentry';
import { DiaryentryService } from 'src/app/services/diaryentry/diaryentry.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-diaryentry-article-update',
  templateUrl: './diaryentry-article-update.component.html',
  styleUrls: ['./diaryentry-article-update.component.scss']
})
export class DiaryentryArticleUpdateComponent implements OnInit {
  constants: any = Constants;
  formState: string;

  model: DiaryEntryObject;
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "title", isNameInput: true}),
    this.formlyService.genericSelect({key: "author", labelProp: "name", optionsType: "users"}),
    this.formlyService.genericSelect({key: 'session', optionsType: 'session', wrappers: ["session-update-wrapper"]}),
  ];

  private parameter_subscription: Subscription;

  constructor(
    private formlyService: MyFormlyService,
    private diaryEntryService: DiaryentryService,
    private router: Router,
    private route: ActivatedRoute,
    private warnings: WarningsService,  
    public routingService: RoutingService
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;

    this.parameter_subscription = this.route.params.subscribe(params => {
      if (this.formState === this.constants.updateState){
        const isMainSession: string = params.isMainSession;
        const sessionNumber: string = params.sessionNumber;
        const authorName: string = params.authorName;
  
        this.diaryEntryService.readByParam({isMainSession, sessionNumber, authorName}).subscribe(
          (diaryEntry: DiaryEntryObject) => this.model = diaryEntry, 
          error => this.routingService.routeToErrorPage(error)
        );

      } else if (this.formState === Constants.createState) {
        this.model = new DiaryEntryObject();
      }
    });
  }

  onSubmit(){
    const isFormInUpdateState: boolean = (this.formState === Constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.diaryEntryService.update(this.model.pk, this.model) : this.diaryEntryService.create(this.model);

    responseObservable.pipe(first()).subscribe(
      (diaryEntry: DiaryEntryObject) => {
        this.routingService.routeToPath('diaryentry2', {
          sessionNumber: diaryEntry.session_details.session_number,
          isMainSession: diaryEntry.session_details.is_main_session_int,
          authorName: diaryEntry.author_details.name,
          displayMode: "encounter"
        });
      },
      error => this.warnings.showWarning(error)
    );
  }

  onCancel(){
    const isFormInUpdateState : boolean = (this.formState === Constants.updateState)
    if (isFormInUpdateState){
      const params = this.route.snapshot.params;
      this.routingService.routeToPath('diaryentry', {
        sessionNumber: params.sessionNumber,
        isMainSession: params.isMainSession,
        authorName: params.authorName,
      });
    } else {
      this.routingService.routeToPath('diaryentry-overview');
    }
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
