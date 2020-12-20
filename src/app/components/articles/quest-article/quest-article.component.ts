import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Quest, QuestObject } from 'src/app/models/quest';
import { QuestService } from 'src/app/services/quest.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-quest-article',
  templateUrl: './quest-article.component.html',
  styleUrls: ['./quest-article.component.scss']
})
export class QuestArticleComponent implements OnInit {
  constants: any = Constants;
  quest: Quest;
  articleType: string = 'quest';

  private parameter_subscription: Subscription;

  constructor(
    private questService: QuestService,
    private route: ActivatedRoute,
    private router: Router,
    private warnings: WarningsService
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const questName: string = params.name;
      this.questService.getQuest(questName).pipe(first()).subscribe(
        (quest: QuestObject) => this.quest = quest,
        error => Constants.routeToErrorPage(this.router, error)
      );
    })
  }

  onDescriptionUpdate(updatedDescription){
    const oldDescription = this.quest.description;
    this.quest.description = updatedDescription;
    this.questService.updateQuest(this.quest).pipe(first()).subscribe(
      (quest: QuestObject) => {},
      error =>{
        this.quest.description = oldDescription;
        this.warnings.showWarning(error);
      }
    );
  }

  deleteArticle(){
      this.questService.deleteQuest(this.quest.pk).pipe(first()).subscribe(response => {
        const questOverviewUrl: string = Constants.getRoutePath(this.router, 'quest-overview');
        this.router.navigateByUrl(questOverviewUrl);
      }, error => console.log(error));
  }

  ngOnDestroy(){
    if(this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
