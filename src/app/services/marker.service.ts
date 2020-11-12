import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { MapMarker } from '../models/mapmarker';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  markerUrl: string = `${Constants.wikiApiUrl}/marker`;

  constructor(private http: HttpClient) { }

  getMapMarker(parentLocationName: string, locationName: string, mapName: string): Observable<MapMarker>{
    const url: string = `${this.markerUrl}/${parentLocationName}/${locationName}/${mapName}`;
    return this.http.get<MapMarker>(url);
  }

  updateMapMarker(mapMarker: MapMarker): Observable<MapMarker>{
    const url: string = `${this.markerUrl}/pk/${mapMarker.pk}`;
    return this.http.put<MapMarker>(url, mapMarker);
  }

  createMapMarker(mapMarker: MapMarker): Observable<MapMarker>{
    return this.http.post<MapMarker>(`${this.markerUrl}/`, mapMarker);
  }

  deleteMapMarker(mapmarker_pk:number){
    const url: string = `${this.markerUrl}/pk/${mapmarker_pk}`;
    return this.http.delete(url);
  }
}
