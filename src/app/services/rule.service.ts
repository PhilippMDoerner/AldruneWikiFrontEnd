import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { Rule } from '../models/rule';

@Injectable({
  providedIn: 'root'
})
export class RuleService {
  rulesUrl: string = `${Constants.wikiApiUrl}/rule/`;

  constructor(private http: HttpClient) {}

  getRules(): Observable<Rule[]>{
    return this.http.get<Rule[]>(`${this.rulesUrl}`);
  }
}
