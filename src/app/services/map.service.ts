import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { ExtendedMap, Map, MapObject } from '../models/map';
import { convertSingleFileModelToFormData } from "src/app/utils/formDataConverter";
import { TransformObservable } from '../utils/functions/transform';
import { GenericObjectService } from './generic-object.service';

@Injectable({
  providedIn: 'root'
})
export class MapService extends GenericObjectService{
  baseUrl: string = `${Constants.wikiApiUrl}/map`;

  constructor(http: HttpClient) { super(http, MapObject)}

  @TransformObservable(MapObject)
  create(map: Map): Observable<ExtendedMap>{
    const formData: FormData = convertSingleFileModelToFormData(map, "image");
    return this.http.post<ExtendedMap>(`${this.baseUrl}/`, formData);
  }

  @TransformObservable(MapObject)
  update(mapPk: number, map: Map): Observable<ExtendedMap>{
    const hasImageFile = map.image.constructor.name === "FileList";
    let formData: FormData | Map;
    if(hasImageFile){
      formData = convertSingleFileModelToFormData(map, "image");
    } else {
      delete map.image;
      formData = map;
    }
    console.log(formData);
    return this.http.patch<ExtendedMap>(`${this.baseUrl}/pk/${mapPk}/`, formData);
  }
}
