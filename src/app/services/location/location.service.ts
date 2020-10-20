import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";
import { Location } from "src/app/models/location";

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
