import { Component, OnInit } from '@angular/core';
import { Character } from "src/app/models/character";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { CharacterService } from "src/app/services/character/character.service";
import { Subject } from "rxjs";

@Component({
  selector: 'app-character-article',
  templateUrl: './character-article.component.html',
  styleUrls: ['./character-article.component.scss']
})
export class CharacterArticleComponent implements OnInit {
  character: Character;
  isArticleDeleteState: boolean = false;
  confirmationModal: Subject<void> = new Subject<void>();
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
        organization: {url: "http://localhost:8000/api/organization/pk/19/", name: "Walumba"},
        current_location: null,
        images: [
          {
            url: "http://localhost:8000/api/image/pk/57/",
            image: "http://localhost:8000/media/resources/dndicon.png",
            name: "DndIcon",
            articleUrl: "http://localhost:8000/api/character/pk/81/"
          },
          {
            url: "http://localhost:8000/api/image/pk/57/",
            image: "http://localhost:8000/media/resources/dndicon.png",
            name: "DndIcon",
            articleUrl: "http://localhost:8000/api/character/pk/81/"
          },
          {
            url: "http://localhost:8000/api/image/pk/57/",
            image: "http://localhost:8000/media/resources/dndicon.png",
            name: "DndIcon",
            articleUrl: "http://localhost:8000/api/character/pk/81/"
          }
        ],
        items: [
          {
            url: "http://localhost:8000/api/item/pk/31/",
            name: "Ailis Note To the Group"
          },
          {
            url: "http://localhost:8000/api/item/pk/31/",
            name: "Ailis Note To the Group"
          }
        ],
        encounters: [
          {
            "url": "http://localhost:8000/api/encounter/pk/122/",
            "creation_datetime": "2020-10-03T17:12:45.698883Z",
            "update_datetime": "2020-10-04T08:01:41.906326Z",
            "description": "<p>We all managed to survive. But so did the dragon.</p>",
            "encounterConnections": [
              {
                "url": "http://localhost:8000/api/encounterconnection/pk/189/",
                "character": "http://localhost:8000/api/character/pk/132/",
              },
              {
                "url": "http://localhost:8000/api/encounterconnection/pk/189/",
                "character": "http://localhost:8000/api/character/pk/132/",
              },
              {
                "url": "http://localhost:8000/api/encounterconnection/pk/189/",
                "character": "http://localhost:8000/api/character/pk/132/",
              }
            ],
            "pk": 122,
            "name": "Main Session 18 - Etruscan"
          },
          {
            "url": "http://localhost:8000/api/encounter/pk/122/",
            "pk": 122,
            "creation_datetime": "2020-10-03T17:12:45.698883Z",
            "update_datetime": "2020-10-04T08:01:41.906326Z",
            "description": "<p>Before the rest of us leave the study from our warplanning with Aspen, Aspen asks Murtagh and myself to help out the wounded in the Brigantia Cathedral of the city. Before doing so though, I snatch Fen and challenge him to a spar to catch up, trying to get as much of what he did in the meantime out of him as possible. After that I make my way to the Cathedral, helping out by carrying stuff and the like, while Bathilde and Murtagh help out in surgical removal of Slaad-tadpoles. The situation in here is dire, medical supplies already running low, people with spines still stuck in them because pulling them out would mean bleeding to death given the lack of supplies and pained moans everywhere. The losing of hope is palpable, here more so than anywhere else in the city.</p>\r\n<p>It&rsquo;s starting to run late into the night as we help out, my mind just about to shut down as we&rsquo;re all jumbled wide awake by a terrifying draconic roar from the central plaza. It is quickly accompanied by the ringing of alarm bells, signaling troops surrounding us to take up arms and march towards the plaza, which we follow. Soon the entire party meets up on the way to the plaza. One quick question from Murtagh later we find out that this was a trap for the dragon and that commands are to make sure it&rsquo;s being taken out.</p>\r\n<p>At the market square we see the dragon caught in a mesh net of chains. On a high wall in front of it, stabbing at its wings are Elmesser and Aspen on each of its sides, trying to keep it in place. Myriads of chaos creatures are flying in, trying to free the dragon from its chains but being fought off by the soldiers that are pouring in. But even then, it seems like it might not be enough, so we join in, fighting our way through Slaads until Melinni suddenly shows up and transports us past them. Worried what might happen if they fall into our backs I give a quick shout to the group of going on without me, staring at the ugly faces of two more of these overgrown frogs. It can&rsquo;t have been much more than a minute, but it feels like hours of slashing between the three of us, while I trust that my friends behind me are making short work of the rest of these creatures, based on the few glimpses I get of them during combat. Aspen&hellip; I hate to say it, but right now, that man is more terrifying than me. I only saw the first, but heard the other two times he tanked a massive amount of spikes piercing his body exhaled by the dragon. Nobody else I know could have survived this with certainty. Gods damn this man&hellip; None the less, based on the pained roars of the dragon, they seem to be succeeding. Or at least they were, until I finish of the last of my Slaad and turn around, just in time to witness the dragon breaking the last of its chains and flying off, wounded, but alive. As he does so, he flies just out of range of Siavala, who seems to have arrived only seconds too late.</p>\r\n<p>We all managed to survive. But so did the dragon.</p>",
            "encounterConnections": [
              {
                "url": "http://localhost:8000/api/encounterconnection/pk/189/",
                "character": "http://localhost:8000/api/character/pk/132/",
              },
              {
                "url": "http://localhost:8000/api/encounterconnection/pk/189/",
                "character": "http://localhost:8000/api/character/pk/132/",
              },
              {
                "url": "http://localhost:8000/api/encounterconnection/pk/189/",
                "character": "http://localhost:8000/api/character/pk/132/",
              }
            ],
            "name": "Main Session 18 - Etruscan"
          },
        ]

    }
    let split_url = this.character.url.split('/');
    this.pk = parseInt(split_url[split_url.length-2]);
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
      this.characterService.deleteCharacter(this.pk);
  }
}
