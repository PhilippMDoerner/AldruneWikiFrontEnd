import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { EmptyFormQuest, Quest } from 'src/app/models/quest';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { OverviewService } from 'src/app/services/overview.service';
import { QuestService } from 'src/app/services/quest.service';
import { CharacterService } from 'src/app/services/character/character.service';

@Component({
  selector: 'app-quest-article-update',
  templateUrl: './quest-article-update.component.html',
  styleUrls: ['./quest-article-update.component.scss']
})
export class QuestArticleUpdateComponent implements OnInit {
  constants: any = Constants;

  private quest_subscription: Subscription;

  formState: string;

  form = new FormGroup({});
  model: Quest | EmptyFormQuest;
  fields: FormlyFieldConfig[] = [
    {
      key: "name",
      type: "input",
      templateOptions:{
        label: "Name",
        placeholder:"Quest Name"
      }
    },
    {
      key: "status",
      type: "select",
      templateOptions:{
        label: "Quest Status",
        labelProp: "label",
        valueProp: "value",
        options: this.questService.getQuestStates(),
      }
    },
    {
      key: "giver",
      type: "select",
      templateOptions:{
        label: "Quest Giver",
        labelProp: "name",
        valueProp: "pk",
        options: this.selectOptionService.getOverviewItems('character'),
      }
    },
    { //TODO: Replace this select with a typeahead or something that allows the select drop down as an OPTION to pre-select, but also to type in whatever you want
      key: "taker",
      type: "select",
      templateOptions:{
        label: "Quest Taker",
        labelProp: "name",
        valueProp: "name",
        options: this.questService.getQuestTakers(),
      }
    },
    {
      key: "start_session",
      type: "select",
      templateOptions:{
        label: "Start Session",
        labelProp: "name",
        valueProp: "pk",
        options: this.selectOptionService.getOverviewItems('session'),
      }
    },
    {
      key: "end_session",
      type: "select",
      templateOptions:{
        label: "End Session",
        labelProp: "name",
        valueProp: "pk",
        options: this.selectOptionService.getOverviewItems('session'),
      }
    },
    {
      key: "abstract",
      type: "input",
      templateOptions:{
        label: "Abstract",
        placeholder: "Quest Summary...",
        type: "string",
      }
    }
  ];

  constructor(
    private selectOptionService: OverviewService,
    private questService: QuestService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;
    const questName: string = this.route.snapshot.params.name;

    if (this.formState === this.constants.updateState){
      this.quest_subscription = this.questService.getQuest(questName).subscribe(item => {
        this.model = item;
      });
    } else if (this.formState === this.constants.createState) {
      this.model = new EmptyFormQuest();
    } 
  }

  onSubmit(model: Quest){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.questService.updateQuest(model) : this.questService.createQuest(model);

    responseObservable.subscribe(response => {
      console.log(response);
      this.router.navigateByUrl(`/quest/${model.name}`);
    }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.quest_subscription) this.quest_subscription.unsubscribe();
  }
}