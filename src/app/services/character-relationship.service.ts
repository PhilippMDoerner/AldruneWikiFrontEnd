import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { CharacterRelationshipObject } from '../models/character-relationship';
import { GenericObjectService } from './generic-object.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterRelationshipService extends GenericObjectService{
  baseUrl: string = `${Constants.wikiApiUrl}/characterrelationship`

  constructor(http: HttpClient) {
    super(http, CharacterRelationshipObject);
   }
}
