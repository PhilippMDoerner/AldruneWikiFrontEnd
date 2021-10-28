import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, NavigationStart, Params, ResolveStart, Router } from '@angular/router';
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
    private route: ActivatedRoute
  ) { 
    this.currentCampaignSet
      .pipe(skip(1)) 
      .subscribe(() => {
        const routeParams = this.route.snapshot.params;
        this.updateCurrentlySelectedCampaignFromRoute(routeParams);
      });

    
    this.autoUpdateCampaignSet()
      .then(() => this.startListeningToRoutingEvents());
  }

  public async autoUpdateCampaignSet(): Promise<void>{
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


  //This is called twice during initialization, once after campaign set has been loaded 
  //and once after the the first routing has finished, as the routing will trigger onRouteChangeEnd which 
  public async updateCurrentlySelectedCampaign(newCampaignName: string): Promise<void>{
    const isAlreadySelected: boolean = newCampaignName === this.currentCampaign.value?.name;
    if(isAlreadySelected) return;

    await this.currentCampaignSet.pipe(filter(campaigns => campaigns != null), first()).toPromise();

    const currentlySelectedCampaign: CampaignOverview = await this.findCampaignByName(newCampaignName);
    this.currentCampaign.next(currentlySelectedCampaign);
  }

  /** Interesting time disparity between when the resolver will call this and when the route-change-listener will update the campaign */
  public async getCurrentCampaign(): Promise<CampaignOverview>{
    const isCampaignRoute = true;

    if(isCampaignRoute){
      return await this.currentCampaign
        .pipe(
          filter((campaign: CampaignOverview) => campaign != null),
          first()
        )
        .toPromise();
    } else {
      return null;
    }
  }



    /**
     * @description Waits for the list of total campaigns available to the user to finish loading. This is necessary to 
     * ensure there is a campaign that that can be retrieved via "getCurrentCampaign".
     */
    async waitForCampaignSetsToLoad(): Promise<void>{
      await this.getCampaigns()
          .pipe(
              filter((campaigns: CampaignOverview[]) => campaigns != null),
              first()
          )
          .toPromise();
    }

  public getCampaigns(): BehaviorSubject<CampaignOverview[]>{
    return this.currentCampaignSet;
  }

  public unsetCurrentlySelectedCampaign(): void{
    this.updateCurrentlySelectedCampaign(null);
  }

  private updateCampaignSet(campaigns: CampaignOverview[]): void{
    this.currentCampaignSet.next(campaigns);
  }


  /**
   * @description Refreshes the current campaign set aka updates it with data from the server.
   * If this succeeds, also try to reach the last location again that was attempted to be reached
   * before an error was thrown and the campaign set was removed due to not having an internet connection.
   */
   public async refreshAndReturnToLastURL(): Promise<void>{
    await this.autoUpdateCampaignSet();
    this.urlLocation.back();
  }

  /**
   * @description Starts the mechanism that whenever the route is changed, the currently selected campaign is automatically updated
   * Aka when there is a route that does not have the "campaign" parameter defined, camaignName will be null and the currently
   * selected campaign will be updated to be null.
   */
  private startListeningToRoutingEvents(): void{
    this.router.events
      .pipe(
        filter(event => event instanceof ResolveStart)
      )
      .subscribe((event: ResolveStart) => this.onRouteResolveStart(event));
  }

  /**
   * @description Primarily event listener for whenever a route changes, ideally only fired once per route change.
   * Tries to keep all global variables up to date as the route keeps changing and being updated.
   * Acts the moment the new route is reached aka when the navigation has been finished.
   */
  private onRouteResolveStart(event: ResolveStart): void{
    const routeSnapshot: ActivatedRouteSnapshot = event.state.root.firstChild;
    const routeParams: any = routeSnapshot.params;
    const routeName: string = routeSnapshot.data.name;

    this.updateCurrentlySelectedCampaignFromRoute(routeParams);

    this.myTitleService.updatePageTitle(routeParams, routeName);
  }
  

  private updateCurrentlySelectedCampaignFromRoute(routeParameters: any): void{
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
}
