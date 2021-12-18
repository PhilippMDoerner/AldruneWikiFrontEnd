import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from './app.constants';
import { RelationshipMapObject } from './models/relationship-map';
import { GenericObjectService } from './services/generic-object.service';

@Injectable({
  providedIn: 'root'
})
export class RelationshipMapService  extends GenericObjectService{
  baseUrl = `${Constants.wikiApiUrl}/relationshipmap`;

  constructor(http: HttpClient) { 
    super(http, RelationshipMapObject);
  }
}