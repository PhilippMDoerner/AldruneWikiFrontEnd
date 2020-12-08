import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
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

  private parameter_subscription: Subscription;

  constructor(
    private formlyService: MyFormlyService,
    private creatureService: CreatureService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;

    this.parameter_subscription = this.route.params.subscribe(params => {
      if (this.formState === this.constants.updateState){
        const creature_name: string = params.name;
        this.creatureService.getCreature(creature_name).pipe(first()).subscribe(creature => {
          this.model = creature;
        }, error => this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}/error`));

      } else if (this.formState === this.constants.createState) {
        this.model = new CreatureObject();
      }
    })

  }

  onSubmit(){
    const isFormInUpdateState : boolean = (this.formState === this.constants.updateState)
    const responseObservable : Observable<Creature> =  isFormInUpdateState ? this.creatureService.updateCreature(this.model) : this.creatureService.createCreature(this.model);

    responseObservable.pipe(first()).subscribe(response => {
      const creatureUrl: string = Constants.getRoutePath(this.router, 'creature', {name: this.model.name});
      this.router.navigateByUrl(creatureUrl);
    }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }

}
