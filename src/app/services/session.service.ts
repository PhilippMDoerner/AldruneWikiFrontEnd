import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { Session, SessionObject } from '../models/session';
import { TransformArrayObservable, TransformObservable } from '../utils/functions/transform';

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"}),
}

@Injectable({
  providedIn: 'root'
})


export class SessionService {
  sessionUrl: string = `${Constants.wikiApiUrl}/session`;

  constructor(private http : HttpClient) { }

  @TransformArrayObservable(SessionObject)
  getSessions(): Observable<Session[]>{
    return this.http.get<Session[]>(this.sessionUrl);
  }

  @TransformObservable(SessionObject)
  getSession(sessionNumber: number, isMainSession: boolean | number): Observable<Session>{
    if (typeof isMainSession === "boolean") isMainSession = (isMainSession) ? 1 : 0;
    return this.http.get<Session>(`${this.sessionUrl}/${sessionNumber}/${isMainSession}`);
  }

  @TransformObservable(SessionObject)
  getSessionByPk(session_pk: number): Observable<Session>{
    return this.http.get<Session>(`${this.sessionUrl}/pk/${session_pk}`);
  }

  @TransformObservable(SessionObject)
  updateSession(model: SessionObject): Observable<Session>{
    const isMainSession = (model.is_main_session) ? 1 : 0;
    const url: string = `${this.sessionUrl}/pk/${model.pk}/`;
    console.log("Update session called with this model");
    console.log(model);
    return this.http.put<Session>(url, model);
  }

  @TransformObservable(SessionObject)
  createSession(model: SessionObject): Observable<Session>{
    return this.http.post<Session>(`${this.sessionUrl}/`, model);
  }

  deleteSession(session_pk: number): Observable<any>{
    const url: string = `${this.sessionUrl}/pk/${session_pk}`;
    return this.http.delete(url);
  }
}
