import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { SessionAudio, SessionAudioObject } from '../models/sessionaudio';
import { convertSingleFileModelToFormData } from "src/app/utils/formDataConverter";
import { TransformObservable } from '../utils/functions/transform';

@Injectable({
  providedIn: 'root'
})
export class SessionAudioService {
  sessionAudioUrl: string = `${Constants.wikiApiUrl}/sessionaudio`

  constructor(private http: HttpClient) { }

  @TransformObservable(SessionAudioObject)
  getSessionAudioFile(isMainSession: number, sessionNumber: number): Observable<SessionAudio>{
    const url = `${this.sessionAudioUrl}/${isMainSession}/${sessionNumber}`;
    return this.http.get<SessionAudio>(url);
  }

  createSessionAudioFile(sessionAudioModel: SessionAudio): Observable<any>{
    const headers = new HttpHeaders({ 'ngsw-bypass': ''});

    const formData: FormData = convertSingleFileModelToFormData(sessionAudioModel, "audio_file");
    return this.http.post<any>(`${this.sessionAudioUrl}/`, formData, {
      reportProgress: true,
      observe: 'events',
      headers: headers
    });
  }

  updateSessionAudioFile(sessionAudioModel: SessionAudio): Observable<any>{
    const url = `${this.sessionAudioUrl}/pk/${sessionAudioModel.pk}`;
    const formData: FormData = convertSingleFileModelToFormData(sessionAudioModel, "audio_file");

    return this.http.put<any>(url, formData);
  }

  deleteSessionAudioFile(sessionAudioEntry_pk: number): any{
    const url = `${this.sessionAudioUrl}/pk/${sessionAudioEntry_pk}`;
    return this.http.delete(url);
  }
}
