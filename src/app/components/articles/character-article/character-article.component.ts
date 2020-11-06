import { Component, OnInit } from '@angular/core';
import { Character } from "src/app/models/character";
import { Image } from "src/app/models/image";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { CharacterService } from "src/app/services/character/character.service";
import { ImageUploadService } from "src/app/services/image/image-upload.service";
import { Subject, Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Constants } from "src/app/app.constants";
@Component({
  selector: 'app-character-article',
  templateUrl: './character-article.component.html',
  styleUrls: ['./character-article.component.scss']
})

export class CharacterArticleComponent implements OnInit {
  constants: any = Constants;
  character: Character;
  confirmationModal: Subject<void> = new Subject<void>();
  articleType: string = 'character';

  private parameter_subscription: Subscription;
  private character_subscription: Subscription;

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const character_name: string = params['name'];
      this.character_subscription = this.characterService.getCharacter(character_name).subscribe(character => {
        this.character = character;
      }, error =>{ this.router.navigateByUrl("error");});
    });

  }

  onDescriptionUpdate(updatedDescription){
    const oldDescription = this.character.description;
    this.character.description = updatedDescription;
    this.characterService.updateCharacter(this.character).subscribe(character => {
    }, error =>{
      this.character.description = oldDescription;
      console.log(error);
    })
  }

  deleteArticle(){
      this.characterService.deleteCharacter(this.character).subscribe(response => {
        this.router.navigateByUrl("character")
      }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
    if (this.character_subscription) this.character_subscription.unsubscribe();
  }
}
