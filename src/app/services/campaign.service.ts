import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from '../app.constants';
import { Campaign, CampaignOverview } from '../models/campaign';
import { User } from '../models/user';
import { GenericService } from './generic.service';
import { WarningsService } from './warnings.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService extends GenericService{
  baseUrl: string = `${Constants.wikiApiUrl}/campaign`;
  currentCampaignData: BehaviorSubject<Campaign> = new BehaviorSubject(null);

  constructor(
    http : HttpClient,
    private warning: WarningsService
  ) { 
    super(http)  //Second param indicates which class the data of this service is turned into
  }



  campaignList(): Observable<any[]>{
    return this.http.get<CampaignOverview[]>(`${this.baseUrl}/overview/`);
  }

  /**
   * @description Allows you to send a read query based on a param, e.g. "name", assuming the backend is set up for it.
   * The targetted URL will be "${baseURL of API Endpoint}/param"
   * @param param 
   * @returns The data from that endpoint by the service
   */
  readByParam(campaign: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/${campaign}/`);
  }

  addMember(campaign: string, user: User): Observable<User[]>{
    const requestBody = {action: "add_member", user}
    return this.http.patch<User[]>(`${this.baseUrl}/${campaign}/members/`, requestBody);
  }

  addAdmin(campaign: string, user: User): Observable<User[]>{
    const requestBody = {action: "add_admin", user}

    return this.http.patch<User[]>(`${this.baseUrl}/${campaign}/members/`, requestBody);
  }

  removeMember(campaign: string, user: User): Observable<User[]>{
    const requestBody = {action: "remove_member", user}
    return this.http.patch<User[]>(`${this.baseUrl}/${campaign}/members/`, requestBody);
  }


  removeAdmin(campaign: string, user: User): Observable<User[]>{
    const requestBody = {action: "remove_admin", user}
    return this.http.patch<User[]>(`${this.baseUrl}/${campaign}/members/`, requestBody);
  }

  getCampaignData(): BehaviorSubject<Campaign>{
    return this.currentCampaignData;
  }

  updateCampaignData(campaignName: string): void{
    console.log("Asking service to update the subject with " + campaignName);
    if(campaignName == null) return //Contemplate putting in some default campaign data

    const currentCampaign: Campaign = this.currentCampaignData.value;
    const isCurrentCampaign: boolean = currentCampaign.name.toLowerCase() === campaignName.toLowerCase();
    if (isCurrentCampaign) return;
    
    this.readByParam(campaignName).pipe(first()).subscribe(
      (newCampaignData: Campaign) => this.currentCampaignData.next(newCampaignData),
      error => this.warning.showWarning(error)
    );
  }

}
