import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  defaultTitle: string = "StoryFont";

  constructor(
    private titleService: Title
  ) { }


  updatePageTitle(routeParams: Params, routeName: string): void{
    const newPageTitle: string = this.createPageTitle(routeParams, routeName);
    this.titleService.setTitle(newPageTitle);
  }

  private createPageTitle(routeParams: Params, routeName: string): string{

    const campaignName: string = routeParams.campaign;
    if(campaignName == null) return this.defaultTitle;

    const articleName = this.getArticleName(routeParams, routeName);

    const nextPageTitle: string = `${campaignName} ${articleName}`;
    return this.capitalizeFirstLetters(nextPageTitle);
  }

  private getArticleName(routeParams: Params, routeName: string): string{
    const articleName: string = routeParams.name;
    if(articleName != null) return articleName;

    const isDiaryentryRoute: boolean = routeName.includes("diaryentry") && routeParams.sessionNumber;
    if(isDiaryentryRoute) return `Diaryentry ${routeParams.sessionNumber}`;

    const isSessionAudioRoute: boolean = routeName.includes('sessionaudio') && routeParams.sessionNumber;
    if(isSessionAudioRoute) return `Recording ${routeParams.sessionNumber}`;

    return routeName
  }

  private capitalizeFirstLetters(str: string){
    const firstLetterPattern = /^\w|\s\w/g;
    return str.toLowerCase().replace(firstLetterPattern, (letter: string) => letter.toUpperCase());
  }
}
