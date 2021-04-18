import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerTypeService extends GenericService{
  baseUrl: string = `${Constants.wikiApiUrl}/markertype`;

  constructor(
    http: HttpClient
  ) { super(http) }
}
