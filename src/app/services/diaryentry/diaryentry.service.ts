import { Injectable } from '@angular/core';
import { DiaryEntry, DiaryEntryObject } from "src/app/models/diaryentry";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";
import { TransformArrayObservable, TransformObservable } from 'src/app/utils/functions/transform';

@Injectable({
  providedIn: 'root'
})

export class DiaryentryService {
  diaryEntryUrl: string = `${Constants.wikiApiUrl}/diaryentry`;

  constructor(private http : HttpClient) { }

  @TransformArrayObservable(DiaryEntryObject)
  getDiaryEntries(): Observable<DiaryEntry[]>{
    return this.http.get<DiaryEntry[]>(this.diaryEntryUrl);
  }

  @TransformObservable(DiaryEntryObject)
  getDiaryEntryPk(diaryEntryPk: number): Observable<DiaryEntry>{
    const url = `${this.diaryEntryUrl}/pk/${diaryEntryPk}/`;
    return this.http.get<DiaryEntry>(url);
  }

  @TransformObservable(DiaryEntryObject)
  getDiaryEntry(isMainSession: number | string, sessionNumber: number | string, authorName: string): Observable<DiaryEntry>{
    const url = `${this.diaryEntryUrl}/${sessionNumber}/${isMainSession}/${authorName}`;
    return this.http.get<DiaryEntry>(url);
  }

  @TransformObservable(DiaryEntryObject)
  updateDiaryEntry(diaryEntry: DiaryEntry): Observable<DiaryEntry>{
    const url = `${this.diaryEntryUrl}/pk/${diaryEntry.pk}/`;
    return this.http.put<DiaryEntry>(url, diaryEntry);
  }

  @TransformObservable(DiaryEntryObject)
  deleteDiaryEntry(diaryEntry_pk: number){
    const url = `${this.diaryEntryUrl}/pk/${diaryEntry_pk}/`;
    return this.http.delete<DiaryEntry>(url);
  }

  @TransformObservable(DiaryEntryObject)
  createDiaryEntry(diaryEntry: DiaryEntry): Observable<DiaryEntry>{
    return this.http.post<DiaryEntry>(`${this.diaryEntryUrl}/`, diaryEntry);
  }
}
