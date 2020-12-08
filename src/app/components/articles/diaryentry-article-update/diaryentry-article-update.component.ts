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

@Component({
  selector: 'app-diaryentry-article-update',
  templateUrl: './diaryentry-article-update.component.html',
  styleUrls: ['./diaryentry-article-update.component.scss']
})
export class DiaryentryArticleUpdateComponent implements OnInit {
  constants: any = Constants;
  formState: string;
  form = new FormGroup({});
  model: DiaryEntryObject;
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "title"}),
    this.formlyService.genericSelect({key: "author", labelProp: "name", optionsType: "users"}),
    this.formlyService.genericSelect({key: 'session', optionsType: 'session', wrappers: ["session-update-wrapper"]}),
  ];

  private parameter_subscription: Subscription;

  constructor(
    private formlyService: MyFormlyService,
    private diaryEntryService: DiaryentryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;

    this.parameter_subscription = this.route.params.subscribe(params => {
      if (this.formState === this.constants.updateState){
        const isMainSession: string = params.isMainSession;
        const sessionNumber: string = params.sessionNumber;
        const authorName: string = params.authorName;
  
        this.diaryEntryService.getDiaryEntry(isMainSession, sessionNumber, authorName).subscribe(diaryEntry => {
          this.model = diaryEntry;
        }, error => { 
          this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}/error`)
        });
      } else if (this.formState === this.constants.createState) {
        this.model = new DiaryEntryObject();
      }
    });
  }

  onSubmit(){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.diaryEntryService.updateDiaryEntry(this.model) : this.diaryEntryService.createDiaryEntry(this.model);

    responseObservable.pipe(first()).subscribe(response => {
      let diaryEntryUrl: string;
      if (isFormInUpdateState){
        diaryEntryUrl = Constants.getRoutePath(this.router, 'diaryentry', {
          sessionNumber: this.model.session_details.session_number,
          isMainSession: this.model.session_details.is_main_session_int,
          authorName: this.model.author_details.name
        });
      } else {
        diaryEntryUrl = Constants.getRoutePath(this.router, 'diaryentry-overview');
      }

      this.router.navigateByUrl(diaryEntryUrl);
    }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
