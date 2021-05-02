import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { diaryEntryEncounterConnection, DiaryEntryEncounterConnectionObject } from '../models/diaryencounterconnection';
import { GenericObjectService } from './generic-object.service';

@Injectable({
  providedIn: 'root'
})
export class DiaryentryEncounterConnectionService extends GenericObjectService{
  baseUrl = `${Constants.wikiApiUrl}/diaryentryencounterconnection`;

  constructor(http: HttpClient) { 
    super(http, DiaryEntryEncounterConnectionObject);
  }
}
