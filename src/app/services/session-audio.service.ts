import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from 'protractor';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { SessionAudio } from '../models/sessionaudio';

@Injectable({
  providedIn: 'root'
})
export class SessionAudioService {
  sessionAudioUrl: string = `${Constants.wikiApiUrl}/sessionaudio`

  constructor(private http: HttpClient) { }

  getSessionAudioFile(isMainSession: number, sessionNumber: number): Observable<SessionAudio>{
    const url = `${this.sessionAudioUrl}/${isMainSession}/${sessionNumber}`;
    return this.http.get<SessionAudio>(url);
  }

  createSessionAudioFile(sessionAudioEntry: SessionAudio): Observable<SessionAudio>{
    return this.http.post<SessionAudio>(`${this.sessionAudioUrl}/`, sessionAudioEntry);
  }

  updateSessionAudioFile(sessionAudioEntry: SessionAudio): Observable<SessionAudio>{
    const url = `${this.sessionAudioUrl}/pk/${sessionAudioEntry.pk}`;
    return this.http.put<SessionAudio>(url, sessionAudioEntry);
  }

  deleteSessionAudioFile(sessionAudioEntry_pk: number): any{
    const url = `${this.sessionAudioUrl}/pk/${sessionAudioEntry_pk}`;
    return this.http.delete(url);
  }
}
