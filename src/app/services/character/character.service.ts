import { Injectable } from '@angular/core';
import { Constants } from "src/app/app.constants";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Character, CharacterObject } from "src/app/models/character";
import { Observable } from "rxjs";
import { OverviewItem, OverviewItemObject } from "src/app/models/overviewItem";
import { map } from 'rxjs/operators';
import { TransformObservable, TransformArrayObservable } from "src/app/utils/functions/transform"
import { GenericObjectService } from '../generic-object.service';

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"}),
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService extends GenericObjectService{
  baseUrl: string =  `${Constants.wikiApiUrl}/character`;
  
  constructor(private http2: HttpClient) { 
    super(http2, CharacterObject) //Second param indicates which class the data of this service is turned into
  }

  @TransformArrayObservable(OverviewItemObject)
  getPlayerCharacters(): Observable<OverviewItem[]>{
    const url = `${Constants.wikiApiUrl}/playercharacters`;
    return this.http2.get<OverviewItem[]>(url);
  }

  @TransformArrayObservable(OverviewItemObject)
  getNonPlayerCharacters(): Observable<OverviewItem[]>{
    const url = `${Constants.wikiApiUrl}/nonplayercharacters`;
    return this.http2.get<OverviewItem[]>(url);  
  }
}


