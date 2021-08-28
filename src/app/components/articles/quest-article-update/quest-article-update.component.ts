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
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'app-quest-article-update',
  templateUrl: './quest-article-update.component.html',
  styleUrls: ['./quest-article-update.component.scss']
})
export class QuestArticleUpdateComponent extends ArticleFormMixin implements OnInit {
  //Defining ArticleFormMixin Properties
  userModel: QuestObject;
  serverModel: Quest;
  userModelClass = QuestObject;

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

  constructor(
    private questService: QuestService,
    router: Router,
    route: ActivatedRoute,
    private formlyService: MyFormlyService,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    campaignService: CampaignService,
  ) { 
    super(
      router,
      routingService,
      warnings,
      questService,
      route,
      campaignService
    )
  }
}
