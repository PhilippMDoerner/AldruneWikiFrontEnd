import { Injectable } from '@angular/core';
import { Constants } from "src/app/app.constants";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Character } from "src/app/models/character";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"}),
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  characterUrl: string = `${Constants.wikiApiUrl}/character`;
  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Character[]>{
    return this.http.get<Character[]>(this.characterUrl);
  }

  getCharacter(character: number | string): Observable<Character>{
    const url = (typeof character === 'number') ? `${this.characterUrl}/pk/${character}/` :  `${this.characterUrl}/${character}`;
    return this.http.get<Character>(url);
  }

  deleteCharacter(character: Character): Observable<Character>{
    const url = `${this.characterUrl}/pk/${character.pk}/`;
    return this.http.delete<Character>(url, httpOptions);
  }

  updateCharacter(character: Character): Observable<Character>{
    const url = `${this.characterUrl}/pk/${character.pk}/`;
    return this.http.put<Character>(url, character, httpOptions);
  }

  createCharacter(character: Character): Observable<Character>{
    return this.http.post<Character>(`${this.characterUrl}/`, character, httpOptions);
  }
}


