import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { OverviewItem } from '../models/overviewItem';
import { Article, OverviewArticleObject } from '../models/recentlyUpdatedArticle';
import { TransformArrayObservable } from '../utils/functions/transform';

@Injectable({
  providedIn: 'root'
})
export class RecentlyUpdatedService {
  recentlyUpdatedUrl: string = `${Constants.wikiApiUrl}/recentupdates`
  searchUrl: string = `${Constants.wikiApiUrl}/search`

  constructor(private http: HttpClient) { }

  @TransformArrayObservable(OverviewArticleObject)
  getRecentlyUpdatedArticle(): Observable<OverviewItem[]>{
    return this.http.get<OverviewItem[]>(this.recentlyUpdatedUrl)
  }

  @TransformArrayObservable(OverviewArticleObject)
  getSearchedArticles(searchString: string): Observable<OverviewItem[]>{
    return this.http.get<OverviewItem[]>(`${this.searchUrl}/${searchString}`);
  }
}
