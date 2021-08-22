import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../app.constants';
import { OverviewItem, OverviewItemObject } from '../models/overviewItem';
import { Quest, QuestObject } from '../models/quest';
import { TransformArrayObservable, TransformObservable } from '../utils/functions/transform';
import { CharacterService } from './character/character.service';
import { GenericObjectService } from './generic-object.service';

@Injectable({
  providedIn: 'root'
})
export class QuestService extends GenericObjectService{
  baseUrl: string = `${Constants.wikiApiUrl}/quest`;

  constructor(
    http : HttpClient,
    private characterService: CharacterService,
    ) { super(http, QuestObject) }

  getQuestStates(): Observable<string[]>{
    return this.http.get<string[]>(`${this.baseUrl}states`);
  }

  @TransformArrayObservable(OverviewItemObject)
  getQuestTakers(campaign: string): Observable<OverviewItem[]>{
    const playerCharacterObservable: Observable<OverviewItem[]> = this.characterService.getPlayerCharacters(campaign);
    return playerCharacterObservable.pipe(map( characters => {
      const groupAsQuestTaker: OverviewItem = {'name': 'Group', 'name_full': 'Group', 'pk': null, 'article_type': 'quest'}
      characters.unshift(groupAsQuestTaker);
      return characters;
    }));
  }
}