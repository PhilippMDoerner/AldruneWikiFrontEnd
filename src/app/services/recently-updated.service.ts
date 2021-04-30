import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
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
  getRecentlyUpdatedArticle(): Observable<Article[]>{
    return this.http.get<Article[]>(this.recentlyUpdatedUrl)
  }

  @TransformArrayObservable(OverviewArticleObject)
  getSearchedArticles(searchString: string): Observable<Article[]>{
    return this.http.get<Article[]>(`${this.searchUrl}/${searchString}`);
  }
}
