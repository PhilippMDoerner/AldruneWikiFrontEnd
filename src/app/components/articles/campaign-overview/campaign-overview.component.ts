import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
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
        style({ transform: 'translateX(-100%)' }),
        animate('500ms', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('500ms', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class CampaignOverviewComponent implements OnInit {
  campaignData: CampaignOverview[];
  constants: any = Constants;
  isLoading: boolean = false;

  //URLs
  generalAdminUrl: string = this.routingService.getRoutePath('admin');
  profileUrl: string;
  configTableUrl: string = this.routingService.getRoutePath('config-tables');
  isGlobalAdmin: boolean;

  @ViewChild('campaignOverviewContainer') campaignOverviewContainer: ElementRef;

  globalUrlParamSubscription: Subscription;

  constructor(
    public routingService: RoutingService,
    private globalUrlParams: GlobalUrlParamsService,
    private tokenService: TokenService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    this.profileUrl = this.routingService.getRoutePath("direct-profile", {username: this.tokenService.getCurrentUserName()});
    this.globalUrlParamSubscription = this.globalUrlParams
      .getCampaigns()
      .pipe(filter((campaignData) => campaignData != null))
      .subscribe((campaignData: CampaignOverview[]) => {
        this.campaignData = this.sortCampaigns(campaignData);
        this.onAfterCampaignDataRetrieved(campaignData);
        this.isLoading = false;
      });
  }

  logout(): void{
    if (this.tokenService.hasTokens()){
      this.tokenService.invalidateJWTToken();
      this.tokenService.removeJWTTokenFromLocalStorage();
    }
        
    this.routingService.routeToPath('login-state', {state: 'logged-out'});
  }

  sortCampaigns(campaigns: CampaignOverview[]): CampaignOverview[] {
    return campaigns.sort((c1, c2) => c1.name < c2.name ? -1 : 1);
  }

  onAfterCampaignDataRetrieved(campaignData: CampaignOverview[]): void {
    this.isGlobalAdmin = this.tokenService.isAdmin() || this.tokenService.isSuperUser();
  }

  routeToCampaign(campaignName: string): void {
    this.campaignOverviewContainer.nativeElement.style.setProperty(
      '--animate-duration',
      '0.5s'
    );
    this.globalUrlParams.updateCurrentlySelectedCampaign(campaignName); //Allows the background to swap ahead of time while the other animation is running

    animateElement(
      this.campaignOverviewContainer.nativeElement,
      'slideOutLeft'
    ).then(() =>
      this.routingService.routeToPath('home2', { campaign: campaignName })
    );
  }

  ngOnDestroy(): void {
    if (this.globalUrlParamSubscription)
      this.globalUrlParamSubscription.unsubscribe();
  }
}
