import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { Session, SessionObject } from '../models/session';
import { TransformArrayObservable, TransformObservable } from '../utils/functions/transform';
import { GenericObjectService } from './generic-object.service';

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"}),
}

@Injectable({
  providedIn: 'root'
})


export class SessionService extends GenericObjectService {
  baseUrl: string = `${Constants.wikiApiUrl}/session`;

  constructor(http : HttpClient) { super(http, SessionObject)}

  @TransformObservable(SessionObject)
  getSession(sessionNumber: number, isMainSession: boolean | number): Observable<Session>{
    if (typeof isMainSession === "boolean") isMainSession = (isMainSession) ? 1 : 0;
    return this.http.get<Session>(`${this.baseUrl}/${sessionNumber}/${isMainSession}`);
  }
}
