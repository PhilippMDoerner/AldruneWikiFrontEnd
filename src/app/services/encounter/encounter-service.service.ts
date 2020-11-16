import { Injectable } from '@angular/core';
import { Encounter, EncounterObject } from "src/app/models/encounter";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";
import { TransformArrayObservable, TransformObservable } from 'src/app/utils/functions/transform';

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"}),
}

@Injectable({
  providedIn: 'root'
})
export class EncounterServiceService {
  encounterUrl: string = `${Constants.wikiApiUrl}/encounter`;

  constructor(private http: HttpClient) {}

  @TransformArrayObservable(EncounterObject)
  getEncounters(): Observable<Encounter[]>{
    const url = `${this.encounterUrl}`;
    return this.http.get<Encounter[]>(url);
  }

  @TransformObservable(EncounterObject)
  getEncounter(encounter_pk: number): Observable<Encounter>{
    const url = `${this.encounterUrl}/pk/${encounter_pk}`;
    return this.http.get<Encounter>(url);  
  }

  @TransformObservable(EncounterObject)
  updateEncounter(encounter: Encounter): Observable<Encounter>{
    const url = `${this.encounterUrl}/pk/${encounter.pk}/`;
    return this.http.put<Encounter>(url, encounter);
  }

  @TransformObservable(EncounterObject)
  createEncounter(encounter: Encounter): Observable<Encounter>{
    return this.http.post<Encounter>(`${this.encounterUrl}/`, encounter);
  }

  @TransformObservable(EncounterObject)
  deleteEncounter(encounter_pk: number): Observable<Encounter>{
    const url = `${this.encounterUrl}/pk/${encounter_pk}`;
    return this.http.delete<Encounter>(url);
  }
}
