import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { CharacterPlayerClassConnection } from '../models/playerclass';
import { GenericObjectService } from './generic-object.service';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterPlayerClassConnectionService extends GenericService{
  baseUrl: string = `${Constants.wikiApiUrl}/characterplayerclassconnection`
  constructor(http: HttpClient) { super(http) }
}
