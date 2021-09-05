import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WarningsService } from './warnings.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalUrlParamsService {
  currentCampaignName: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(
  ) { }

  getURLCampaignParameter(): BehaviorSubject<string>{
    return this.currentCampaignName;
  }

  updateCampaignBackgroundImage(newCampaignName: string): void{
    console.log(`Received request to update from ${this.currentCampaignName.value} to ${newCampaignName}`);
    if(newCampaignName === this.currentCampaignName.value) return;

    this.currentCampaignName.next(newCampaignName);
  }
}
