import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { convertSingleFileModelToFormData } from "src/app/utils/formDataConverter";
import { Constants } from '../app.constants';
import { SessionAudio, SessionAudioObject } from '../models/sessionaudio';
import { TransformObservable } from '../utils/functions/transform';
import { GenericObjectService } from './generic-object.service';

@Injectable({
  providedIn: 'root'
})
export class SessionAudioService extends GenericObjectService {
  baseUrl: string = `${Constants.wikiApiUrl}/sessionaudio`

  constructor(public http: HttpClient) { super(http, SessionAudioObject)}

  @TransformObservable(SessionAudioObject)
  readByParam(campaign: string, params: {isMainSession: number, sessionNumber: number}): Observable<SessionAudio>{
    const url = `${this.baseUrl}/${campaign}/${params.isMainSession}/${params.sessionNumber}/`;
    return this.http.get<SessionAudio>(url);
  }

  uploadFile(fileName: string, file: File): Observable<any>{
    const headers = new HttpHeaders({ 
      'ngsw-bypass': 'true',
      'X-Progress-ID': fileName,
    });

    return this.http.post<any>(`${Constants.wikiAudioUploadUrl}/${fileName}`, file, {
      reportProgress: true,
      observe: 'events',
      headers: headers
    });
  }

  //@TransformObservable(SessionAudioObject)
  update(audioPk: number, sessionAudioModel: SessionAudio): Observable<any>{
    const url = `${this.baseUrl}/pk/${audioPk}/`;
    const formData: FormData = convertSingleFileModelToFormData(sessionAudioModel, "audio_file");
    const headers = new HttpHeaders({ 'ngsw-bypass': 'true'});

    return this.http.put<any>(url, formData, { 
      headers: headers,
      observe: 'events', 
      reportProgress: true
    } as any); //This bit is only required as otherwise there's some typescript definition missing and throwing errors
  }

  
}
