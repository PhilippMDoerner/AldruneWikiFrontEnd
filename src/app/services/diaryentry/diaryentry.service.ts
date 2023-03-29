import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Constants } from "src/app/app.constants";
import { DiaryEntry, DiaryEntryObject } from "src/app/models/diaryentry";
import { TransformObservable } from 'src/app/utils/functions/transform';
import { GenericObjectService } from '../generic-object.service';

@Injectable({
  providedIn: 'root'
})

export class DiaryentryService extends GenericObjectService {
  baseUrl: string = `${Constants.wikiApiUrl}/diaryentry`;

  constructor(public http : HttpClient) { super(http, DiaryEntryObject)}

  @TransformObservable(DiaryEntryObject)
  readByParam(campaign: string, params: {isMainSession: number | string, sessionNumber: number | string, authorName: string}): Observable<DiaryEntry>{
    const url = `${this.baseUrl}/${campaign}/${params.sessionNumber}/${params.isMainSession}/${params.authorName}/`;
    return this.http.get<DiaryEntry>(url).pipe(
      map(diaryEntry => this.parseDiaryEntry(diaryEntry)),
    );
  }
  
  private parseDiaryEntry(entry: any): DiaryEntry{
    return {
      ...entry,
      author: entry?.author_details?.pk,
      session: entry?.session_details?.pk,
    }
  }
}
