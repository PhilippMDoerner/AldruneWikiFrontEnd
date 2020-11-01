import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { EncounterConnection } from '../models/encounterconnection';

@Injectable({
  providedIn: 'root'
})
export class EncounterConnectionService {
  encounterConnectionUrl = `${Constants.wikiApiUrl}/encounterconnection`;

  constructor(private http : HttpClient) { }

  getEncounterConnection(encounterConnection_pk: number): Observable<EncounterConnection>{
    const url: string = `${this.encounterConnectionUrl}/pk/${encounterConnection_pk}`;
    return this.http.get<EncounterConnection>(url);
  }

  deleteEncounterConnection(encounterConnection_pk: number){
    const url: string = `${this.encounterConnectionUrl}/pk/${encounterConnection_pk}`;
    return this.http.delete(url);
  }

  createEncounterConnection(encounterConnection: EncounterConnection): Observable<EncounterConnection>{
    return this.http.post<EncounterConnection>(`${this.encounterConnectionUrl}/`, encounterConnection);
  }
}
