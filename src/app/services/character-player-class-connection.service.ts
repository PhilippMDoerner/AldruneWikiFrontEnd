import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { CharacterPlayerClassConnection } from '../models/playerclass';

@Injectable({
  providedIn: 'root'
})
export class CharacterPlayerClassConnectionService {
  characterPlayerClassConnectionUrl: string = `${Constants.wikiApiUrl}/characterplayerclassconnection`
  constructor(private http: HttpClient) { }

  deleteCharacterClassConnection(connection_pk: number): Observable<any>{
    return this.http.delete(`${this.characterPlayerClassConnectionUrl}/pk/${connection_pk}`);
  }

  createCharacterClassConnection(connection: CharacterPlayerClassConnection): Observable<CharacterPlayerClassConnection>{
    return this.http.post<CharacterPlayerClassConnection>(`${this.characterPlayerClassConnectionUrl}/`, connection);
  }
}
