import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { diaryEntryEncounterConnection, DiaryEntryEncounterConnectionObject } from '../models/diaryencounterconnection';
import { diaryEntryEncounter } from '../models/diaryentry';
import { TransformObservable } from '../utils/functions/transform';

@Injectable({
  providedIn: 'root'
})
export class DiaryentryEncounterConnectionService {
  encounterConnectionUrl = `${Constants.wikiApiUrl}/diaryentryencounterconnection`;

  constructor(private http: HttpClient) { }

  @TransformObservable(DiaryEntryEncounterConnectionObject)
  getConnection(encounterConnection_pk: number): Observable<diaryEntryEncounterConnection>{
    const url: string = `${this.encounterConnectionUrl}/pk/${encounterConnection_pk}`;
    return this.http.get<diaryEntryEncounterConnection>(url);
  }

  @TransformObservable(DiaryEntryEncounterConnectionObject)
  createConnection(encounterConnection: diaryEntryEncounterConnection): Observable<diaryEntryEncounterConnection>{
    const url: string = `${this.encounterConnectionUrl}/`;
    return this.http.post<diaryEntryEncounterConnection>(url, encounterConnection);
  }

  @TransformObservable(DiaryEntryEncounterConnectionObject)
  updateConnection(encounterConnection: diaryEntryEncounterConnection): Observable<diaryEntryEncounterConnection>{
    const url: string = `${this.encounterConnectionUrl}/pk/${encounterConnection.pk}/`;
    return this.http.put<diaryEntryEncounterConnection>(url, encounterConnection);
  }

  deleteConnection(encounterConnection_pk: number){
    const url: string = `${this.encounterConnectionUrl}/pk/${encounterConnection_pk}`;
    return this.http.delete(url);
  }
}
