import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { DiaryEntry } from 'src/app/models/diaryentry';
import { DiaryentryService } from 'src/app/services/diaryentry/diaryentry.service';

@Component({
  selector: 'app-diaryentry-article',
  templateUrl: './diaryentry-article.component.html',
  styleUrls: ['./diaryentry-article.component.scss']
})
export class DiaryentryArticleComponent implements OnInit {
  constants: any = Constants;
  diaryEntry: DiaryEntry;
  articleType: string = 'diaryEntry';

  private parameter_subscription: Subscription;

  constructor(
    private diaryEntryService: DiaryentryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const isMainSession: string = params.isMainSession;
      const sessionNumber: string = params.sessionNumber;
      const authorName: string = params.authorName;
  
      this.diaryEntryService.getDiaryEntry(isMainSession, sessionNumber, authorName).pipe(first()).subscribe(diaryEntry => {
        this.diaryEntry = diaryEntry;
      })
    }, error =>{ 
      this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}/error`)
    });
  }

  onDescriptionUpdate(updatedDescription){
    const oldDescription = this.diaryEntry.entry;
    this.diaryEntry.entry = updatedDescription;
    this.diaryEntryService.updateDiaryEntry(this.diaryEntry).pipe(first()).subscribe(diaryEntry => {
    }, error =>{
      this.diaryEntry.entry = oldDescription;
      console.log(error);
    })
  }

  deleteArticle(){
      this.diaryEntryService.deleteDiaryEntry(this.diaryEntry.pk).pipe(first()).subscribe(response => {
        const diaryentryOverviewUrl: string = Constants.getRoutePath(this.router, 'diaryentry-overview');
        this.router.navigateByUrl(diaryentryOverviewUrl);
      }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
