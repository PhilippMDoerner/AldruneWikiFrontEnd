import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { PlayerClass } from '../models/playerclass';

@Injectable({
  providedIn: 'root'
})
export class PlayerClassService {
  playerClassUrl: string = `${Constants.wikiApiUrl}/player_class`;
  constructor(private http: HttpClient) { }

  getPlayerClasses(): Observable<PlayerClass[]>{
    return this.http.get<PlayerClass[]>(this.playerClassUrl);
  }
}
