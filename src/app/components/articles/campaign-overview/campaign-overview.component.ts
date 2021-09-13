import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Campaign, CampaignOverview } from 'src/app/models/campaign';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { animateElement } from 'src/app/utils/functions/animationDecorator';

@Component({
  selector: 'app-campaign-overview',
  templateUrl: './campaign-overview.component.html',
  styleUrls: ['./campaign-overview.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('500ms', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('500ms', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class CampaignOverviewComponent implements OnInit {
  campaignData: CampaignOverview[];
  constants: Constants = Constants;

  @ViewChild('campaignOverviewContainer') campaignOverviewContainer: ElementRef;

  globalUrlParamSubscription: Subscription;

  constructor(
    public routingService: RoutingService,
    private globalUrlParams: GlobalUrlParamsService,
    private tokenService: TokenService,
  ) { }

  async ngOnInit(): Promise<void> {
    console.log(this);
    this.globalUrlParamSubscription = this.globalUrlParams.getCampaigns()
      .pipe(
        filter(campaignData => campaignData != null), //Necessary as the first value if you start on campaign-overview is null. That would jump you straight to 504 with the tap below
        tap((campaignData: CampaignOverview[]) => {
          if(campaignData == null && this.campaignData == null) this.routingService.routeToPath('error', {errorStatus: 504});
        })
      )
      .subscribe((campaignData: CampaignOverview[]) => this.campaignData = this.processCampaignData(campaignData));
  }

  processCampaignData(campaigns: CampaignOverview[]): CampaignOverview[]{
    // campaigns = campaigns.concat(campaigns);
    const sortedCampaigns = campaigns.sort((c1, c2) => c1.name < c2.name ? -1 : 1);
    return sortedCampaigns;
  }

  isGlobalAdmin(): boolean{
    return this.tokenService.isAdmin() || this.tokenService.isSuperUser();
  }

  routeToCampaign(campaignName: string ): void{
    this.campaignOverviewContainer.nativeElement.style.setProperty('--animate-duration', '0.5s');
    this.globalUrlParams.updateCurrentlySelectedCampaign(campaignName); //Allows the background to swap ahead of time while the other animation is running

    animateElement(this.campaignOverviewContainer.nativeElement, 'slideOutLeft')
      .then(() => this.routingService.routeToPath("home2", {campaign: campaignName}));
  }

  ngOnDestroy(): void{
    if(this.globalUrlParamSubscription) this.globalUrlParamSubscription.unsubscribe();
  }
}
