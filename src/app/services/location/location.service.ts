import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";
import { Location, LocationObject } from "src/app/models/location";
import { TransformObservable, transformObservableContent } from 'src/app/utils/functions/transform';
import { GenericObjectService } from '../generic-object.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends GenericObjectService{
  baseUrl: string = `${Constants.wikiApiUrl}/location`;

  constructor(http : HttpClient) { super(http, LocationObject) }

  readByParam(campaign: string, params: {parentLocationName: string, locationName: string}): Observable<LocationObject>{
    const url = `${this.baseUrl}/${campaign}/${params.parentLocationName}/${params.locationName}/`;
    const dataObs: Observable<Location> = this.http.get<Location>(url);
    return transformObservableContent(dataObs, LocationObject);
  }
}
