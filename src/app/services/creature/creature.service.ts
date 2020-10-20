import { Injectable } from '@angular/core';
import { Creature } from "src/app/models/creature";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreatureService {
  creatureUrl: string = `${Constants.wikiApiURL}/creature`
  constructor(private http : HttpClient) { }

  getCreatures(): Observable<Creature[]>{
    return this.http.get<Creature[]>(this.creatureUrl);
  }

  getCreature(creature: string | number){
    const url = (typeof creature === 'number') ? `${this.creatureUrl}/pk/${creature}` :  `${this.creatureUrl}/${creature}`;
    return this.http.get<Creature>(url);
  }
}
