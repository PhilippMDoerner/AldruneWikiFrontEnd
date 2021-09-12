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

  @TransformObservable(DiaryEntryObject)
  readByParam(campaign: string, params: {isMainSession: number | string, sessionNumber: number | string, authorName: string}): Observable<DiaryEntry>{
    const url = `${this.baseUrl}/${campaign}/${params.sessionNumber}/${params.isMainSession}/${params.authorName}/`;
    return this.http.get<DiaryEntry>(url);
  }

}
