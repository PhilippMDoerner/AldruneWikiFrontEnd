import { Injectable } from '@angular/core';
import { Creature, CreatureObject } from "src/app/models/creature";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";
import { TransformArrayObservable, TransformObservable } from 'src/app/utils/functions/transform';

@Injectable({
  providedIn: 'root'
})
export class CreatureService {
  creatureUrl: string = `${Constants.wikiApiUrl}/creature`
  constructor(private http : HttpClient) { }

  @TransformArrayObservable(CreatureObject)
  getCreatures(): Observable<Creature[]>{
    return this.http.get<Creature[]>(this.creatureUrl);
  }

  @TransformObservable(CreatureObject)
  getCreature(creature: string | number): Observable<Creature>{
    const url = (typeof creature === 'number') ? `${this.creatureUrl}/pk/${creature}/` :  `${this.creatureUrl}/${creature}/`;
    return this.http.get<Creature>(url);
  }

  @TransformObservable(CreatureObject)
  createCreature(creature: Creature): Observable<Creature>{
    return this.http.post<Creature>(`${this.creatureUrl}/`, creature);
  }

  @TransformObservable(CreatureObject)
  updateCreature(creature: Creature): Observable<Creature>{
    const url = `${this.creatureUrl}/pk/${creature.pk}/`;
    return this.http.put<Creature>(url, creature);
  }

  @TransformObservable(CreatureObject)
  deleteCreature(creature_pk: number){
    const url = `${this.creatureUrl}/pk/${creature_pk}/`;
    return this.http.delete<Creature>(url);
  }
}
