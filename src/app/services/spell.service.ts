import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from "src/app/app.constants";
import { Spell, SpellObject } from '../models/spell';
import { TransformArrayObservable, TransformObservable } from '../utils/functions/transform';

@Injectable({
  providedIn: 'root'
})
export class SpellService {
  spellUrl: string = `${Constants.wikiApiUrl}/spell`;

  constructor(private http: HttpClient) { }

  @TransformArrayObservable(SpellObject)
  getSpells(): Observable<Spell[]>{
    return this.http.get<Spell[]>(this.spellUrl);
  }

  @TransformObservable(SpellObject)
  getSpell(name: string){
    return this.http.get<Spell>(`${this.spellUrl}/${name}`);
  }

  @TransformObservable(SpellObject)
  createSpell(spell: Spell){
    return this.http.post<Spell>(`${this.spellUrl}/`, spell);
  }

  @TransformObservable(SpellObject)
  updateSpell(spell: Spell){
    return this.http.put<Spell>(`${this.spellUrl}/pk/${spell.pk}`, spell);
  }
  
  @TransformObservable(SpellObject)
  deleteSpell(spell_pk: number){
    return this.http.delete<Spell>(`${this.spellUrl}/pk/${spell_pk}`);
  }
}
