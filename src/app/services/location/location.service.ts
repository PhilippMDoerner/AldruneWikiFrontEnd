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
  locationUrl = `${Constants.wikiApiUrl}/location`;

  constructor(private http : HttpClient) { }

  getLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(this.locationUrl);
  }

  getLocation(parentLocationName: string, locationName: string): Observable<Location>{
    const url = `${this.locationUrl}/${parentLocationName}/${locationName}/`;
    return this.http.get<Location>(url);
  }

  getLocationByPk(location_pk): Observable<Location>{
    return this.http.get<Location>(`${this.locationUrl}/pk/${location_pk}`);
  }

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
          parent_location: location.parent_location ? location.parent_location_details.name : null
        }
      })),
      toArray(),
    );
  }

  updateLocation(location: Location): Observable<Location>{
    const url: string = `${this.locationUrl}/pk/${location.pk}/`;
    return this.http.put<Location>(url, location);
  }

  deleteLocation(location_pk: number){
    const url: string = `${this.locationUrl}/pk/${location_pk}/`;
    return this.http.delete(url);
  }

  createLocation(location: Location): Observable<Location>{
    return this.http.post<Location>(`${this.locationUrl}/`, location);
  }
}
