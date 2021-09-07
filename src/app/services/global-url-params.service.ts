import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { CampaignOverview } from '../models/campaign';
import { CampaignService } from './campaign.service';
import { WarningsService } from './warnings.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalUrlParamsService {
  currentCampaignName: BehaviorSubject<string> = new BehaviorSubject(null);
  currentCampaignSet: BehaviorSubject<CampaignOverview[]> = new BehaviorSubject(null); 

  constructor(
    private campaignService: CampaignService,
    private warnings: WarningsService
  ) { 
    this.autoUpdateCampaignSet();
  }

  getURLCampaignParameter(): BehaviorSubject<string>{
    return this.currentCampaignName;
  }

  getCampaigns(): BehaviorSubject<CampaignOverview[]>{
    return this.currentCampaignSet;
  }

  updateCampaignBackgroundImage(newCampaignName: string): void{
    if(newCampaignName === this.currentCampaignName.value) return;

    this.currentCampaignName.next(newCampaignName);
  }

  updateCampaignSet(campaigns: CampaignOverview[]): void{
    this.currentCampaignSet.next(campaigns);
  }

  autoUpdateCampaignSet(): void{
    this.campaignService.campaignList().pipe(first()).subscribe(
      (campaigns: CampaignOverview[]) => this.currentCampaignSet.next(campaigns),
      error => this.warnings.showWarning(error)
    );
  }
}
