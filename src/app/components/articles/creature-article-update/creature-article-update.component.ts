import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Creature, CreatureObject } from 'src/app/models/creature';
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
  updateCancelRoute = {routeName: "creature", params: {name: null}};
  creationCancelRoute = {routeName: "creature-overview", params: {}};

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", isNameInput: true}),
  ]

  private parameter_subscription: Subscription;

  constructor(
    creatureService: CreatureService,
    router: Router,
    private formlyService: MyFormlyService,
    private route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
  ) {
    super(router, routingService, warnings, creatureService)
  }

  ngOnInit(): void {

    this.parameter_subscription = this.route.params.subscribe(params => {
      if (this.isInUpdateState()){
        const creatureName: string = params.name;
        this.campaign = params.campaign;

        //Update Cancel Route Params
        this.updateCancelRoute.params.name = creatureName;

        //Get Creature 
        this.articleService.readByParam(this.campaign, creatureName).pipe(first()).subscribe(
          (creature: CreatureObject) =>  this.userModel = creature, 
          error => this.routingService.routeToErrorPage(error)
        );

      } else if (this.isInCreateState()) {
        this.userModel = new CreatureObject();
      }
    })

  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }

}
