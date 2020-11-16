import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { Rule, RuleObject } from '../models/rule';
import { TransformArrayObservable, TransformObservable } from '../utils/functions/transform';

@Injectable({
  providedIn: 'root'
})
export class RuleService {
  rulesUrl: string = `${Constants.wikiApiUrl}/rule/`;

  constructor(private http: HttpClient) {}

  @TransformArrayObservable(RuleObject)
  getRules(): Observable<Rule[]>{
    return this.http.get<Rule[]>(`${this.rulesUrl}`);
  }

  @TransformObservable(RuleObject)
  getRule(name: string): Observable<Rule>{
    return this.http.get<Rule>(`${this.rulesUrl}/${name}`);
  }

  @TransformObservable(RuleObject)
  createRule(rule: Rule): Observable<Rule>{
    return this.http.post<Rule>(`${this.rulesUrl}/`, rule);
  }

  @TransformObservable(RuleObject)
  updateRule(rule: Rule): Observable<Rule>{
    return this.http.put<Rule>(`${this.rulesUrl}/${rule.name}`, rule);
  }

  @TransformObservable(RuleObject)
  deleteRule(rule_pk: number): Observable<Rule>{
    return this.http.delete<Rule>(`${this.rulesUrl}/${rule_pk}`);
  }
}
