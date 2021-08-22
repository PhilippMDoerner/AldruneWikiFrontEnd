import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuestObject, Quest } from 'src/app/models/quest';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { QuestService } from 'src/app/services/quest.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { first } from 'rxjs/operators';
import { WarningsService } from 'src/app/services/warnings.service';
import { RoutingService } from 'src/app/services/routing.service';
import { ArticleFormMixin } from 'src/app/utils/functions/articleFormMixin';
import { OverviewType } from 'src/app/app.constants';

@Component({
  selector: 'app-quest-article-update',
  templateUrl: './quest-article-update.component.html',
  styleUrls: ['./quest-article-update.component.scss']
})
export class QuestArticleUpdateComponent extends ArticleFormMixin implements OnInit {
  //Defining ArticleFormMixin Properties
  userModel: QuestObject;
  serverModel: Quest;
  updateCancelRoute = {routeName: "quest", params: {name: null, campaign: this.campaign}};
  creationCancelRoute = {routeName: "quest-overview", params: {campaign: this.campaign}};

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", placeholder: "Quest Name", isNameInput: true}),
    {
      key: "status",
      type: "select",
      templateOptions:{
        label: "Quest Status",
        labelProp: "label",
        valueProp: "value",
        options: this.questService.getQuestStates(),
        required: true,
      }
    },
    this.formlyService.genericSelect({key: "giver", label: "Quest Giver", overviewType: OverviewType.Character, campaign: this.campaign}),
    { 
      key: "taker",
      type: "select",
      templateOptions:{
        label: "Quest Taker",
        labelProp: "name",
        valueProp: "pk",
        options: this.questService.getQuestTakers(this.campaign),
      }
    },
    this.formlyService.genericSelect({key: "start_session", label: "Start Session", overviewType: OverviewType.Session, campaign: this.campaign}),
    this.formlyService.genericSelect({key: "end_session", label: "End Session", overviewType: OverviewType.Session, campaign: this.campaign, required: false}),
    this.formlyService.genericInput({key: "abstract", placeholder: "Quest Summary...", required: false, maxLength: 65})
  ];

  //Custom Properties
  private parameter_subscription: Subscription;

  constructor(
    private questService: QuestService,
    router: Router,
    route: ActivatedRoute,
    private formlyService: MyFormlyService,
    public warnings: WarningsService,  
    public routingService: RoutingService,
  ) { 
    super(
      router,
      routingService,
      warnings,
      questService,
      route
    )
  }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const questName: string = params.name;
      this.campaign = params.campaign;

      //Update Cancel Route Param
      this.updateCancelRoute.params.name = questName;

      //Get Quest
      if (this.isInUpdateState()){
        this.articleService.readByParam(this.campaign, questName).pipe(first()).subscribe(
          (quest: QuestObject) => this.userModel = quest,
          error => this.routingService.routeToErrorPage(error)
        );
        
      } else if (this.isInCreateState()) {
        this.userModel = new QuestObject();
      } 
    })
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
