import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
//models and constants
import { Constants } from "src/app/app.constants";
import { Character, CharacterObject } from "src/app/models/character";
//services
import { CharacterService } from "src/app/services/character/character.service";
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-character-article-update',
  templateUrl: './character-article-update.component.html',
  styleUrls: ['./character-article-update.component.scss']
})

export class CharacterArticleUpdateComponent implements OnInit, OnDestroy {
  constants: any = Constants;
  formState: string;

  model: CharacterObject;
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericCheckbox({key: "player_character", label: "Player Character", defaultValue: false}),
    this.formlyService.genericCheckbox({key: "alive", defaultValue: true}),
    this.formlyService.genericInput({key: "name"}),
    this.formlyService.genericInput({key: "title", required: false}),
    this.formlyService.customStringSelect({key:"gender", label: "Sex", options: ["Other", "Female", "Male"]}),
    this.formlyService.genericInput({key: "race"}),
    this.formlyService.genericSelect({key: "organization", optionsType: "organization", required: false}),
    this.formlyService.genericSelect({key: "current_location", label: "Location", optionsType: "location", required: false}),
  ];

  private parameter_subscription: Subscription;

  constructor(
    private characterService: CharacterService,
    private formlyService: MyFormlyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;

    this.parameter_subscription = this.route.params.subscribe(params => {
      if (this.formState === this.constants.updateState){
        const character_name: string = params.name;
        this.characterService.getCharacter(character_name).pipe(first()).subscribe(
          (character: CharacterObject) => this.model = character, 
          error => Constants.routeToPath(this.router, 'error')
        )
      } else if (this.formState === Constants.createState) {
        this.model = new CharacterObject();
      }
    });

  }

  onSubmit(){
    const isFormInUpdateState: boolean = (this.formState === Constants.updateState);
    const responseObservable: Observable<Character> =  isFormInUpdateState ? this.characterService.updateCharacter(this.model) : this.characterService.createCharacter(this.model);

    responseObservable.pipe(first()).subscribe((character: CharacterObject) => {
      Constants.routeToApiObject(this.router, character);
    }, error => console.log(error));
  }

  onCancel(){
    const isFormInUpdateState : boolean = (this.formState === Constants.updateState)
    if (isFormInUpdateState){
      const characterName: string = this.route.snapshot.params.name;
      Constants.routeToPath(this.router, 'character', {name: characterName});
    } else {
      Constants.routeToPath(this.router, 'character-overview');
    } 
  }

  ngOnDestroy(): void{
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
