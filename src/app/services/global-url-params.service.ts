import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { CampaignOverview } from '../models/campaign';
import { CampaignService } from './campaign.service';
import { TokenService } from './token.service';
import { WarningsService } from './warnings.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalUrlParamsService {
  currentCampaignName: BehaviorSubject<string> = new BehaviorSubject(null);
  currentCampaignSet: BehaviorSubject<CampaignOverview[]> = new BehaviorSubject(null); 
  //TODO: Redo this. This should be something that gives you an observable that returns the current campaign, sort of like campaign service, just without the API call.
  //Or just throw this into campaign service directly, something like that. Ideally you absolutely no longer query data about the current campaign
  //You just fetch it and have it cached somewhere.
  constructor(
    private campaignService: CampaignService,
    private warnings: WarningsService,
    private tokenService: TokenService,
  ) { 
    this.autoUpdateCampaignSet();
  }

  getURLCampaignParameter(): BehaviorSubject<string>{
    return this.currentCampaignName;
  }

  getCampaigns(): BehaviorSubject<CampaignOverview[]>{
    return this.currentCampaignSet;
  }

  unsetCurrentlySelectedCampaign(): void{
    this.updateCurrentlySelectedCampaign(null);
  }

  updateCurrentlySelectedCampaign(newCampaignName: string): void{
    if(newCampaignName === this.currentCampaignName.value) return;

    this.currentCampaignName.next(newCampaignName);
  }

  updateCampaignSet(campaigns: CampaignOverview[]): void{
    this.currentCampaignSet.next(campaigns);
  }

  autoUpdateCampaignSet(): void{
    if(!this.tokenService.hasValidJWTToken()) return;

    this.campaignService.campaignList().pipe(first()).subscribe(
      (campaigns: CampaignOverview[]) => this.currentCampaignSet.next(campaigns),
      error => this.warnings.showWarning(error)
    );
  }
}
