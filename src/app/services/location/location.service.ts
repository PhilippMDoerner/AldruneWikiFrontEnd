import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";
import { Location, LocationObject, SubLocation } from "src/app/models/location";
import { characterLocation } from "src/app/models/character";
import { mergeMap, toArray, map } from 'rxjs/operators';
import { TransformArrayObservable, TransformObservable } from 'src/app/utils/functions/transform';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locationUrl = `${Constants.wikiApiUrl}/location`;

  constructor(private http : HttpClient) { }

  @TransformArrayObservable(LocationObject)
  getLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(this.locationUrl);
  }

  @TransformObservable(LocationObject)
  getLocation(parentLocationName: string, locationName: string): Observable<Location>{
    const url = `${this.locationUrl}/${parentLocationName}/${locationName}/`;
    return this.http.get<Location>(url);
  }

  @TransformObservable(LocationObject)
  getLocationByPk(location_pk): Observable<Location>{
    return this.http.get<Location>(`${this.locationUrl}/pk/${location_pk}`);
  }

  @TransformObservable(LocationObject)
  updateLocation(location: Location | SubLocation): Observable<Location>{
    const url: string = `${this.locationUrl}/pk/${location.pk}/`;
    return this.http.put<Location>(url, location);
  }

  @TransformObservable(LocationObject)
  deleteLocation(location_pk: number){
    const url: string = `${this.locationUrl}/pk/${location_pk}/`;
    return this.http.delete(url);
  }

  @TransformObservable(LocationObject)
  createLocation(location: Location): Observable<Location>{
    return this.http.post<Location>(`${this.locationUrl}/`, location);
  }
}
