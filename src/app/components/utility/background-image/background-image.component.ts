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
    this.urlParamSubscription = this.globalURLParamService.getCurrentCampaign()
      .pipe(filter((campaign: CampaignOverview) => this.currentCampaign?.name !== campaign?.name))
      .subscribe((campaign: CampaignOverview) => this.updateCurrentCampaign(campaign));
  }

  async updateCurrentCampaign(campaign: CampaignOverview): Promise<void>{
    await this.fadeOutBackgroundImage();

    this.currentCampaign = campaign;

    await this.fadeInBackgroundImage();
  }

  async fadeOutBackgroundImage(): Promise<any>{
    if (this.backgroundImage == null) return;

    return animateElement(this.backgroundImage.nativeElement, 'fadeOut');
  }

  async fadeInBackgroundImage(): Promise<any>{
    if (this.backgroundImage == null) return;

    return animateElement(this.backgroundImage.nativeElement, 'fadeIn');
  }

  ngOnDestroy(): void{
    if (this.urlParamSubscription) this.urlParamSubscription.unsubscribe();
  }
}
