import { Component, OnInit } from '@angular/core';
import { Character } from "src/app/models/character";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { CharacterService } from "src/app/services/character/character.service";
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-character-article',
  templateUrl: './character-article.component.html',
  styleUrls: ['./character-article.component.scss']
})
export class CharacterArticleComponent implements OnInit {
  character: Character;
  isDescriptionEditState: boolean;
  pk: number;

  constructor(private modalService: NgbModal, private characterService: CharacterService) { }

  ngOnInit(): void {
    this.character = {
        url: "http://localhost:8000/api/character/pk/81/",
        creation_datetime: "2020-06-10T12:00:00Z",
        update_datetime: "2020-06-10T12:00:00Z",
        player_character: false,
        alive: true,
        name: "Agari",
        title: "Destroyer of the third gate",
        gender: "Male",
        race: "Devil",
        description: "<p>A devil of the unholy trine, originally subservent to Solomon.</p>",
        is_secret: false,
        organization: "http://localhost:8000/api/organization/pk/19/",
        current_location: null,
        images: [
          "http://localhost:8000/media/resources/dndicon.png",
          "http://localhost:8000/media/resources/dndicon.png",
          "http://localhost:8000/media/resources/dndicon.png",
      ]
    }
    let split_url = this.character.url.split('/');
    this.pk = parseInt(split_url[split_url.length-2]);
  }

  showModal(content){
    this.modalService.open(content).result.then(  
      (closeResult) => {  
          //modal close  
          console.log("Used close function on click event");
          this.deleteArticle();
      }, (dismissReason) => {  
          //modal Dismiss  
          console.log("Used di/dismiss function on click event")
      })  
  }

  onDescriptionUpdate(updatedDescriptionText){
    this.character.description = updatedDescriptionText;
  }


  deleteArticle(){
      this.characterService.deleteCharacter(this.pk);
  }
}
