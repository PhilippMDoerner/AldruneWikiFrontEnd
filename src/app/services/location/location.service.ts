import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";
import { Location } from "src/app/models/location";
import { characterLocation } from "src/app/models/character";
import { mergeMap, toArray, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locationUrl = `${Constants.wikiApiURL}/location`;

  constructor(private http : HttpClient) { }

  getLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(this.locationUrl);
  }

  getLocation(): Observable<Location>{
    const url = (typeof location === 'number') ? `${this.locationUrl}/pk/${location}` :  `${this.locationUrl}/${location}`;
    return this.http.get<Location>(this.locationUrl);  }

  getLocationsFormList(): Observable<{label: string, value: characterLocation}[]>{
    const locationObs = this.getLocations();
    return locationObs.pipe(
      mergeMap((asIs: Location[]) => asIs),
      map((location: Location) => ({
        label: location.name_full,
        value: {
          pk: location.pk,
          name: location.name,
          name_full: location.name_full,
          parent_location: location.parent_location ? location.parent_location.name : null
        }
      })),
      toArray(),
    );
  }

  updateLocation(): void{ //Observable<Location>{
    console.log("Totally updated the Location!");
  }

  deleteLocation(): void{ //Observable<Location>{
    console.log("Totally deleted the Location!");
  }

  createLocation(): void{
    console.log("Totally created the Location!");
  }
}
