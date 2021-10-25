import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Creature, CreatureObject } from 'src/app/models/creature';
import { CampaignService } from 'src/app/services/campaign.service';
import { CreatureService } from 'src/app/services/creature/creature.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleFormMixin } from 'src/app/utils/functions/articleFormMixin';

@Component({
  selector: 'app-creature-article-update',
  templateUrl: './creature-article-update.component.html',
  styleUrls: ['./creature-article-update.component.scss']
})
export class CreatureArticleUpdateComponent extends ArticleFormMixin implements OnInit {
  //URLs
  updateCancelUrl: string;
  creationCancelUrl: string;

  //Defining ArticleFormMixin Properties
  serverModel: CreatureObject;
  userModel: Creature;
  userModelClass = CreatureObject;

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", isNameInput: true}),
  ]


  constructor(
    creatureService: CreatureService,
    router: Router,
    private formlyService: MyFormlyService,
    route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    public campaignService: CampaignService,
    globalUrlParams: GlobalUrlParamsService,
    tokenService: TokenService,
  ) {
    super(
      router, 
      routingService, 
      warnings, 
      creatureService, 
      campaignService,
      globalUrlParams,
      route,
      tokenService,
    );
  }

  updateRouterLinks(campaignName: string, userModel: CreatureObject, params: Params): void{
    this.updateCancelUrl = this.routingService.getRoutePath('creature', {name: userModel?.name, campaign: campaignName});
    this.creationCancelUrl = this.routingService.getRoutePath('creature-overview', {campaign: campaignName});
  }
}
