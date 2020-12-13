import { Injectable } from '@angular/core';
import { Constants } from "src/app/app.constants";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Character, CharacterObject } from "src/app/models/character";
import { Observable } from "rxjs";
import { OverviewItem, OverviewItemObject } from "src/app/models/overviewItem";
import { map } from 'rxjs/operators';
import { TransformObservable, TransformArrayObservable } from "src/app/utils/functions/transform"

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"}),
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  characterUrl: string = `${Constants.wikiApiUrl}/character`;
  constructor(private http: HttpClient) { }

  @TransformArrayObservable(CharacterObject)
  getCharacters(): Observable<Character[]>{
    return this.http.get<Character[]>(this.characterUrl);
  }

  @TransformObservable(CharacterObject)
  getCharacter(character: number | string): Observable<Character>{
    const url = (typeof character === 'number') ? `${this.characterUrl}/pk/${character}/` :  `${this.characterUrl}/${character}`;
    return this.http.get<Character>(url);
  }


  @TransformArrayObservable(OverviewItemObject)
  getPlayerCharacters(): Observable<OverviewItem[]>{
    const url = `${Constants.wikiApiUrl}/playercharacters`;
    return this.http.get<OverviewItem[]>(url);
  }

  @TransformObservable(CharacterObject)
  deleteCharacter(character: Character): Observable<Character>{
    const url = `${this.characterUrl}/pk/${character.pk}/`;
    return this.http.delete<Character>(url, httpOptions);
  }

  @TransformObservable(CharacterObject)
  updateCharacter(character: Character): Observable<Character>{
    const url = `${this.characterUrl}/pk/${character.pk}/`;
    return this.http.put<Character>(url, character, httpOptions);
  }

  @TransformObservable(CharacterObject)
  createCharacter(character: Character): Observable<Character>{
    return this.http.post<Character>(`${this.characterUrl}/`, character, httpOptions);
  }
}


