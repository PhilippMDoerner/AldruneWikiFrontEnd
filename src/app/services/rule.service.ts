import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { Rule, RuleObject } from '../models/rule';
import { TransformArrayObservable, TransformObservable } from '../utils/functions/transform';
import { GenericObjectService } from './generic-object.service';

@Injectable({
  providedIn: 'root'
})
export class RuleService extends GenericObjectService{
  baseUrl: string = `${Constants.wikiApiUrl}/rule/`;

  constructor(http: HttpClient) { super(http, RuleObject)}
}
