import { Component, OnInit } from '@angular/core';
import { Character } from "src/app/models/character";
import { Image } from "src/app/models/image";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { CharacterService } from "src/app/services/character/character.service";
import { ImageUploadService } from "src/app/services/image/image-upload.service";
import { Subject, Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-character-article',
  templateUrl: './character-article.component.html',
  styleUrls: ['./character-article.component.scss']
})
export class CharacterArticleComponent implements OnInit {
  character: Character;
  characterObs: Observable<Character>;
  isArticleDeleteState: boolean = false;
  confirmationModal: Subject<void> = new Subject<void>();
  articleType: string = 'character'

  private parameter_subscription: any;

  constructor(
    private modalService: NgbModal,
    private characterService: CharacterService,
    private imageService: ImageUploadService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const character_name: string = params['name'];
      this.characterObs = this.characterService.getCharacter(character_name)
    });
  }


  onDescriptionUpdate(updatedDescriptionText){
    this.character.description = updatedDescriptionText;
  }

  addItem(){
    console.log("Summon a create item form!");
  }

  addEncounter(){
    console.log("Summon a create Encounter form!");
  }

  onEncounterUpdate({updatedText, encounterIndex}){
    console.log("Sending updated Encounter to Database");
  }

  confirmationRequest(){
    this.confirmationModal.next();
  }

  toggleDeleteRequest(){
    this.isArticleDeleteState = !this.isArticleDeleteState
  }

  deleteArticle(){
      this.characterService.deleteCharacter(this.character.pk);
  }

  ngOnDestroy(){
    this.parameter_subscription.unsubscribe();
  }
}
