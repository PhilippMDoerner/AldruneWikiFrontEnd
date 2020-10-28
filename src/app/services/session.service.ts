import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { Session } from '../models/session';

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"}),
}

@Injectable({
  providedIn: 'root'
})


export class SessionService {
  sessionUrl: string = `${Constants.wikiApiUrl}/session`;

  constructor(private http : HttpClient) { }

  getSessions(){
    return this.http.get<Session[]>(this.sessionUrl);
  }
}
