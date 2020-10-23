import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { OverviewItem } from "src/app/models/overviewItem";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  overviewUrl: string = `${Constants.wikiApiUrl}/overview`;

  constructor(private http : HttpClient) { }

  getOverviewItems(overviewType: string): Observable<OverviewItem[]>{
    const url = `${this.overviewUrl}/${overviewType}`;
    return this.http.get<OverviewItem[]>(url);
  }
}
