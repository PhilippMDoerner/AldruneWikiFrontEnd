import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { ExtendedMap, Map, MapObject } from '../models/map';
import { convertSingleFileModelToFormData } from "src/app/utils/formDataConverter";
import { TransformObservable } from '../utils/functions/transform';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  mapUrl: string = `${Constants.wikiApiUrl}/map`;

  constructor(private http: HttpClient) { }

  @TransformObservable(MapObject)
  getMap(mapName: string): Observable<ExtendedMap>{
    return this.http.get<ExtendedMap>(`${this.mapUrl}/${mapName}`);
  }

  @TransformObservable(MapObject)
  createMap(map: Map): Observable<ExtendedMap>{
    const formData: FormData = convertSingleFileModelToFormData(map, "image");
    return this.http.post<ExtendedMap>(`${this.mapUrl}/`, formData);
  }

  deleteMap(map_pk: number): Observable<any>{
    return this.http.delete(`${this.mapUrl}/pk/${map_pk}`)
  }

  @TransformObservable(MapObject)
  updateMap(map: Map): Observable<ExtendedMap>{
    const formData: FormData = convertSingleFileModelToFormData(map, "image");
    const url: string = `${this.mapUrl}/pk/${map.pk}`;
    return this.http.put<ExtendedMap>(url, formData);
  }
}
