import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { animateElement } from 'src/app/utils/functions/animationDecorator';

@Component({
  selector: 'app-background-image',
  templateUrl: './background-image.component.html',
  styleUrls: ['./background-image.component.scss']
})
export class BackgroundImageComponent implements OnInit, OnDestroy {
  constants = Constants;
  currentCampaign: BehaviorSubject<CampaignOverview> = new BehaviorSubject(null);
  backgroundImageUrl$: Observable<string>;

  urlParamSubscription: Subscription;

  @ViewChild('backgroundImage') backgroundImage: ElementRef;

  constructor(
    private globalURLParamService: GlobalUrlParamsService
  ) { }

  ngOnInit(): void {
    this.urlParamSubscription = this.globalURLParamService.currentCampaign
      .pipe(filter((newCampaign: CampaignOverview) => !this.isCurrentCampaign(newCampaign)))
      .subscribe((newCampaign: CampaignOverview) => this.updateCurrentCampaignBackground(newCampaign));
  
    this.backgroundImageUrl$ = this.currentCampaign.pipe(
      map(currentCampaign => {
        if(currentCampaign == null){
          return null;
        } else {
          return `${Constants.wikiUrl}/${currentCampaign?.background_image}`;
        }
      })
    );
  }

  isCurrentCampaign(campaign: CampaignOverview): boolean{
    return this.currentCampaign.getValue()?.name === campaign?.name;
  }

  async updateCurrentCampaignBackground(campaign: CampaignOverview): Promise<void>{
    await this.animateBackgroundImage("fadeOut");

    this.currentCampaign.next(campaign);

    await this.animateBackgroundImage("fadeIn");
  }

  async animateBackgroundImage(animation: string): Promise<any>{
    if (this.backgroundImage == null) return;

    return animateElement(this.backgroundImage.nativeElement, animation);
  }

  ngOnDestroy(): void{
    if (this.urlParamSubscription) this.urlParamSubscription.unsubscribe();
  }
}
