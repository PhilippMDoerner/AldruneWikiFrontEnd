import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { OverviewItem, OverviewItemObject } from "src/app/models/overviewItem";
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { TransformArrayObservable } from '../utils/functions/transform';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  overviewUrl: string = `${Constants.wikiApiUrl}/overview`;

  constructor(
    private http : HttpClient,
  ) { }

  @TransformArrayObservable(OverviewItemObject)
  getOverviewItems(overviewType: string): Observable<OverviewItem[]>{
    const url = `${this.overviewUrl}/${overviewType}`;
    return this.http.get<OverviewItem[]>(url,);
  }
}
