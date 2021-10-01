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


  updatePageTitle(route: ActivatedRoute): void{
    const newPageTitle: string = this.getPageTitle(route);
    this.titleService.setTitle(newPageTitle);
  }

  private getPageTitle(route: ActivatedRoute): string{
    const params: Params = route.snapshot.params;

    const campaignName: string = params.campaign;
    if(campaignName == null) return this.defaultTitle;

    const articleName = this.getArticleName(route);

    const nextPageTitle: string = `${campaignName} ${articleName}`;
    return this.capitalizeFirstLetters(nextPageTitle);
  }

  private getArticleName(route: ActivatedRoute): string{
    const params: Params = route.snapshot.params;
    const routeName: string = route.snapshot.data.name;

    if(params.name != null) return params.name;

    const isDiaryentryRoute: boolean = routeName.includes("diaryentry") && params.sessionNumber;
    if(isDiaryentryRoute) return `Diaryentry ${params.sessionNumber}`;

    const isSessionAudioRoute: boolean = routeName.includes('sessionaudio') && params.sessionNumber;
    if(isSessionAudioRoute) return `Recording ${params.sessionNumber}`;

    return routeName
  }

  private capitalizeFirstLetters(str: string){
    const firstLetterPattern = /^\w|\s\w/g;
    return str.toLowerCase().replace(firstLetterPattern, (letter: string) => letter.toUpperCase());
  }
}
