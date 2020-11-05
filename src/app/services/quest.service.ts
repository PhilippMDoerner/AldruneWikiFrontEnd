import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../app.constants';
import { Character } from '../models/character';
import { OverviewItem } from '../models/overviewItem';
import { Quest } from '../models/quest';
import { CharacterService } from './character/character.service';
import { OverviewService } from './overview.service';

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  questUrl: string = `${Constants.wikiApiUrl}/quest`;

  constructor(
    private http : HttpClient,
    private characterService: CharacterService,
    ) { }

  getQuests(): Observable<Quest[]>{
    return this.http.get<Quest[]>(this.questUrl);
  }

  getQuestStates(): Observable<string[]>{
    return this.http.get<string[]>(`${this.questUrl}states`);
  }

  getQuestTakers(): Observable<OverviewItem[]>{
    const playerCharacterObservable: Observable<OverviewItem[]> = this.characterService.getPlayerCharacters();
    return playerCharacterObservable.pipe(map( characters => {
      const groupAsQuestTaker: OverviewItem = {'name': 'Group', 'name_full': 'Group', 'pk': null }
      characters.unshift(groupAsQuestTaker);
      return characters;
    }))
  }

  getQuest(quest: number | string): Observable<Quest>{
    const url: string = (typeof quest === 'number') ? `${this.questUrl}/pk/${quest}` :  `${this.questUrl}/${quest}`;
    return this.http.get<Quest>(url);
  }

  createQuest(quest: Quest): Observable<Quest>{
    return this.http.post<Quest>(`${this.questUrl}/`, quest);
  }

  updateQuest(quest: Quest): Observable<Quest>{
    const url: string = `${this.questUrl}/pk/${quest.pk}/`;
    return this.http.put<Quest>(url, quest);
  }

  deleteQuest(quest_pk: number){
    const url: string = `${this.questUrl}/pk/${quest_pk}/`;
    return this.http.delete<Quest>(url);
  }

}