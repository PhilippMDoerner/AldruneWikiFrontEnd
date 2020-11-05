import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from "src/app/app.constants";
import { Spell } from '../models/spell';

@Injectable({
  providedIn: 'root'
})
export class SpellService {
  spellUrl: string = `${Constants.wikiApiUrl}/spell`;

  constructor(private http: HttpClient) { }

  getSpells(): Observable<Spell[]>{
    return this.http.get<Spell[]>(this.spellUrl);
  }
}
