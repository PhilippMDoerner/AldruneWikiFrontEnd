import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { MapMarker, MapMarkerObject } from '../models/mapmarker';
import { TransformObservable } from '../utils/functions/transform';
import { GenericObjectService } from './generic-object.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService extends GenericObjectService{
  baseUrl: string = `${Constants.wikiApiUrl}/marker`;

  constructor(http: HttpClient) { super(http, MapMarkerObject) }

  @TransformObservable(MapMarkerObject)
  readByParam(campaign: string, param: {parentLocationName: string, locationName: string, mapName: string}): Observable<MapMarker>{
    const url: string = `${this.baseUrl}/${campaign}/${param.parentLocationName}/${param.locationName}/${param.mapName}`;
    return this.http.get<MapMarker>(url);
  }
}
