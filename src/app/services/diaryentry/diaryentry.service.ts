import { Injectable } from '@angular/core';
import { DiaryEntry, DiaryEntryObject } from "src/app/models/diaryentry";
import { Encounter } from "src/app/models/encounter";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";
import { TransformArrayObservable, TransformObservable } from 'src/app/utils/functions/transform';
import { map } from 'rxjs/operators';
import { DiaryEntryEncounterConnectionObject } from 'src/app/models/diaryencounterconnection';
import { GenericObjectService } from '../generic-object.service';

@Injectable({
  providedIn: 'root'
})

export class DiaryentryService extends GenericObjectService {
  diaryEntryUrl: string = `${Constants.wikiApiUrl}/diaryentry`;

  constructor(public http : HttpClient) { super(http, DiaryEntryObject)}

  list(): Observable<DiaryEntry[]>{
    const diaryEntryObservable =  this.http.get<DiaryEntry[]>(this.diaryEntryUrl);
    return diaryEntryObservable.pipe(map((diaryEntries: DiaryEntry[]) => {
      diaryEntries.forEach(this.transformDiaryEntryEncounterConnections);
      return diaryEntries;
    }));
  }

  read(diaryEntryPk: number): Observable<DiaryEntry>{
    const url = `${this.diaryEntryUrl}/pk/${diaryEntryPk}/`;
    const diaryEntryObservable = this.http.get<DiaryEntry>(url);
    return diaryEntryObservable.pipe(map(this.transformDiaryEntryEncounterConnections));
  }

  readByParam(params : {isMainSession: number | string, sessionNumber: number | string, authorName: string}): Observable<DiaryEntry>{
    const url = `${this.diaryEntryUrl}/${params.sessionNumber}/${params.isMainSession}/${params.authorName}`;
    const diaryEntryObservable = this.http.get<DiaryEntry>(url);
    return diaryEntryObservable.pipe(map(this.transformDiaryEntryEncounterConnections));
  }

  update(pk: number, model: DiaryEntry): Observable<DiaryEntry>{
    const url = `${this.diaryEntryUrl}/pk/${pk}/`;
    const diaryEntryObservable = this.http.put<DiaryEntry>(url, model);
    return diaryEntryObservable.pipe(map(this.transformDiaryEntryEncounterConnections));
  }

  create(diaryEntry: DiaryEntry): Observable<DiaryEntry>{
    const diaryEntryObservable = this.http.post<DiaryEntry>(`${this.diaryEntryUrl}/`, diaryEntry);
    return diaryEntryObservable.pipe(map(this.transformDiaryEntryEncounterConnections));
  }

  /**
   * TODO: Turn this into something done by the TransformObservable decorator
   * Converts the diaryEntryEncounterConnection inside ever encounter in the encounters of a diaryentry
   * from an interface to an object, in order to give it additional functionality.
   * This isn't done via the decorator, as it'd mean coding a decorator that transforms nested objects.
   */
  transformDiaryEntryEncounterConnections(diaryEntry: DiaryEntry): DiaryEntry{
    diaryEntry.encounters.forEach((encounter: Encounter) => {
      encounter.connection = new DiaryEntryEncounterConnectionObject(encounter.connection);
    });
    return diaryEntry;
  }
}
