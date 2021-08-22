import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Creature, CreatureObject } from 'src/app/models/creature';
import { CampaignService } from 'src/app/services/campaign.service';
import { CreatureService } from 'src/app/services/creature/creature.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleFormMixin } from 'src/app/utils/functions/articleFormMixin';

@Component({
  selector: 'app-creature-article-update',
  templateUrl: './creature-article-update.component.html',
  styleUrls: ['./creature-article-update.component.scss']
})
export class CreatureArticleUpdateComponent extends ArticleFormMixin implements OnInit {
  //Defining ArticleFormMixin Properties
  serverModel: CreatureObject;
  userModel: Creature;
  updateCancelRoute = {routeName: "creature", params: {name: null, campaign: this.campaign}};
  creationCancelRoute = {routeName: "creature-overview", params: {campaign: this.campaign}};

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", isNameInput: true}),
  ]

  private parameter_subscription: Subscription;

  constructor(
    creatureService: CreatureService,
    router: Router,
    private formlyService: MyFormlyService,
    route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    public campaignService: CampaignService,
  ) {
    super(
      router, 
      routingService, 
      warnings, 
      creatureService, 
      route
    );
  }
  //TODO: move ngoninit into articleformmixin
  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      if (this.isInUpdateState()){
        const creatureName: string = params.name;
        //Update Cancel Route Params
        this.updateCancelRoute.params.name = creatureName;

        this.fetchUserModel(creatureName);

      } else if (this.isInCreateState()) {
        this.createUserModel();
      }
    })

  }

  fetchUserModel(creatureName: string): void{
    this.articleService.readByParam(this.campaign, creatureName).pipe(first()).subscribe(
      (creature: CreatureObject) =>  this.userModel = creature, 
      error => this.routingService.routeToErrorPage(error)
    );
  }

  createUserModel(): void{
    this.campaignService.readByParam(this.campaign).pipe(first()).subscribe(
      (campaignData: {name: String, pk: number}) => {
        this.userModel = new CreatureObject();
        this.userModel.campaign = campaignData.pk;
      },
      error => this.warnings.showWarning(error)
    )
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }

}
