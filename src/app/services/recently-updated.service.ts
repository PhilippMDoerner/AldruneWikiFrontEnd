import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { RecentlyUpdatedArticle } from '../models/recentlyUpdatedArticle';

@Injectable({
  providedIn: 'root'
})
export class RecentlyUpdatedService {
  recentlyUpdatedUrl: string = `${Constants.wikiApiUrl}/recentupdates`

  constructor(private http: HttpClient) { }

  getRecentlyUpdatedArticle(): Observable<RecentlyUpdatedArticle[]>{
    return this.http.get<RecentlyUpdatedArticle[]>(this.recentlyUpdatedUrl)
  }
}
