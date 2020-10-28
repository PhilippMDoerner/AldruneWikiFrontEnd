import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { DiaryEntry, EmptyFormDiaryEntry } from 'src/app/models/diaryentry';
import { Session } from 'src/app/models/session';
import { User } from 'src/app/models/user';
import { DiaryentryService } from 'src/app/services/diaryentry/diaryentry.service';
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
  model: DiaryEntry | EmptyFormDiaryEntry;
  fields: FormlyFieldConfig[] = [
    {
      key: "title",
      type: "input",
      templateOptions:{
        label: "Title"
      }
    },
    {
      key: "author",
      type: "select",
      templateOptions:{
        label: "Author",
        labelProp: "username",
        valueProp: "pk",
        options: this.userService.getUsers(),
      }
    },
    {
      key: "session",
      type: "select",
      templateOptions:{
        label: "Session",
        labelProp: "name",
        valueProp: "pk",
        options: this.sessionService.getSessions(),
      }
    }
  ];

  private diaryEntry_subscription: Subscription;
  private parameter_subscription: Subscription;

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private diaryEntryService: DiaryentryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;

    if (this.formState === this.constants.updateState){
      this.parameter_subscription = this.route.params.subscribe(params => {
        const isMainSession: string = params['isMainSession'];
        const sessionNumber: string = params['sessionNumber'];
        const authorName: string = params['authorName'];
  
        this.diaryEntry_subscription = this.diaryEntryService.getDiaryEntry(isMainSession, sessionNumber, authorName).subscribe(diaryEntry => {
          this.model = diaryEntry;
        }, error =>{ this.router.navigateByUrl("error");});
      });
    } else if (this.formState === this.constants.createState) {
      this.model = new EmptyFormDiaryEntry();
    }
  }

  onSubmit(model: DiaryEntry){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.diaryEntryService.updateDiaryEntry(model) : this.diaryEntryService.createDiaryEntry(model);

    responseObservable.subscribe(response => {
      console.log(response);
      this.router.navigateByUrl(`/diaryentry`);
    }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
    if (this.diaryEntry_subscription) this.diaryEntry_subscription.unsubscribe();
  }
}
