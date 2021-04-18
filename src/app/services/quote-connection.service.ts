import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteConnectionService extends GenericService {
  baseUrl: string = `${Constants.wikiApiUrl}/quoteconnection`;
  constructor(http: HttpClient) { super(http) }
}
