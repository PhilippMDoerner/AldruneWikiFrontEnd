import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Quest, QuestObject } from 'src/app/models/quest';
import { QuestService } from 'src/app/services/quest.service';
import { RoutingService } from 'src/app/services/routing.service';
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
    private warnings: WarningsService,  
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const questName: string = params.name;
      this.questService.readByParam(questName).pipe(first()).subscribe(
        (quest: QuestObject) => this.quest = quest,
        error => this.routingService.routeToErrorPage(error)
      );
    })
  }

  onDescriptionUpdate(updatedDescription){
    const oldDescription = this.quest.description;
    this.quest.description = updatedDescription;
    this.questService.update(this.quest.pk, this.quest).pipe(first()).subscribe(
      (quest: QuestObject) => {},
      error =>{
        this.quest.description = oldDescription;
        this.warnings.showWarning(error);
      }
    );
  }

  deleteArticle(){
      this.questService.delete(this.quest.pk).pipe(first()).subscribe(
        response => this.routingService.routeToPath('quest-overview'),
        error => this.warnings.showWarning(error)
      );
  }

  ngOnDestroy(){
    if(this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
