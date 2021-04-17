import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { MapMarker } from '../models/mapmarker';
import { MapMarkerType } from '../models/mapmarkertype';
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
