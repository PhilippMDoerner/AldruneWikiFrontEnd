import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { OverviewItem, OverviewItemObject } from '../models/overviewItem';
import { OverviewArticleObject } from '../models/recentlyUpdatedArticle';
import { transformObservableArrayContent, transformObservableContent } from 'src/app/utils/functions/transform';
import { map } from 'rxjs/operators';

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

  
  getGlobalSearchArticle(searchString: string): Observable<{articles: OverviewItem[], emptyResonse: string}>{
    const resultObservable = this.http.get<{articles: OverviewItem[], emptyResonse: string}>(`${this.searchUrl}/${searchString}`);
    const modifiedObservable = resultObservable.pipe(
      map(searchResponse => {
        const searchArticles: OverviewItem[] = searchResponse.articles;
        const searchArticleObjects: OverviewItemObject[] = searchArticles.map((item: OverviewItem) =>  new OverviewItemObject(item));
        searchResponse.articles = searchArticleObjects;
        return searchResponse;
      })
    );

    return modifiedObservable;
  }


  getCampaignSearchArticle(campaign: string, searchString: string): Observable<{articles: OverviewItem[], emptyResonse: string}>{
    const resultObservable = this.http.get<{articles: OverviewItem[], emptyResonse: string}>(`${this.searchUrl}/${campaign}/${searchString}`);
    const modifiedObservable = resultObservable.pipe(
      map(searchResponse => {
        const searchArticles: OverviewItem[] = searchResponse.articles;
        const searchArticleObjects: OverviewItemObject[] = searchArticles.map((item: OverviewItem) =>  new OverviewItemObject(item));
        searchResponse.articles = searchArticleObjects;
        return searchResponse;
      })
    );

    return modifiedObservable;
  }
}
