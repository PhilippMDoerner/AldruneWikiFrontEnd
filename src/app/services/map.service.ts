import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { ExtendedMap, Map } from '../models/map';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  mapUrl: string = `${Constants.wikiApiUrl}/map`;

  constructor(private http: HttpClient) { }

  getMap(mapName: string): Observable<ExtendedMap>{
    return this.http.get<ExtendedMap>(`${this.mapUrl}/${mapName}`);
  }

  createMap(map: Map): Observable<ExtendedMap>{
    return this.http.post<ExtendedMap>(`${this.mapUrl}/`, map);
  }

  deleteMap(map_pk: number): Observable<any>{
    return this.http.delete(`${this.mapUrl}/pk/${map_pk}`)
  }

  updateMap(map: Map): Observable<ExtendedMap>{
    const url: string = `${this.mapUrl}/pk/${map.pk}`;
    return this.http.put<ExtendedMap>(url, map);
  }

  getFoliumMap(mapName: string): Observable<any>{
    const url: string = `${this.mapUrl}/folium/${mapName}`
    return this.http.get(url);
  }
}
