import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, NavigationStart, Params, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, first, skip, tap } from 'rxjs/operators';
import { CampaignOverview } from '../models/campaign';
import { CampaignService } from './campaign.service';
import { RoutingService } from './routing.service';
import { TitleService } from './title.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalUrlParamsService {
  currentCampaignSet: BehaviorSubject<CampaignOverview[]> = new BehaviorSubject(null); 
  isLoadingCampaignSet: boolean = false;

  currentCampaign: BehaviorSubject<CampaignOverview> = new BehaviorSubject(null);

  constructor(
    private campaignService: CampaignService,
    private tokenService: TokenService,
    private router: Router,
    private routingService: RoutingService,
    private urlLocation: Location,
    private myTitleService: TitleService,
  ) { 
    this.currentCampaignSet
      .pipe(skip(1)) 
      .subscribe(() => this.updateCurrentlySelectedCampaignFromRoute());

    this.autoUpdateCampaignSet()
      .then(() => this.startListeningToRoutingEvents());
  }

  /**
   * @description Starts the mechanism that whenever the route is changed, the currently selected campaign is automatically updated
   * Aka when there is a route that does not have the "campaign" parameter defined, camaignName will be null and the currently
   * selected campaign will be updated to be null.
   */
  private startListeningToRoutingEvents(): void{
    this.router.events
      .pipe(
        tap(event => this.onRouteChangeStart(event)),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => this.onRouteChangeEnd(event));
  }

  /** 
   * @description Primarily event listener for whenever a route changes, only fired once per route change.
   * Tries to keep all global variables up to date as needed as the route keeps changing.
   * Acts the moment routing begins aka when the navigation starts
   */
  private onRouteChangeStart(event: any): void{
    const isStartOfRouteChange: boolean = event instanceof NavigationStart;
    if(!isStartOfRouteChange) return;

    this.refreshCampaignSetIfNecessary(event);
  }

  /**
   * @description Primarily event listener for whenever a route changes, ideally only fired once per route change.
   * Tries to keep all global variables up to date as the route keeps changing and being updated.
   * Acts the moment the new route is reached aka when the navigation has been finished.
   */
  private onRouteChangeEnd(event: NavigationEnd): void{
    this.updateCurrentlySelectedCampaignFromRoute();

    const routeData: ActivatedRoute = this.getCurrentRouteData();
    this.myTitleService.updatePageTitle(routeData);
  }

  private async refreshCampaignSetIfNecessary(event: NavigationStart): Promise<void>{
    if(this.isCampaignSetRefreshNecessary(event)){
      await this.refreshAndReturnToLastURL();
    }
  }

  /**
   * @description Refreshes the current campaign set aka updates it with data from the server.
   * If this succeeds, also try to reach the last location again that was attempted to be reached
   * before an error was thrown and the campaign set was removed due to not having an internet connection.
   */
  async refreshAndReturnToLastURL(): Promise<void>{
    await this.autoUpdateCampaignSet();
    this.urlLocation.back();
  }

  /**
   * @description Checks if the current campaign set actually needs to be refreshed. This is true
   * if the current campaign set is null, aka no value. An exceptions are when the routing is currently
   * to an error page, you do not need to refresh when routing to an error page (specifically HTTP 504),
   * it just creates unnecessary double routing.
   */
  private isCampaignSetRefreshNecessary(event: NavigationStart): boolean{
    const isErrorPage: boolean = event.url.includes("error");
    if(isErrorPage) return false;

    const hasCampaignsLoaded: boolean = this.currentCampaignSet.value != null;
    return !hasCampaignsLoaded;
  }
  
  //This is called twice during initialization, once after campaign set has been loaded 
  //and once after the the first routing has finished, as the routing will trigger onRouteChangeEnd which 
  async updateCurrentlySelectedCampaign(newCampaignName: string): Promise<void>{
    const isAlreadySelected: boolean = newCampaignName === this.currentCampaign.value?.name;
    const hasNotYetLoadedCampaignSet: boolean = this.currentCampaignSet.value == null;
    if(isAlreadySelected || hasNotYetLoadedCampaignSet) return;

    const currentlySelectedCampaign: CampaignOverview = await this.findCampaignByName(newCampaignName);
    this.currentCampaign.next(currentlySelectedCampaign);
  }

  updateCampaignSet(campaigns: CampaignOverview[]): void{
    this.currentCampaignSet.next(campaigns);
  }

  getCurrentCampaign(): BehaviorSubject<CampaignOverview>{
    return this.currentCampaign;
  }

  getCampaigns(): BehaviorSubject<CampaignOverview[]>{
    return this.currentCampaignSet;
  }

  unsetCurrentlySelectedCampaign(): void{
    this.updateCurrentlySelectedCampaign(null);
  }

  private getCurrentRouteParams(): Params{
    const routeData: ActivatedRoute = this.getCurrentRouteData();
    if(routeData == null) return;

    return routeData.snapshot.params;
  }

  private getCurrentRouteData(): ActivatedRoute{
    return this.router.routerState.root.firstChild;
  }

  private updateCurrentlySelectedCampaignFromRoute(): void{
    const routeParameters: Params = this.getCurrentRouteParams();

    const campaignName: string = routeParameters?.campaign;
    this.updateCurrentlySelectedCampaign(campaignName);
  }

  private async findCampaignByName(campaignName: string): Promise<CampaignOverview>{
    if (campaignName == null) return undefined;

    let currentCampaignSet: CampaignOverview[] = this.currentCampaignSet.value;
    if (currentCampaignSet == null){
      await this.autoUpdateCampaignSet();
      currentCampaignSet = this.currentCampaignSet.value;

      if (currentCampaignSet == null) return undefined
    };

    campaignName = campaignName.toLowerCase();
    return currentCampaignSet.find((campaign: CampaignOverview) => campaign.name.toLowerCase() === campaignName);
  }

  async autoUpdateCampaignSet(): Promise<void>{
    if(!this.tokenService.hasValidJWTToken() || this.isLoadingCampaignSet) return;
    
    this.isLoadingCampaignSet = true;

    this.campaignService.campaignList()
      .pipe(first())
      .subscribe(
        (campaigns: CampaignOverview[]) => {
          this.isLoadingCampaignSet = false;
          this.updateCampaignSet(campaigns);
        },
        error => this.routingService.routeToErrorPage(error)
      );
  }
}
