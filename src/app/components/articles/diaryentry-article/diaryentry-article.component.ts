import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { DiaryEntry } from 'src/app/models/diaryentry';
import { DiaryentryService } from 'src/app/services/diaryentry/diaryentry.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-diaryentry-article',
  templateUrl: './diaryentry-article.component.html',
  styleUrls: ['./diaryentry-article.component.scss']
})
export class DiaryentryArticleComponent implements OnInit {
  constants: any = Constants;
  diaryEntry: DiaryEntry;
  articleType: string = 'diaryEntry';

  coAuthors: string;

  private parameter_subscription: Subscription;

  constructor(
    private diaryEntryService: DiaryentryService,
    private route: ActivatedRoute,
    private warning: WarningsService,  
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const isMainSession: number = parseInt(params.isMainSession);
      const sessionNumber: number = parseInt(params.sessionNumber);
      const authorName: string = params.authorName;
  
      this.diaryEntryService.readByParam({isMainSession, sessionNumber, authorName}).pipe(first()).subscribe(
        diaryEntry => {
          this.diaryEntry = diaryEntry;
          this.coAuthors = this.getCoAuthorString();
        },
        error => this.routingService.routeToErrorPage(error)
      );
    });
  }

  getCoAuthorString(): string{
    let authorString: string = "";
    for(const encounter of this.diaryEntry.encounters){
      const isEncounterInCreateState = encounter.pk == null;
      if (isEncounterInCreateState) continue;
      
      const authorName = encounter.author_details.name;
      if(!authorString.includes(authorName) && !this.diaryEntry.author_details.name.includes(authorName) ){
        authorString += ` ${authorName},`;
      }
    }
    authorString = authorString.slice(0, authorString.length - 1);
    return authorString;
  }

  deleteDiaryEntry(): void{
    this.diaryEntryService.delete(this.diaryEntry.pk).pipe(first()).subscribe(
      (response) => this.routingService.routeToPath('diaryentry-overview'),
      error => this.warning.showWarning(error)
    );
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
