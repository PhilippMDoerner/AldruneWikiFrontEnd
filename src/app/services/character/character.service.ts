import { Injectable } from '@angular/core';
import { AppConstants } from "src/app/app.constants";
import { HttpClient } from "@angular/common/http";
import { Character } from "src/app/models/character";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  characterUrl: string = `${AppConstants.wikiApiURL}/character/`;
  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Character[]>{
    return this.http.get<Character[]>(this.characterUrl);
  }
}


