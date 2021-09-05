import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Campaign, CampaignOverview } from 'src/app/models/campaign';
import { CampaignService } from 'src/app/services/campaign.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { WarningsService } from 'src/app/services/warnings.service';
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

  @ViewChild('backgroundImage') backgroundImage: ElementRef;

  constructor(
    private campaignService: CampaignService,
    private warningService: WarningsService,
    private globalURLParamService: GlobalUrlParamsService
  ) { }

  ngOnInit(): void {
    this.campaignService.campaignList().pipe(first()).subscribe(
      (campaignOverviewData: CampaignOverview[]) => {
        this.allCampaignData = campaignOverviewData;
        
        this.urlParamSubscription = this.globalURLParamService.getURLCampaignParameter()
          .pipe(filter((campaignName: string) => this.currentCampaign?.name !== campaignName))
          .subscribe((campaignName: string) => this.updateCurrentCampaign(campaignName));
      },
      error => this.warningService.showWarning(error)
    );


  }

  async updateCurrentCampaign(campaignName: string): Promise<void>{
    if (this.backgroundImage == null) return;

    await animateElement(this.backgroundImage.nativeElement, 'fadeOut');
    this.currentCampaign = this.findCampaignByName(campaignName);
    await animateElement(this.backgroundImage.nativeElement, 'fadeIn');
  }

  findCampaignByName(campaignName: string): CampaignOverview{
    if (campaignName == null) return undefined;

    campaignName = campaignName.toLowerCase();
    return this.allCampaignData.find((campaign: CampaignOverview) => campaign.name.toLowerCase() === campaignName);
  }

  ngOnDestroy(): void{
    if (this.urlParamSubscription) this.urlParamSubscription.unsubscribe();
  }
}
