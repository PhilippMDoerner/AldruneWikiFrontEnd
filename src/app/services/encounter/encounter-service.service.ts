import { Injectable } from '@angular/core';
import { Encounter } from "src/app/models/encounter";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"}),
}

@Injectable({
  providedIn: 'root'
})
export class EncounterServiceService {
  encounters: Encounter[];
  api_base_url: string = `${Constants.wikiApiURL}/encounter`;

  constructor(private http: HttpClient) { 
    this.encounters = [
      {
        "creation_datetime": "2020-10-03T17:12:45.698883Z",
        "update_datetime": "2020-10-04T08:01:41.906326Z",
        "description": "<p>We all managed to survive. But so did the dragon.</p>",
        "encounterConnections": [
          {
            "encounter_pk": 189,
            "character_name": "Fen",
            "pk": 1
          },
          {
            "encounter_pk": 189,
            "character_name": "Bathilde",
            "pk": 1
          },
          {
            "encounter_pk": 189,
            "character_name": "Caitriona",
            "pk": 1
          },
        ],
        "pk": 122,
        "name": "Main Session 18 - Etruscan"
      },
      {
        "pk": 122,
        "creation_datetime": "2020-10-03T17:12:45.698883Z",
        "update_datetime": "2020-10-04T08:01:41.906326Z",
        "description": "<p>Before the rest of us leave the study from our warplanning with Aspen, Aspen asks Murtagh and myself to help out the wounded in the Brigantia Cathedral of the city. Before doing so though, I snatch Fen and challenge him to a spar to catch up, trying to get as much of what he did in the meantime out of him as possible. After that I make my way to the Cathedral, helping out by carrying stuff and the like, while Bathilde and Murtagh help out in surgical removal of Slaad-tadpoles. The situation in here is dire, medical supplies already running low, people with spines still stuck in them because pulling them out would mean bleeding to death given the lack of supplies and pained moans everywhere. The losing of hope is palpable, here more so than anywhere else in the city.</p>\r\n<p>It&rsquo;s starting to run late into the night as we help out, my mind just about to shut down as we&rsquo;re all jumbled wide awake by a terrifying draconic roar from the central plaza. It is quickly accompanied by the ringing of alarm bells, signaling troops surrounding us to take up arms and march towards the plaza, which we follow. Soon the entire party meets up on the way to the plaza. One quick question from Murtagh later we find out that this was a trap for the dragon and that commands are to make sure it&rsquo;s being taken out.</p>\r\n<p>At the market square we see the dragon caught in a mesh net of chains. On a high wall in front of it, stabbing at its wings are Elmesser and Aspen on each of its sides, trying to keep it in place. Myriads of chaos creatures are flying in, trying to free the dragon from its chains but being fought off by the soldiers that are pouring in. But even then, it seems like it might not be enough, so we join in, fighting our way through Slaads until Melinni suddenly shows up and transports us past them. Worried what might happen if they fall into our backs I give a quick shout to the group of going on without me, staring at the ugly faces of two more of these overgrown frogs. It can&rsquo;t have been much more than a minute, but it feels like hours of slashing between the three of us, while I trust that my friends behind me are making short work of the rest of these creatures, based on the few glimpses I get of them during combat. Aspen&hellip; I hate to say it, but right now, that man is more terrifying than me. I only saw the first, but heard the other two times he tanked a massive amount of spikes piercing his body exhaled by the dragon. Nobody else I know could have survived this with certainty. Gods damn this man&hellip; None the less, based on the pained roars of the dragon, they seem to be succeeding. Or at least they were, until I finish of the last of my Slaad and turn around, just in time to witness the dragon breaking the last of its chains and flying off, wounded, but alive. As he does so, he flies just out of range of Siavala, who seems to have arrived only seconds too late.</p>\r\n<p>We all managed to survive. But so did the dragon.</p>",
        "encounterConnections": [
          {
            "encounter_pk": 189,
            "character_name": "Fen",
            "pk": 1
          },
          {
            "encounter_pk": 189,
            "character_name": "Bathilde",
            "pk": 1
          },
          {
            "encounter_pk": 189,
            "character_name": "Caitriona",
            "pk": 1
          },
        ],
        "name": "Main Session 18 - Etruscan"
      },
    ]
  }

  getEncounters(character_pk: number): Observable<Encounter[]>{
    const url = `${this.api_base_url}/character/${character_pk}`;
    return this.http.get<Encounter[]>(url);
  }
}
