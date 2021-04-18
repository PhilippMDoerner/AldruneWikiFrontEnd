import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class EncounterConnectionService extends GenericService{
  baseUrl = `${Constants.wikiApiUrl}/encounterconnection`;

  constructor(http : HttpClient) { super(http)}
}
