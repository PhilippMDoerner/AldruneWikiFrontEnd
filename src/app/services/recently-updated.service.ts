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
  getRecentlyUpdatedArticle(campaign: string, pageNumber: number): Observable<OverviewItem[]>{
    if(pageNumber == null) pageNumber = 0;

    return this.http.get<OverviewItem[]>(`${this.recentlyUpdatedUrl}/${campaign}/${pageNumber}`);
  }

  @TransformArrayObservable(OverviewArticleObject)
  getSearchedArticles(campaign: string, searchString: string): Observable<OverviewItem[]>{
    return this.http.get<OverviewItem[]>(`${this.searchUrl}/${campaign}/${searchString}`);
  }
}
