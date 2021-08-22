import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { OverviewItem, OverviewItemObject } from "src/app/models/overviewItem";
import { Observable } from 'rxjs';
import { TransformArrayObservable } from '../utils/functions/transform';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  overviewUrl: string = `${Constants.wikiApiUrl}`;

  constructor(
    private http : HttpClient,
  ) { }

  @TransformArrayObservable(OverviewItemObject)
  getOverviewItems(campaign: string, overviewType: string): Observable<OverviewItem[]>{
    const url = this.createOverviewUrl(campaign, overviewType);
    return this.http.get<OverviewItem[]>(url,);
  }

  private createOverviewUrl(campaign: string, overviewType: string): string{
    return `${this.overviewUrl}/${overviewType}/${campaign}/overview/`;
  }
}
