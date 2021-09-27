import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { OverviewItem } from '../models/overviewItem';
import { Article, OverviewArticleObject } from '../models/recentlyUpdatedArticle';
import { transformObservableArrayContent, transformObservableContent } from 'src/app/utils/functions/transform';

@Injectable({
  providedIn: 'root'
})
export class RecentlyUpdatedService {
  recentlyUpdatedUrl: string = `${Constants.wikiApiUrl}/recentupdates`
  searchUrl: string = `${Constants.wikiApiUrl}/search`

  constructor(private http: HttpClient) { }

  getRecentlyUpdatedArticle(campaign: string, pageNumber: number): Observable<OverviewItem[]>{
    if(pageNumber == null) pageNumber = 0;

    const resultObservable = this.http.get<OverviewItem[]>(`${this.recentlyUpdatedUrl}/${campaign}/${pageNumber}`);
    return transformObservableArrayContent(resultObservable, OverviewArticleObject);
  }

  getGlobalSearchArticle(searchString: string): Observable<OverviewItem[]>{
    const resultObservable = this.http.get<OverviewItem[]>(`${this.searchUrl}/${searchString}`);

    return transformObservableArrayContent(resultObservable, OverviewArticleObject);
  }

  getCampaignSearchArticle(campaign: string, searchString: string): Observable<OverviewItem[]>{
    const resultObservable = this.http.get<OverviewItem[]>(`${this.searchUrl}/${campaign}/${searchString}`);

    return transformObservableArrayContent(resultObservable, OverviewArticleObject);
  }
}
