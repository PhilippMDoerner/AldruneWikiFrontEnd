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
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-creature-article-update',
  templateUrl: './creature-article-update.component.html',
  styleUrls: ['./creature-article-update.component.scss']
})
export class CreatureArticleUpdateComponent implements OnInit {
  constants: any = Constants;
  formState: string;

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
    private warnings: WarningsService
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? Constants.updateState : Constants.createState;

    this.parameter_subscription = this.route.params.subscribe(params => {
      if (this.formState === Constants.updateState){
        const creature_name: string = params.name;
        this.creatureService.getCreature(creature_name).pipe(first()).subscribe(
          (creature: CreatureObject) =>  this.model = creature, 
          error => Constants.routeToErrorPage(this.router, error)
        );

      } else if (this.formState === Constants.createState) {
        this.model = new CreatureObject();
      }
    })

  }

  onSubmit(){
    const isFormInUpdateState : boolean = (this.formState === Constants.updateState)
    const responseObservable : Observable<Creature> =  isFormInUpdateState ? this.creatureService.updateCreature(this.model) : this.creatureService.createCreature(this.model);

    responseObservable.pipe(first()).subscribe(
      (creature: CreatureObject) =>  Constants.routeToApiObject(this.router, creature),
      error => this.warnings.showWarning(error)
    );
  }

  onCancel(){
    const isFormInUpdateState : boolean = (this.formState === Constants.updateState)
    if (isFormInUpdateState){
      const creatureName: string = this.route.snapshot.params.name;
      Constants.routeToPath(this.router, 'creature', {name: creatureName});
    } else {
      Constants.routeToPath(this.router, 'creature-overview');
    } 
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }

}
