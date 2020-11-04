import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { Quest } from '../models/quest';

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  questUrl: string = `${Constants.wikiApiUrl}/quest`;

  constructor(private http : HttpClient) { }

  getQuests(): Observable<Quest[]>{
    return this.http.get<Quest[]>(this.questUrl);
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