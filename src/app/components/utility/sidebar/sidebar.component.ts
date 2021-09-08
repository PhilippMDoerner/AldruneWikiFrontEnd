import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Constants } from 'src/app/app.constants';
import { RoutingService } from 'src/app/services/routing.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { filter } from 'rxjs/operators';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { CampaignOverview } from 'src/app/models/campaign';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  constants: any = Constants;

  @Input() showSidebar: BehaviorSubject<boolean>;
  currentCampaignName: string = "";
  currentCampaign: CampaignOverview;

  parameterSubscription: Subscription;

  sidebarEntries: any;
  showUserSection: boolean = false;
  showAdminSection: boolean = false;

  //TODO: customizeable sidebar order of menu items
  constructor(
    public routingService: RoutingService,
    public tokenService: TokenService,
    private globalUrlParams: GlobalUrlParamsService,
    private cdRef: ChangeDetectorRef,
  ) { 

  }

  ngOnInit(): void {
    this.parameterSubscription = this.globalUrlParams.getCurrentCampaign()
      .pipe(filter((campaign: CampaignOverview) => campaign != null))
      .subscribe(
        (campaign: CampaignOverview) => {
          this.currentCampaign = campaign;
          this.updateSidebarEntries(this.currentCampaign.name);
          this.cdRef.detectChanges();
        }
      );
  }

  updateSidebarEntries(campaignName: string): void{
    const metaData = this.constants.articleTypeMetaData;
    this.sidebarEntries = this.processMetaData(campaignName, metaData);
    this.showAdminSection = this.tokenService.isAdmin() || this.tokenService.isSuperUser();
  }

  processMetaData(campaignName: string, allMetaData: any){
    const sidebarEntries = allMetaData.filter(metaDataEntry => metaDataEntry.showInSidebar)
    const processedEntries = sidebarEntries.map(metaDataEntry => {
        const routeName: string = metaDataEntry.route
        const routeUrl: string = this.routingService.getRoutePath(routeName, {campaign: campaignName});
        metaDataEntry.route = routeUrl;
        return metaDataEntry;
    });
  
    return processedEntries;
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
