import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { SpellPlayerClassConnection } from '../models/spell';

@Injectable({
  providedIn: 'root'
})
export class SpellPlayerClassConnectionService {
  spellConnectionUrl: string = `${Constants.wikiApiUrl}/spellclassconnection`;
  constructor(private http: HttpClient) { }


  createSpellClassConnection(model: SpellPlayerClassConnection): Observable<SpellPlayerClassConnection>{
    return this.http.post<SpellPlayerClassConnection>(`${this.spellConnectionUrl}/`, model);
  }

  deleteSpellClassConnection(connection_pk: number): Observable<any>{
    const url: string = `${this.spellConnectionUrl}/pk/${connection_pk}`;
    return this.http.delete(url);
  }
}
