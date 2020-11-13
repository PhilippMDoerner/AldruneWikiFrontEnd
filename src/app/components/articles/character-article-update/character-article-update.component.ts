import { Component, OnInit } from '@angular/core';
import { Subject, Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
//models and constants
import { Constants } from "src/app/app.constants";
import { Character, EmptyFormCharacter } from "src/app/models/character";
//services
import { CharacterService } from "src/app/services/character/character.service";
import { MyFormlyService } from 'src/app/services/my-formly.service';

@Component({
  selector: 'app-character-article-update',
  templateUrl: './character-article-update.component.html',
  styleUrls: ['./character-article-update.component.scss']
})

export class CharacterArticleUpdateComponent implements OnInit {
  constants: any = Constants;
  formState: string;
  form = new FormGroup({});
  model: Character | EmptyFormCharacter;
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericCheckbox({key: "player_character", label: "Player Character", defaultValue: false}),
    this.formlyService.genericCheckbox({key: "alive", defaultValue: true}),
    this.formlyService.genericInput({key: "name"}),
    this.formlyService.genericInput({key: "title"}),
    this.formlyService.customStringSelect({key:"gender", label: "Sex", options: ["Other", "Female", "Male"]}),
    this.formlyService.genericInput({key: "race"}),
    this.formlyService.genericSelect({key: "organization", optionsType: "organization"}),
    this.formlyService.genericSelect({key: "current_location", label: "Location", optionsType: "location"}),
  ];

  private character_subscription: Subscription;

  constructor(
    private characterService: CharacterService,
    private formlyService: MyFormlyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;

    if (this.formState === this.constants.updateState){
      const character_name: string = this.route.snapshot.params.name;
      this.character_subscription = this.characterService.getCharacter(character_name).subscribe(character => {
        this.model = character;
      }, error => this.router.navigateByUrl("error"));
    } else if (this.formState === this.constants.createState) {
      this.model = new EmptyFormCharacter();
    }
  }

  onSubmit(model: any){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState)
    const responseObservable: Observable<Character> =  isFormInUpdateState ? this.characterService.updateCharacter(model) : this.characterService.createCharacter(model);

    responseObservable.subscribe(response => {
      console.log(response);
      this.router.navigateByUrl(`/character/${model.name}`);
    }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.character_subscription) this.character_subscription.unsubscribe();
  }
}
