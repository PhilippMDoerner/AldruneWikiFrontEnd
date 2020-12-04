import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { Timestamp, TimestampObject } from '../models/timestamp';
import { TransformArrayObservable, TransformObservable, transformObservableContent } from '../utils/functions/transform';

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"}),
}

@Injectable({
  providedIn: 'root'
})
export class SessionAudioTimestampService {
  timestampUrl:string = `${Constants.wikiApiUrl}/timestamp`

  constructor(private http: HttpClient) { }

  @TransformArrayObservable(TimestampObject)
  getTimestamps(isMainSessionInt: number, sessionNumber: number): Observable<Timestamp[]>{
    return this.http.get<Timestamp[]>(`${this.timestampUrl}list/${isMainSessionInt}/${sessionNumber}`);
  }

  @TransformObservable(TimestampObject)
  createTimestamp(timestamp: TimestampObject): Observable<Timestamp>{
    const url: string = `${this.timestampUrl}/`;
    return this.http.post<Timestamp>(url, timestamp);
  }

  deleteTimestamp(timestamp_pk:number){
    const url: string = `${this.timestampUrl}/pk/${timestamp_pk}`;
    return this.http.delete(url);
  }
}
