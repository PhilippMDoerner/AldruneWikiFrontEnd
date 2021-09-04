import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Constants } from 'src/app/app.constants';
import { RoutingService } from 'src/app/services/routing.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  constants = Constants;

  @Input() showSidebar: BehaviorSubject<boolean>;
  campaign: string = Constants.defaultCampaign;

  sidebarEntries: any;
  showUserSection: boolean = false;
  showAdminSection: boolean = false;

  routingSubscription: Subscription;

  //TODO: customizeable sidebar order of menu items
  constructor(
    public routingService: RoutingService,
    public tokenService: TokenService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    //Updates whether admin section should be shown in the sidebar or not with every update of the route
    this.routingSubscription = this.router.events.pipe(
      //Ensures you fire only one routingevent per routing
      filter((e: any) => {
        const isRouterEvent: boolean =  e instanceof RouterEvent;
        const isSingleRouterEvent: boolean = e.navigationTrigger === "imperative";
        return isRouterEvent && isSingleRouterEvent
      })
    ).subscribe(
      params => {        
        if(params.campaign != null) {
          this.campaign = params.campaign;
        }
        
        const metaData = this.constants.articleTypeMetaData;
        this.sidebarEntries = this.processMetaData(this.campaign, metaData);
        
        this.showAdminSection = this.tokenService.isAdmin() || this.tokenService.isSuperUser();
    });
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
    if (this.routingSubscription) this.routingSubscription.unsubscribe();
  }
}
