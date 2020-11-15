import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { QuoteConnection } from '../models/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteConnectionService {
  quoteConnectionUrl: string = `${Constants.wikiApiUrl}/quoteconnection`;
  constructor(private http: HttpClient) { }

  createQuoteConnection(connection: QuoteConnection): Observable<QuoteConnection>{
    return this.http.post<QuoteConnection>(`${this.quoteConnectionUrl}/`, connection);
  }

  deleteQuoteConnection(connection_pk: number): Observable<any>{
    const url: string = `${this.quoteConnectionUrl}/pk/${connection_pk}`;
    return this.http.delete(url);
  }
}
