import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { CampaignService } from 'src/app/services/campaign.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-campaign-overview',
  templateUrl: './campaign-overview.component.html',
  styleUrls: ['./campaign-overview.component.scss']
})
export class CampaignOverviewComponent implements OnInit {
  campaignData: CampaignOverview[];
  constants: Constants = Constants;

  constructor(
    private campaignService: CampaignService,
    private warningService: WarningsService,
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.campaignService.campaignList().pipe(first()).subscribe(
      (campaignData: CampaignOverview[]) => this.campaignData = campaignData,
      error => this.routingService.routeToErrorPage(error)
    );
  }

}
