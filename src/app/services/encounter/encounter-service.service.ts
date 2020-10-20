import { Injectable } from '@angular/core';
import { Encounter } from "src/app/models/encounter";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"}),
}

@Injectable({
  providedIn: 'root'
})
export class EncounterServiceService {
  encounterUrl: string = `${Constants.wikiApiURL}/encounter`;

  constructor(private http: HttpClient) { 
  }

  getEncounters(character_pk: number): Observable<Encounter[]>{
    const url = `${this.encounterUrl}/character/${character_pk}`;
    return this.http.get<Encounter[]>(url);
  }

  getEncounter(encounter_pk: number): Observable<Encounter>{
    const url = `${this.encounterUrl}/pk/${encounter_pk}`;
    return this.http.get<Encounter>(url);  
  }

  updateEncounter(encounter_pk: number): void{//: Observable<Encounter>{
    const url = `${this.encounterUrl}/pk/${encounter_pk}`;
    console.log("Update the Encounter");
  }

  createEncounter(encounter_pk: number): void{//: Observable<Encounter>{
    const url = `${this.encounterUrl}/pk/${encounter_pk}`;
    console.log("Create the Encounter");
  }

  deleteEncounter(encounter_pk: number): void{//Observable<Encounter>{
    const url = `${this.encounterUrl}/pk/${encounter_pk}`;
    console.log("Delete the Encounter");
  }
}
