import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../app.constants';
import { OverviewItem } from '../models/overviewItem';
import { Quest, QuestObject } from '../models/quest';
import { TransformArrayObservable, TransformObservable } from '../utils/functions/transform';
import { CharacterService } from './character/character.service';

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  questUrl: string = `${Constants.wikiApiUrl}/quest`;

  constructor(
    private http : HttpClient,
    private characterService: CharacterService,
    ) { }

  @TransformArrayObservable(QuestObject)
  getQuests(): Observable<Quest[]>{
    return this.http.get<Quest[]>(this.questUrl);
  }

  getQuestStates(): Observable<string[]>{
    return this.http.get<string[]>(`${this.questUrl}states`);
  }
// TODO: Create an Object to apply a transformation for this
  getQuestTakers(): Observable<OverviewItem[]>{
    const playerCharacterObservable: Observable<OverviewItem[]> = this.characterService.getPlayerCharacters();
    return playerCharacterObservable.pipe(map( characters => {
      const groupAsQuestTaker: OverviewItem = {'name': 'Group', 'name_full': 'Group', 'pk': null, 'article_type': 'quest'}
      characters.unshift(groupAsQuestTaker);
      return characters;
    }))
  }

  @TransformObservable(QuestObject)
  getQuest(quest: number | string): Observable<Quest>{
    const url: string = (typeof quest === 'number') ? `${this.questUrl}/pk/${quest}` :  `${this.questUrl}/${quest}`;
    return this.http.get<Quest>(url);
  }

  @TransformObservable(QuestObject)
  createQuest(quest: Quest): Observable<Quest>{
    return this.http.post<Quest>(`${this.questUrl}/`, quest);
  }

  @TransformObservable(QuestObject)
  updateQuest(quest: Quest): Observable<Quest>{
    const url: string = `${this.questUrl}/pk/${quest.pk}/`;
    return this.http.put<Quest>(url, quest);
  }

  @TransformObservable(QuestObject)
  deleteQuest(quest_pk: number){
    const url: string = `${this.questUrl}/pk/${quest_pk}/`;
    return this.http.delete<Quest>(url);
  }

}