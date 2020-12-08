import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Creature, CreatureObject } from 'src/app/models/creature';
import { CreatureService } from 'src/app/services/creature/creature.service';

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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const creature_name: string = this.route.snapshot.params.name;
      this.creatureService.getCreature(creature_name).pipe(first()).subscribe(creature => {
        this.creature = creature;
      }, error =>{ console.log(error)});
    })
  }

  onDescriptionUpdate(updatedDescription){
    const oldDescription = this.creature.description;
    this.creature.description = updatedDescription;
    this.creatureService.updateCreature(this.creature).pipe(first()).subscribe(creature => {
    }, error =>{
      this.creature.description = oldDescription;
      console.log(error);
    })
  }

  deleteArticle(){
    this.creatureService.deleteCreature(this.creature.pk).pipe(first()).subscribe(response => {
      const creatureOverviewUrl: string = Constants.getRoutePath(this.router, 'creature-overview');
      this.router.navigateByUrl(creatureOverviewUrl);
    }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
