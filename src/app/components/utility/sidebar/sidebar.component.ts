import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ArticleMetaData, CampaignRole, Constants } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  constants: any = Constants;

  //URLS
  campaignOverviewUrl: string;
  homeUrl: string;
  profileUrl: string;
  campaignAdminUrl: string;

  @Input() showSidebar: BehaviorSubject<boolean>;
  currentCampaign$: Observable<CampaignOverview>;
  campaignRole$: Observable<CampaignRole>;
  campaignIcon$: Observable<string>;

  parameterSubscription: Subscription;

  sidebarEntries: ArticleMetaData[];
  showUserSection: boolean = false;
  showAdminSection: boolean = false;

  constructor(
    public routingService: RoutingService,
    public tokenService: TokenService,
    public globalUrlParams: GlobalUrlParamsService,
    private cdRef: ChangeDetectorRef,
  ) { 

  }

  ngOnInit(): void {
    this.sidebarEntries = this.constants.articleTypeMetaData.filter(metaDataEntry => metaDataEntry.showInSidebar);
    this.sidebarEntries.sort((entry1, entry2) => entry1.title > entry2.title ? 1 : -1);

    this.currentCampaign$ = this.globalUrlParams.currentCampaign;
    this.campaignRole$ = this.currentCampaign$.pipe(map(campaign => this.tokenService.getCampaignRole(campaign?.name)));
    this.campaignIcon$ = this.currentCampaign$.pipe(map(campaign => campaign == null ? null : `${Constants.wikiUrl}${campaign.icon}`));
    this.parameterSubscription = this.currentCampaign$
      .pipe(filter(currentCampaign => currentCampaign != null))
      .subscribe(
        (campaign: CampaignOverview) => {
          //TODO: When jumping to item-article-update, that triggers a full sidebar component re-render including the links here. Figure out why that is
          this.updateSidebarEntries(campaign.name);
          this.cdRef.detectChanges();
        }
      );
  }

  async refreshGlobalData(): Promise<void>{
    await this.globalUrlParams.autoUpdateCampaignSet();
    this.routingService.routeToPath('campaign-overview');
  }

  updateSidebarEntries(campaignName: string): void{
    this.updateSidebarEntryRoutes(campaignName);
    this.updateGeneralRouterLinks(campaignName);
    this.showAdminSection = this.tokenService.isCampaignAdmin(campaignName) || this.tokenService.isAdmin() || this.tokenService.isSuperUser();
  }

  updateGeneralRouterLinks(campaignName: string): void{
    this.campaignOverviewUrl = this.routingService.getRoutePath("campaign-overview");
    this.homeUrl = this.routingService.getRoutePath('home2', {campaign: campaignName});
    this.profileUrl = this.routingService.getRoutePath('direct-campaign-profile', {username: this.tokenService.getCurrentUserName(), campaign: campaignName });
    this.campaignAdminUrl = this.routingService.getRoutePath('campaign-admin', {campaign: campaignName})
  }

  updateSidebarEntryRoutes(campaignName: string): void{
    this.sidebarEntries.map(metaDataEntry => {
        const routeName: string = metaDataEntry.route
        const routeUrl: string = this.routingService.getRoutePath(routeName, {campaign: campaignName});
        metaDataEntry.route = routeUrl;
        return metaDataEntry;
    });  
  }

  logout(): void{
    if (this.tokenService.hasTokens()){
      this.tokenService.invalidateJWTToken();
      this.tokenService.removeJWTTokenFromLocalStorage();
    }
        
    this.routingService.routeToPath('login-state', {state: 'logged-out'});
  }

  ngOnDestroy(): void{
    if (this.parameterSubscription) this.parameterSubscription.unsubscribe();
  }
}
