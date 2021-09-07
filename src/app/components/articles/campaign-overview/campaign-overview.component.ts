import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { CampaignService } from 'src/app/services/campaign.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';
import { animateElement } from 'src/app/utils/functions/animationDecorator';

@Component({
  selector: 'app-campaign-overview',
  templateUrl: './campaign-overview.component.html',
  styleUrls: ['./campaign-overview.component.scss']
})
export class CampaignOverviewComponent implements OnInit, AfterViewInit {
  campaignData: CampaignOverview[];
  constants: Constants = Constants;

  @ViewChild('campaignOverviewContainer') campaignOverviewContainer: ElementRef;

  globalUrlParamSubscription: Subscription;

  constructor(
    public routingService: RoutingService,
    private globalUrlParams: GlobalUrlParamsService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.globalUrlParamSubscription = this.globalUrlParams.getCampaigns().subscribe(
      (campaignData: CampaignOverview[]) => {
        console.log("Starting to load overview");
        this.campaignData = campaignData;
      }
    );
  }

  ngAfterViewInit(): void{
    this.campaignOverviewContainer.nativeElement.style.setProperty('--animate-duration', '0.5s');
    animateElement(this.campaignOverviewContainer.nativeElement, 'slideInDown');
  }

  routeToCampaign(campaignName: string ): void{
    this.campaignOverviewContainer.nativeElement.style.setProperty('--animate-duration', '0.5s');
    this.globalUrlParams.updateCampaignBackgroundImage(campaignName);

    animateElement(this.campaignOverviewContainer.nativeElement, 'slideOutUp')
      .then(() => this.routingService.routeToPath("home2", {campaign: campaignName}));
  }

  ngOnDestroy(): void{
    if(this.globalUrlParamSubscription) this.globalUrlParamSubscription.unsubscribe();
  }
}
