import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { RuleObject } from '../models/rule';
import { GenericObjectService } from './generic-object.service';

@Injectable({
  providedIn: 'root'
})
export class RuleService extends GenericObjectService{
  baseUrl: string = `${Constants.wikiApiUrl}/rule`;

  constructor(http: HttpClient) { super(http, RuleObject)}
}
