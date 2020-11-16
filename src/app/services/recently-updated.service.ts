import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { Article, ArticleObject } from '../models/recentlyUpdatedArticle';
import { TransformArrayObservable } from '../utils/functions/transform';

@Injectable({
  providedIn: 'root'
})
export class RecentlyUpdatedService {
  recentlyUpdatedUrl: string = `${Constants.wikiApiUrl}/recentupdates`
  searchUrl: string = `${Constants.wikiApiUrl}/search`

  constructor(private http: HttpClient) { }

  @TransformArrayObservable(ArticleObject)
  getRecentlyUpdatedArticle(): Observable<Article[]>{
    return this.http.get<Article[]>(this.recentlyUpdatedUrl)
  }

  @TransformArrayObservable(ArticleObject)
  getSearchedArticles(searchString: string): Observable<Article[]>{
    return this.http.get<Article[]>(`${this.searchUrl}/${searchString}`);
  }
}
