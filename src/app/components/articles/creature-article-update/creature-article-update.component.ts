import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { Creature, CreatureObject } from 'src/app/models/creature';
import { CreatureService } from 'src/app/services/creature/creature.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';

@Component({
  selector: 'app-creature-article-update',
  templateUrl: './creature-article-update.component.html',
  styleUrls: ['./creature-article-update.component.scss']
})
export class CreatureArticleUpdateComponent implements OnInit {
  constants: any = Constants;
  formState: string;
  form = new FormGroup({});
  model: CreatureObject;
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name"}),
  ]

  private creature_subscription: Subscription;

  constructor(
    private formlyService: MyFormlyService,
    private creatureService: CreatureService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;

    if (this.formState === this.constants.updateState){
      const creature_name: string = this.route.snapshot.params.name;
      this.creature_subscription = this.creatureService.getCreature(creature_name).subscribe(creature => {
        this.model = creature;
      }, error => this.router.navigateByUrl("error"));
    } else if (this.formState === this.constants.createState) {
      this.model = new CreatureObject();
    }
  }

  onSubmit(model: any){
    const isFormInUpdateState : boolean = (this.formState === this.constants.updateState)
    const responseObservable : Observable<Creature> =  isFormInUpdateState ? this.creatureService.updateCreature(model) : this.creatureService.createCreature(model);

    responseObservable.subscribe(response => {
      console.log(response);
      this.router.navigateByUrl(`/creature/${model.name}`);
    }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.creature_subscription) this.creature_subscription.unsubscribe();
  }

}
