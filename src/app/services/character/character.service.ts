import { Injectable } from '@angular/core';
import { Constants } from "src/app/app.constants";
import { HttpClient } from "@angular/common/http";
import { Character } from "src/app/models/character";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  characterUrl: string = `${Constants.wikiApiURL}/character`;
  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Character[]>{
    return this.http.get<Character[]>(this.characterUrl);
  }

  getCharacter(characterName: string): Observable<Character>{
    return this.http.get<Character>(`${this.characterUrl}/${characterName}`);
  }

  deleteCharacter(id: number): void{//Observable<Character>{
    console.log(`Delete Character with pk ${id}`);
  }
}


