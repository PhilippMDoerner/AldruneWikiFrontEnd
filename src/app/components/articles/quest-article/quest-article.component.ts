import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { Quest } from 'src/app/models/quest';
import { QuestService } from 'src/app/services/quest.service';

@Component({
  selector: 'app-quest-article',
  templateUrl: './quest-article.component.html',
  styleUrls: ['./quest-article.component.scss']
})
export class QuestArticleComponent implements OnInit {
  constants: any = Constants;
  quest: Quest;
  articleType: string = 'quest';

  private quest_subscription: Subscription;

  constructor(
    private questService: QuestService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const questName: string = this.route.snapshot.params.name;
    this.quest_subscription = this.questService.getQuest(questName).subscribe(quest => {
      this.quest = quest;
    }, error => this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}/error`));
  }

  onDescriptionUpdate(updatedDescription){
    const oldDescription = this.quest.description;
    this.quest.description = updatedDescription;
    this.questService.updateQuest(this.quest).subscribe(organization => {
    }, error =>{
      this.quest.description = oldDescription;
      console.log(error);
    })
  }

  deleteArticle(){
      this.questService.deleteQuest(this.quest.pk).subscribe(response => {
        this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}/quest`);
      }, error => console.log(error));
  }

  ngOnDestroy(){
    if(this.quest_subscription) this.quest_subscription.unsubscribe();
  }
}
