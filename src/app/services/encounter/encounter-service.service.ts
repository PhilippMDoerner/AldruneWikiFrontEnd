import { Injectable } from '@angular/core';
import { Encounter, EncounterObject } from "src/app/models/encounter";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";
import { TransformArrayObservable, TransformObservable, transformObservableArrayContent, transformObservableContent } from 'src/app/utils/functions/transform';
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

  getDiaryEntryEncounters(session_pk: number, authorName: string): Observable<EncounterObject[]>{
    const url = `${this.baseUrl}/session/${session_pk}/${authorName}`;
    const encounterObs: Observable<Encounter[]> = this.http.get<Encounter[]>(url);
    return transformObservableArrayContent(encounterObs, EncounterObject);
  }

  createForDiaryentry(campaign: string, encounter: Encounter): Observable<EncounterObject[]>{
    const url = `${this.baseUrl}/`;
    const encounterObs: Observable<Encounter[]> = this.http.post<Encounter[]>(url, encounter);
    return transformObservableArrayContent(encounterObs, EncounterObject);
  }

  swapEncounterOrder(campaign: string, encounter1_pk: number, encounter2_pk: number): Observable<EncounterObject[]>{
    const url = `${this.baseUrl}/${campaign}/orderswap/`;
    const requestBody = {"encounter1": encounter1_pk, "encounter2": encounter2_pk};

    const swapObs: Observable<Encounter[]> = this.http.patch<Encounter[]>(url, requestBody);
    return transformObservableArrayContent(swapObs, EncounterObject);
  }

  cutInsertEncounter(campaign: string, encounter: Encounter, newOrderIndex: number): Observable<EncounterObject[]>{
    const url = `${this.baseUrl}/${campaign}/cutinsert/`;
    const requestBody = {
      "encounter": encounter.pk, 
      "old_order_index": encounter.order_index, 
      "new_order_index": newOrderIndex
    };
    
    const cutInsertObs: Observable<Encounter[]> = this.http.patch<Encounter[]>(url, requestBody);
    return transformObservableArrayContent(cutInsertObs, EncounterObject);
  }

}
