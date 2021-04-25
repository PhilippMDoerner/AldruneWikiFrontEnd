import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { SessionAudio, SessionAudioObject } from '../models/sessionaudio';
import { convertSingleFileModelToFormData } from "src/app/utils/formDataConverter";
import { TransformObservable } from '../utils/functions/transform';
import { map } from 'rxjs/operators';
import { GenericObjectService } from './generic-object.service';

@Injectable({
  providedIn: 'root'
})
export class SessionAudioService extends GenericObjectService {
  baseUrl: string = `${Constants.wikiApiUrl}/sessionaudio`

  constructor(public http: HttpClient) { super(http, SessionAudioObject)}

  @TransformObservable(SessionAudioObject)
  readByParam(params: {isMainSession: number, sessionNumber: number}): Observable<SessionAudio>{
    const url = `${this.baseUrl}/${params.isMainSession}/${params.sessionNumber}`;
    return this.http.get<SessionAudio>(url);
  }

  @TransformObservable(SessionAudioObject)
  create(sessionAudioModel: SessionAudio): Observable<any>{
    const headers = new HttpHeaders({ 'ngsw-bypass': 'true'});

    const formData: FormData = convertSingleFileModelToFormData(sessionAudioModel, "audio_file");
    return this.http.post<any>(`${this.baseUrl}/`, formData, {
      reportProgress: true,
      observe: 'events',
      headers: headers
    });
  }

  @TransformObservable(SessionAudioObject)
  update(audioPk: number, sessionAudioModel: SessionAudio): Observable<any>{
    const url = `${this.baseUrl}/pk/${audioPk}`;
    const formData: FormData = convertSingleFileModelToFormData(sessionAudioModel, "audio_file");

    return this.http.put<any>(url, formData);
  }
}
