import { Injectable } from '@angular/core';
import { DiaryEntry, DiaryEntryObject } from "src/app/models/diaryentry";
import { Encounter } from "src/app/models/encounter";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { DiaryEntryEncounterConnectionObject } from 'src/app/models/diaryencounterconnection';
import { GenericObjectService } from '../generic-object.service';
import { TransformArrayObservable, TransformObservable } from 'src/app/utils/functions/transform';

@Injectable({
  providedIn: 'root'
})

export class DiaryentryService extends GenericObjectService {
  baseUrl: string = `${Constants.wikiApiUrl}/diaryentry`;

  constructor(public http : HttpClient) { super(http, DiaryEntryObject)}

  @TransformArrayObservable(DiaryEntryObject)
  list(): Observable<DiaryEntry[]>{
    return this.http.get<DiaryEntry[]>(this.baseUrl);
  }

  @TransformObservable(DiaryEntryObject)
  read(diaryEntryPk: number): Observable<DiaryEntry>{
    const url = `${this.baseUrl}/pk/${diaryEntryPk}/`;
    return this.http.get<DiaryEntry>(url);
  }

  @TransformObservable(DiaryEntryObject)
  readByParam(params : {isMainSession: number | string, sessionNumber: number | string, authorName: string}): Observable<DiaryEntry>{
    const url = `${this.baseUrl}/${params.sessionNumber}/${params.isMainSession}/${params.authorName}/`;
    return this.http.get<DiaryEntry>(url);
  }

  @TransformObservable(DiaryEntryObject)
  update(pk: number, model: DiaryEntry): Observable<DiaryEntry>{
    const url = `${this.baseUrl}/pk/${pk}/`;
    return this.http.put<DiaryEntry>(url, model);
  }

  @TransformObservable(DiaryEntryObject)
  create(diaryEntry: DiaryEntry): Observable<DiaryEntry>{
    return this.http.post<DiaryEntry>(`${this.baseUrl}/`, diaryEntry);
  }


}
