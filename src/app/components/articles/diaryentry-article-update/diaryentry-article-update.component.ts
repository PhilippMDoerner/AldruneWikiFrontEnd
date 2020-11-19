import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { DiaryEntry, DiaryEntryObject } from 'src/app/models/diaryentry';
import { Session } from 'src/app/models/session';
import { User } from 'src/app/models/user';
import { DiaryentryService } from 'src/app/services/diaryentry/diaryentry.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

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
    this.formlyService.genericSelect({key: 'session', optionsType: 'session'}),
  ];

  private diaryEntry_subscription: Subscription;

  constructor(
    private formlyService: MyFormlyService,
    private diaryEntryService: DiaryentryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;

    if (this.formState === this.constants.updateState){
      const isMainSession: string = this.route.snapshot.params.isMainSession;
      const sessionNumber: string = this.route.snapshot.params.sessionNumber;
      const authorName: string = this.route.snapshot.params.authorName;

      this.diaryEntry_subscription = this.diaryEntryService.getDiaryEntry(isMainSession, sessionNumber, authorName).subscribe(diaryEntry => {
        this.model = diaryEntry;
      }, error => { 
        this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}/error`)
      });
    } else if (this.formState === this.constants.createState) {
      this.model = new DiaryEntryObject();
    }
  }

  onSubmit(model: DiaryEntry){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.diaryEntryService.updateDiaryEntry(model) : this.diaryEntryService.createDiaryEntry(model);

    responseObservable.subscribe(response => {
      console.log(response);
      this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}/diaryentry`);
    }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.diaryEntry_subscription) this.diaryEntry_subscription.unsubscribe();
  }
}
