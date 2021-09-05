import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Constants } from 'src/app/app.constants';
import { RoutingService } from 'src/app/services/routing.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  constants: any = Constants;

  @Input() showSidebar: BehaviorSubject<boolean>;
  currentCampaignName: string = "";

  parameterSubscription: Subscription;

  sidebarEntries: any;
  showUserSection: boolean = false;
  showAdminSection: boolean = false;

  //TODO: customizeable sidebar order of menu items
  constructor(
    public routingService: RoutingService,
    public tokenService: TokenService,
    private router: Router,
    private globalUrlParams: GlobalUrlParamsService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
  ) { 

  }

  ngOnInit(): void {
    this.parameterSubscription = this.globalUrlParams.getURLCampaignParameter().subscribe(
      (campaignName: string) => {
        this.currentCampaignName = campaignName;
        this.updateSidebarEntries(campaignName);
        this.cdRef.detectChanges();
      }
    );
  }

  updateSidebarEntries(campaignName: string): void{
    const metaData = this.constants.articleTypeMetaData;
    this.sidebarEntries = this.processMetaData(campaignName, metaData);
    this.showAdminSection = this.tokenService.isAdmin() || this.tokenService.isSuperUser();
  }

  processMetaData(campaign: string, metaData: any){
    const allMetaData: any = this.constants.articleTypeMetaData;
    const sidebarEntries = allMetaData.filter(metaDataEntry => metaDataEntry.showInSidebar)
    const processedEntries = sidebarEntries.map(metaDataEntry => {
        const routeName: string = metaDataEntry.route
        const routeUrl: string = this.routingService.getRoutePath(routeName, {campaign: campaign});
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
