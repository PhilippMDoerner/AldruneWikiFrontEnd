import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { QuestObject, Quest } from 'src/app/models/quest';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { QuestService } from 'src/app/services/quest.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { first } from 'rxjs/operators';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-quest-article-update',
  templateUrl: './quest-article-update.component.html',
  styleUrls: ['./quest-article-update.component.scss']
})
export class QuestArticleUpdateComponent implements OnInit {
  constants: any = Constants;

  private parameter_subscription: Subscription;

  formState: string;

  form = new FormGroup({});
  model: QuestObject;
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", placeholder: "Quest Name"}),
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
    this.formlyService.genericSelect({key: "giver", label: "Quest Giver", optionsType: "character"}),
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
    this.formlyService.genericSelect({key: "start_session", label: "Start Session", optionsType: "session"}),
    this.formlyService.genericSelect({key: "end_session", label: "End Session", optionsType: "session", required: false}),
    this.formlyService.genericInput({key: "abstract", placeholder: "Quest Summary...", required: false})
  ];

  constructor(
    private questService: QuestService,
    private router: Router,
    private route: ActivatedRoute,
    private formlyService: MyFormlyService,
    private warnings: WarningsService,
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;

    this.parameter_subscription = this.route.params.subscribe(params => {
      const questName: string = params.name;

      if (this.formState === this.constants.updateState){
        this.questService.getQuest(questName).pipe(first()).subscribe(
          (quest: QuestObject) => this.model = quest,
          error => Constants.routeToErrorPage(this.router, error)
        );
        
      } else if (this.formState === this.constants.createState) {
        this.model = new QuestObject();
      } 
    })
  }

  onSubmit(){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: Observable<QuestObject> =  isFormInUpdateState ? this.questService.updateQuest(this.model) : this.questService.createQuest(this.model);

    responseObservable.pipe(first()).subscribe(
      (quest: QuestObject) => Constants.routeToApiObject(this.router, quest), 
      error => this.warnings.showWarning(error)
    );
  }

  onCancel(){
    const isFormInUpdateState : boolean = (this.formState === Constants.updateState)
    if (isFormInUpdateState){
      const questName: string = this.route.snapshot.params.name;
      Constants.routeToPath(this.router, 'quest', {name: questName});
    } else {
      Constants.routeToPath(this.router, 'quest-overview');
    } 
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
