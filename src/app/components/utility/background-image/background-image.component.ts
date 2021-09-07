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
  allCampaignData: CampaignOverview[];
  currentCampaign: CampaignOverview;

  urlParamSubscription: Subscription;
  campaignSetSubscription: Subscription;

  @ViewChild('backgroundImage') backgroundImage: ElementRef;

  constructor(
    private globalURLParamService: GlobalUrlParamsService
  ) { }

  ngOnInit(): void {
    this.campaignSetSubscription = this.globalURLParamService.getCampaigns()
      .subscribe((campaigns: CampaignOverview[]) =>  this.updateCurrentCampaignSet(campaigns));

    this.urlParamSubscription = this.globalURLParamService.getURLCampaignParameter()
      .pipe(filter((campaignName: string) => this.currentCampaign?.name !== campaignName))
      .subscribe((campaignName: string) => this.updateCurrentCampaign(campaignName));
  }

  async updateCurrentCampaign(campaignName: string): Promise<void>{
    await this.fadeOutBackgroundImage();

    if (this.backgroundImage == null || this.allCampaignData == null) return;
    this.currentCampaign = this.findCampaignByName(campaignName);

    await this.fadeInBackgroundImage();
  }

  async updateCurrentCampaignSet(campaignSet: CampaignOverview[]){
    this.allCampaignData = campaignSet;
    const currentCampaignName: string = this.globalURLParamService.getURLCampaignParameter().value;

    if(currentCampaignName != null){
      await this.updateCurrentCampaign(currentCampaignName);  
    }
  }

  async fadeOutBackgroundImage(): Promise<any>{
    if (this.backgroundImage == null) return;

    return animateElement(this.backgroundImage.nativeElement, 'fadeOut');
  }

  async fadeInBackgroundImage(): Promise<any>{
    if (this.backgroundImage == null) return;

    return animateElement(this.backgroundImage.nativeElement, 'fadeIn');
  }


  findCampaignByName(campaignName: string): CampaignOverview{
    if (campaignName == null) return undefined;

    campaignName = campaignName.toLowerCase();
    return this.allCampaignData.find((campaign: CampaignOverview) => campaign.name.toLowerCase() === campaignName);
  }

  ngOnDestroy(): void{
    if (this.urlParamSubscription) this.urlParamSubscription.unsubscribe();
    if (this.campaignSetSubscription) this.campaignSetSubscription.unsubscribe();
  }
}
