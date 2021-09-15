import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { Constants, OverviewType } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { OverviewItem } from 'src/app/models/overviewItem';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { OverviewService } from 'src/app/services/overview.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { animateElement } from 'src/app/utils/functions/animationDecorator';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-session-audio-overview',
  templateUrl: './session-audio-overview.component.html',
  styleUrls: ['./session-audio-overview.component.scss']
})
export class SessionAudioOverviewComponent extends PermissionUtilityFunctionMixin implements OnInit, AfterViewInit {
  //URLs
  sessionAudioURLs: string[];
  homeUrl: string;


  constants: any = Constants;
  campaign: CampaignOverview;

  sessionAudioFiles: OverviewItem[];

  @ViewChild('overviewMainCard') articleElement: ElementRef;

  constructor(
    private overviewService: OverviewService,
    public routingService: RoutingService,
    route: ActivatedRoute,
    tokenService: TokenService,
    private globalUrlParams: GlobalUrlParamsService,
  ) { 
    super(tokenService, route);
  }

  ngOnInit(): void {
    this.globalUrlParams.getCurrentCampaign()
      .pipe(filter(campaign => campaign != null))
      .subscribe(
        (campaign: CampaignOverview) => {
          this.campaign = campaign;
          this.onAfterCampaignLoad(campaign);
        }
      )
  }

  onAfterCampaignLoad(campaign: CampaignOverview): void{
    this.overviewService.getCampaignOverviewItems(campaign.name, OverviewType.Sessionaudio)
      .pipe(first())
      .subscribe(
        (sessionAudioFiles: OverviewItem[]) => {
          this.sessionAudioFiles = sessionAudioFiles;
          this.onAfterItemsLoaded(campaign, sessionAudioFiles);
        },
        error => this.routingService.routeToErrorPage(error)
      );      
  }

  onAfterItemsLoaded(campaign: CampaignOverview, listItems: OverviewItem[]): void{
    this.updateDynamicVariables(campaign, listItems)
  }

  updateDynamicVariables(campaign: CampaignOverview, listItems: OverviewItem[]): void{
    this.homeUrl = this.routingService.getRoutePath('home1', {campaign: campaign.name});
    
    this.sessionAudioURLs = listItems.map(
      (sessionAudioEntry: OverviewItem) => this.routingService.getRoutePath('sessionaudio', {
        campaign: campaign.name, 
        isMainSession: sessionAudioEntry.session_details.is_main_session_int, 
        sessionNumber: sessionAudioEntry.session_details.session_number
      })
    );
  }

  ngAfterViewInit(): void{
    if(!this.articleElement?.nativeElement) return;
    animateElement(this.articleElement.nativeElement, 'fadeIn');
  }
}
