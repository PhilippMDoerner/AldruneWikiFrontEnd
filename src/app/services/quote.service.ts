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

  getQuotes(campaign: string, character_name: string): Observable<Quote[]>{
    return this.http.get<Quote[]>(`${this.baseUrl}/${campaign}/${character_name}/`);
  }

  getRandomQuote(campaign: string, character_name: string): Observable<Quote>{
    return this.http.get<Quote>(`${this.baseUrl}/${campaign}/${character_name}/random`);
  }

  getAllCharacterQuotes(campaign: string, character_name: string): Observable<Quote[]>{
    return this.http.get<Quote[]>(`${this.baseUrl}/${campaign}/${character_name}`);
  }
}
