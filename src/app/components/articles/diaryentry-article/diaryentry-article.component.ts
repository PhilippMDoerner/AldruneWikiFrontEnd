import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'inspector';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { DiaryEntry, DiaryEntryObject } from 'src/app/models/diaryentry';
import { Encounter, EncounterObject } from 'src/app/models/encounter';
import { SessionObject } from 'src/app/models/session';
import { DiaryentryService } from 'src/app/services/diaryentry/diaryentry.service';
import { EncounterServiceService } from 'src/app/services/encounter/encounter-service.service';
import { RoutingService } from 'src/app/services/routing.service';
import { SessionService } from 'src/app/services/session.service';
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

  private parameter_subscription: Subscription;

  constructor(
    private diaryEntryService: DiaryentryService,
    private encounterService: EncounterServiceService, //TODO: Remove after testing
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private warning: WarningsService,  
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const isMainSession: number = parseInt(params.isMainSession);
      const sessionNumber: number = parseInt(params.sessionNumber);
      const authorName: string = params.authorName;
  
      this.diaryEntryService.getDiaryEntry(isMainSession, sessionNumber, authorName).pipe(first()).subscribe(
        diaryEntry => {this.diaryEntry = diaryEntry; console.log(diaryEntry)},
        error => this.routingService.routeToErrorPage(error)
      );
    });
  }

  getAuthorString(): string{
    let authorString: string = "";
    for(const encounter of this.diaryEntry.encounters){
      const isEncounterInCreateState = encounter.pk == null;
      if (isEncounterInCreateState) continue;
      
      const authorName = encounter.author_details.name;
      if(!authorString.includes(authorName)){
        authorString += ` ${authorName},`;
      }
    }
    authorString = authorString.slice(0, authorString.length - 1);
    return authorString;
  }

  //TODO: Doublecheck this
  deleteDiaryEntry(): void{
    this.diaryEntryService.deleteDiaryEntry(this.diaryEntry.pk).pipe(first()).subscribe(
      (response) => this.routingService.routeToPath('diaryentry-overview'),
      error => console.log(error)//TODO: Replace this with "Warning";
    )
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
