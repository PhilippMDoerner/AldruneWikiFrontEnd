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

  getListItems(): Observable<DiaryEntry[]>{
    return this.getDiaryEntries();
  }

  getDiaryEntryPk(diaryEntryPk: number): Observable<DiaryEntry>{
    const url = `${this.diaryEntryUrl}/pk/${diaryEntryPk}`;
    return this.http.get<DiaryEntry>(url);
  }

  getDiaryEntry(isMainSession: number, sessionNumber: number, author: string): Observable<DiaryEntry>{
    const url = `${this.diaryEntryUrl}/${sessionNumber}/${isMainSession}/${author}`;
    return this.http.get<DiaryEntry>(url);
  }
}
