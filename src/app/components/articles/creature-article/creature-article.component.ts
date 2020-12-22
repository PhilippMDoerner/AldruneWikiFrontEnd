import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Creature, CreatureObject } from 'src/app/models/creature';
import { CreatureService } from 'src/app/services/creature/creature.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-creature-article',
  templateUrl: './creature-article.component.html',
  styleUrls: ['./creature-article.component.scss']
})
export class CreatureArticleComponent implements OnInit {
  constants: any = Constants;
  articleType: string = "creature";
  creature: CreatureObject;

  parameter_subscription: Subscription;

  constructor(
    private creatureService: CreatureService,
    private route: ActivatedRoute,
    private warnings: WarningsService,  
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const creatureName: string = params.name;

      this.creatureService.getCreature(creatureName).pipe(first()).subscribe(
        (creature: CreatureObject) => this.creature = creature,
        error => this.routingService.routeToErrorPage(error)
      );
    });
  }

  onDescriptionUpdate(updatedDescription){
    const oldDescription = this.creature.description;
    this.creature.description = updatedDescription;

    this.creatureService.updateCreature(this.creature).pipe(first()).subscribe(
      (creature: CreatureObject) => {}, 
      error => {
        this.creature.description = oldDescription;
        this.warnings.showWarning(error);
      }
    );
  }

  deleteArticle(){
    this.creatureService.deleteCreature(this.creature.pk).pipe(first()).subscribe(
      response => this.routingService.routeToPath('creature-overview'), 
      error => this.warnings.showWarning(error)
    );
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
