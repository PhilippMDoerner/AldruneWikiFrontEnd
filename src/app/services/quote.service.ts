import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { Quote } from '../models/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  quoteUrl: string = `${Constants.wikiApiUrl}/quote`;

  constructor(private http: HttpClient) { }

  getQuotes(character_name: string): Observable<Quote[]>{
    return this.http.get<Quote[]>(`${this.quoteUrl}/${character_name}`);
  }

  getRandomQuote(character_name: string): Observable<Quote>{
    return this.http.get<Quote>(`${Constants.wikiApiUrl}/randomquote/${character_name}`);
  }

  getAllCharacterQuotes(character_name: string): Observable<Quote[]>{
    return this.http.get<Quote[]>(`${Constants.wikiApiUrl}/allquotes/${character_name}`);
  }

  createQuote(quote: Quote): Observable<Quote>{
    return this.http.post<Quote>(`${this.quoteUrl}/`, quote);
  }

  deleteQuote(quote_pk: number): Observable<any>{
    const url: string = `${this.quoteUrl}/pk/${quote_pk}`;
    return this.http.delete(url);
  }

  updateQuote(quote: Quote): Observable<Quote>{
    const url: string = `${this.quoteUrl}/pk/${quote.pk}`;
    return this.http.put<Quote>(url, quote);
  }
}
