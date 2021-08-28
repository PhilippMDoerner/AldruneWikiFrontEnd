import { Injectable } from '@angular/core';
import { Constants } from "src/app/app.constants";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CharacterObject } from "src/app/models/character";
import { Observable } from "rxjs";
import { OverviewItem, OverviewItemObject } from "src/app/models/overviewItem";
import { TransformArrayObservable } from "src/app/utils/functions/transform"
import { GenericObjectService } from '../generic-object.service';

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"}),
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService extends GenericObjectService{
  baseUrl: string =  `${Constants.wikiApiUrl}/character`;
  
  constructor(http: HttpClient) { 
    super(http, CharacterObject); //Second param indicates which class the data of this service is turned into
  }

  @TransformArrayObservable(OverviewItemObject)
  getPlayerCharacters(campaign: string): Observable<OverviewItem[]>{
    const url = `${this.baseUrl}/${campaign}/playercharacters`;
    return this.http.get<OverviewItem[]>(url);
  }

  @TransformArrayObservable(OverviewItemObject)
  getNonPlayerCharacters(campaign: string): Observable<OverviewItem[]>{
    const url = `${this.baseUrl}/${campaign}/nonplayercharacters`;
    return this.http.get<OverviewItem[]>(url);  
  }
}


