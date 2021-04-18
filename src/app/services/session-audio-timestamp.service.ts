import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { Timestamp, TimestampObject } from '../models/timestamp';
import { TransformArrayObservable, TransformObservable, transformObservableContent } from '../utils/functions/transform';
import { GenericObjectService } from './generic-object.service';

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"}),
}

@Injectable({
  providedIn: 'root'
})
export class SessionAudioTimestampService extends GenericObjectService{
  baseUrl:string = `${Constants.wikiApiUrl}/timestamp`

  constructor(http: HttpClient) { super(http, TimestampObject) }

  @TransformArrayObservable(TimestampObject)
  getTimestamps(isMainSessionInt: number, sessionNumber: number): Observable<Timestamp[]>{
    return this.http.get<Timestamp[]>(`${this.baseUrl}list/${isMainSessionInt}/${sessionNumber}`);
  }
}
