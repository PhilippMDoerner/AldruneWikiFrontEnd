import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
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
  currentCampaign: CampaignOverview;

  urlParamSubscription: Subscription;

  @ViewChild('backgroundImage') backgroundImage: ElementRef;

  constructor(
    private globalURLParamService: GlobalUrlParamsService
  ) { }

  ngOnInit(): void {
    this.urlParamSubscription = this.globalURLParamService.currentCampaign
      .pipe(filter((campaign: CampaignOverview) => this.currentCampaign?.name !== campaign?.name))
      .subscribe((campaign: CampaignOverview) => this.updateCurrentCampaignBackground(campaign));
  }

  async updateCurrentCampaignBackground(campaign: CampaignOverview): Promise<void>{
    await this.animateBackgroundImage("fadeOut");

    this.currentCampaign = campaign;

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
