import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../app.constants';
import {CampaignOverview } from '../models/campaign';
import { User } from '../models/user';
import { GenericService } from './generic.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService extends GenericService{
  baseUrl: string = `${Constants.wikiApiUrl}/campaign`;

  constructor(
    http : HttpClient,
    private tokenService: TokenService
  ) { 
    super(http)  //Second param indicates which class the data of this service is turned into
  }



  campaignList(): Observable<any[]>{
    const campaignObs: Observable<any[]> =  this.http.get<CampaignOverview[]>(`${this.baseUrl}/overview/`);
    return campaignObs.pipe(map(
      (campaigns: CampaignOverview[]) => {
        campaigns.forEach(campaign => {
          campaign.isMember = this.tokenService.isCampaignMember(campaign.name.toLowerCase());
          campaign.isAdmin = this.tokenService.isCampaignAdmin(campaign.name.toLowerCase());
          campaign.isGuest = this.tokenService.isCampaignGuest(campaign.name.toLowerCase());
        });
        return campaigns;
      }
    ));
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
}
