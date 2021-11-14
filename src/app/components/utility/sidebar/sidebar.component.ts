import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CampaignRole, Constants } from 'src/app/app.constants';
import { RoutingService } from 'src/app/services/routing.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { CampaignOverview } from 'src/app/models/campaign';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  constants: any = Constants;

  //URLS
  profileUrl: string;
  campaignOverviewUrl: string;
  homeUrl: string;
  campaignAdminUrl: string;

  @Input() showSidebar: BehaviorSubject<boolean>;
  currentCampaign: CampaignOverview;
  campaignRole: CampaignRole;

  parameterSubscription: Subscription;

  sidebarEntries: any;
  showUserSection: boolean = false;
  showAdminSection: boolean = false;

  isLoggedIn: boolean = true;

  //TODO: Fix that elements underneath the sidebar also get clicked when clicking on the sidebar (mostly an issue on mobile)
  //TODO: Fix campaign overview page. Maybe do BEM while you're at it

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

    this.parameterSubscription = this.globalUrlParams.currentCampaign
      .subscribe(
        (campaign: CampaignOverview) => {
          this.currentCampaign = campaign;
          //TODO: When jumping to item-article-update, that triggers a full sidebar component re-render including the links here. Figure out why that is
          if(this.currentCampaign != null){
            this.campaignRole = this.tokenService.getCampaignRole(campaign?.name);
            this.updateSidebarEntries(this.currentCampaign?.name);
          }

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
    this.profileUrl = this.routingService.getRoutePath('profile', {
      campaign: campaignName, 
      username: this.tokenService.getCurrentUserName()
    });
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
    if (this.tokenService.hasJWTToken()){
      this.tokenService.invalidateJWTToken();
      this.tokenService.removeJWTTokenFromLocalStorage();
    }
        
    this.routingService.routeToPath('login-state', {state: 'logged-out'});
  }

  ngOnDestroy(): void{
    if (this.parameterSubscription) this.parameterSubscription.unsubscribe();
  }
}
