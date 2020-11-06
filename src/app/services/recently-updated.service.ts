import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { Article } from '../models/recentlyUpdatedArticle';

@Injectable({
  providedIn: 'root'
})
export class RecentlyUpdatedService {
  recentlyUpdatedUrl: string = `${Constants.wikiApiUrl}/recentupdates`
  searchUrl: string = `${Constants.wikiApiUrl}/search`

  constructor(private http: HttpClient) { }

  getRecentlyUpdatedArticle(): Observable<Article[]>{
    return this.http.get<Article[]>(this.recentlyUpdatedUrl)
  }

  getSearchedArticles(searchString: string): Observable<Article[]>{
    return this.http.get<Article[]>(`${this.searchUrl}/${searchString}`);
  }
}
