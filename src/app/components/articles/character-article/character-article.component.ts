import { Component, OnInit } from '@angular/core';
import { Character } from "src/app/models/character";

@Component({
  selector: 'app-character-article',
  templateUrl: './character-article.component.html',
  styleUrls: ['./character-article.component.scss']
})
export class CharacterArticleComponent implements OnInit {
  character: Character;
  isDescriptionEditState: boolean;

  constructor() { }

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
        current_location: null
    }
  }

  onDescriptionEditToggle(){
    this.isDescriptionEditState = !this.isDescriptionEditState;
  }

  onUpdateDescription(updatedDescription){
    console.log(updatedDescription);
  }
}
