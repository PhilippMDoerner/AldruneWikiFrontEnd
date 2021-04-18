import { Injectable } from '@angular/core';
import { Encounter, EncounterObject } from "src/app/models/encounter";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";
import { TransformArrayObservable, TransformObservable } from 'src/app/utils/functions/transform';
import { GenericObjectService } from '../generic-object.service';

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"}),
}

@Injectable({
  providedIn: 'root'
})
export class EncounterServiceService extends GenericObjectService {
  baseUrl: string = `${Constants.wikiApiUrl}/encounter`;

  constructor(http: HttpClient) { super(http, EncounterObject) }

  @TransformArrayObservable(EncounterObject)
  getDiaryEntryEncounters(session_pk: number, authorName: string): Observable<Encounter[]>{
    const url = `${this.baseUrl}/session/${session_pk}/${authorName}`;
    return this.http.get<Encounter[]>(url);
  }

}
