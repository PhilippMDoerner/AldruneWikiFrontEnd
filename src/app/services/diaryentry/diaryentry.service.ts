import { Injectable } from '@angular/core';
import { DiaryEntry } from "src/app/models/diaryentry";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DiaryentryService {
  diaryEntryUrl: string = `${Constants.wikiApiUrl}/diaryentry`;

  constructor(private http : HttpClient) { }

  getDiaryEntries(): Observable<DiaryEntry[]>{
    return this.http.get<DiaryEntry[]>(this.diaryEntryUrl);
  }

  getDiaryEntryPk(diaryEntryPk: number): Observable<DiaryEntry>{
    const url = `${this.diaryEntryUrl}/pk/${diaryEntryPk}/`;
    return this.http.get<DiaryEntry>(url);
  }

  getDiaryEntry(isMainSession: number | string, sessionNumber: number | string, authorName: string): Observable<DiaryEntry>{
    const url = `${this.diaryEntryUrl}/${sessionNumber}/${isMainSession}/${authorName}`;
    return this.http.get<DiaryEntry>(url);
  }

  updateDiaryEntry(diaryEntry: DiaryEntry): Observable<DiaryEntry>{
    const url = `${this.diaryEntryUrl}/pk/${diaryEntry.pk}/`;
    return this.http.put<DiaryEntry>(url, diaryEntry);
  }

  deleteDiaryEntry(diaryEntry_pk: number){
    const url = `${this.diaryEntryUrl}/pk/${diaryEntry_pk}/`;
    return this.http.delete<DiaryEntry>(url);
  }

  createDiaryEntry(diaryEntry: DiaryEntry): Observable<DiaryEntry>{
    return this.http.post<DiaryEntry>(`${this.diaryEntryUrl}/`, diaryEntry);
  }
}
