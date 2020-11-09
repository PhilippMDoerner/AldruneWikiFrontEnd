import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { Timestamp } from '../models/timestamp';

@Injectable({
  providedIn: 'root'
})
export class SessionAudioTimestampService {
  timestampUrl:string = `${Constants.wikiApiUrl}/timestamp`

  constructor(private http: HttpClient) { }

  getTimestamps(isMainSessionInt: number, sessionNumber: number): Observable<Timestamp[]>{
    return this.http.get<Timestamp[]>(`${this.timestampUrl}list/${isMainSessionInt}/${sessionNumber}`);
  }

  createTimestamp(timestamp: Timestamp): Observable<Timestamp>{
    const url: string = `${this.timestampUrl}/`;
    return this.http.post<Timestamp>(url, timestamp);
  }

  deleteTimestamp(timestamp_pk:number){
    const url: string = `${this.timestampUrl}/pk/${timestamp_pk}`;
    return this.http.delete(url);
  }
}
