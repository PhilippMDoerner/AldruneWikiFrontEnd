import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { Quote } from '../models/quote';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteService extends GenericService{
  baseUrl: string = `${Constants.wikiApiUrl}/quote`;

  constructor(http: HttpClient) { super(http)}

  getQuotes(character_name: string): Observable<Quote[]>{
    return this.http.get<Quote[]>(`${this.baseUrl}/${character_name}/`);
  }

  getRandomQuote(character_name: string): Observable<Quote>{
    return this.http.get<Quote>(`${Constants.wikiApiUrl}/randomquote/${character_name}`);
  }

  getAllCharacterQuotes(character_name: string): Observable<Quote[]>{
    return this.http.get<Quote[]>(`${Constants.wikiApiUrl}/allquotes/${character_name}/`);
  }
}
