import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { Creature } from 'src/app/models/creature';
import { CreatureService } from 'src/app/services/creature/creature.service';

@Component({
  selector: 'app-creature-article',
  templateUrl: './creature-article.component.html',
  styleUrls: ['./creature-article.component.scss']
})
export class CreatureArticleComponent implements OnInit {
  constants: any = Constants;
  articleType: string = "creature";
  creature: Creature;

  creature_subscription: Subscription;

  constructor(
    private creatureService: CreatureService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const creature_name: string = this.route.snapshot.params.name;
    this.creature_subscription = this.creatureService.getCreature(creature_name).subscribe(character => {
      this.creature = character;
    }, error =>{ console.log(error)});
  }

  onDescriptionUpdate(updatedDescription){
    const oldDescription = this.creature.description;
    this.creature.description = updatedDescription;
    this.creatureService.updateCreature(this.creature).subscribe(creature => {
    }, error =>{
      this.creature.description = oldDescription;
      console.log(error);
    })
  }

  deleteArticle(){
    this.creatureService.deleteCreature(this.creature.pk).subscribe(response => {
      this.router.navigateByUrl("character")
    }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.creature_subscription) this.creature_subscription.unsubscribe();
  }
}
