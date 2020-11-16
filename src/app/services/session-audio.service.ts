import { HttpClient } from '@angular/common/http';
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

  @TransformObservable(SessionAudioObject)
  createSessionAudioFile(sessionAudioModel: SessionAudio): Observable<SessionAudio>{
    const formData: FormData = convertSingleFileModelToFormData(sessionAudioModel, "audio_file");
    return this.http.post<SessionAudio>(`${this.sessionAudioUrl}/`, formData);
  }

  @TransformObservable(SessionAudioObject)
  updateSessionAudioFile(sessionAudioModel: SessionAudio): Observable<SessionAudio>{
    const url = `${this.sessionAudioUrl}/pk/${sessionAudioModel.pk}`;
    return this.http.put<SessionAudio>(url, sessionAudioModel);
  }

  @TransformObservable(SessionAudioObject)
  deleteSessionAudioFile(sessionAudioEntry_pk: number): any{
    const url = `${this.sessionAudioUrl}/pk/${sessionAudioEntry_pk}`;
    return this.http.delete(url);
  }
}
