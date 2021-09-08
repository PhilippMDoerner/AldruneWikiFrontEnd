import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { CampaignOverview } from '../models/campaign';
import { CampaignService } from './campaign.service';
import { TokenService } from './token.service';
import { WarningsService } from './warnings.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalUrlParamsService {
  currentCampaignSet: BehaviorSubject<CampaignOverview[]> = new BehaviorSubject(null); 
  currentCampaign: BehaviorSubject<CampaignOverview> = new BehaviorSubject(null);

  constructor(
    private campaignService: CampaignService,
    private warnings: WarningsService,
    private tokenService: TokenService,
    private router: Router,
  ) { 
    this.currentCampaignSet
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
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateCurrentlySelectedCampaignFromRoute());
  }

  updateCurrentlySelectedCampaign(newCampaignName: string): void{
    if(newCampaignName === this.currentCampaign.value?.name) return;

    const currentlySelectedCampaign: CampaignOverview = this.findCampaignByName(newCampaignName);
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

  private updateCurrentlySelectedCampaignFromRoute(): void{
    const routeData: ActivatedRoute = this.router.routerState.root.firstChild;
    if(routeData == null) return;

    const campaignName: string = routeData.snapshot.params.campaign;
    this.updateCurrentlySelectedCampaign(campaignName);
  }

  private findCampaignByName(campaignName: string): CampaignOverview{
    if (campaignName == null) return undefined;

    const currentCampaignSet: CampaignOverview[] = this.currentCampaignSet.value;
    if (currentCampaignSet == null) return undefined;

    campaignName = campaignName.toLowerCase();
    return currentCampaignSet.find((campaign: CampaignOverview) => campaign.name.toLowerCase() === campaignName);
  }

  async autoUpdateCampaignSet(): Promise<void>{
    if(!this.tokenService.hasValidJWTToken()) return;

    this.campaignService.campaignList().pipe(first()).subscribe(
      (campaigns: CampaignOverview[]) => this.updateCampaignSet(campaigns),
      error => this.warnings.showWarning(error)
    );
  }
}
