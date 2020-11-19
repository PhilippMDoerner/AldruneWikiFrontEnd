import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  private diaryEntry_subscription: Subscription;

  constructor(
    private diaryEntryService: DiaryentryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const isMainSession: string = this.route.snapshot.params.isMainSession;
    const sessionNumber: string = this.route.snapshot.params.sessionNumber;
    const authorName: string = this.route.snapshot.params.authorName;

    this.diaryEntry_subscription = this.diaryEntryService.getDiaryEntry(isMainSession, sessionNumber, authorName).subscribe(diaryEntry => {
      this.diaryEntry = diaryEntry;
    }, error =>{ 
      this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}/error`)
    });
  }

  onDescriptionUpdate(updatedDescription){
    const oldDescription = this.diaryEntry.entry;
    this.diaryEntry.entry = updatedDescription;
    this.diaryEntryService.updateDiaryEntry(this.diaryEntry).subscribe(diaryEntry => {
    }, error =>{
      this.diaryEntry.entry = oldDescription;
      console.log(error);
    })
  }

  deleteArticle(){
      this.diaryEntryService.deleteDiaryEntry(this.diaryEntry.pk).subscribe(response => {
        this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}/diaryentry`)
      }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.diaryEntry_subscription) this.diaryEntry_subscription.unsubscribe();
  }
}
