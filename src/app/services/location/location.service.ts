import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";
import { Location, LocationObject, SubLocation } from "src/app/models/location";
import { TransformArrayObservable, TransformObservable } from 'src/app/utils/functions/transform';
import { GenericObjectService } from '../generic-object.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends GenericObjectService{
  baseUrl: string = `${Constants.wikiApiUrl}/location`;

  constructor(http : HttpClient) { super(http, LocationObject) }

  @TransformObservable(LocationObject)
  readByParam(params: {parentLocationName: string, locationName: string}): Observable<Location>{
    const url = `${this.baseUrl}/${params.parentLocationName}/${params.locationName}/`;
    return this.http.get<Location>(url);
  }
}
