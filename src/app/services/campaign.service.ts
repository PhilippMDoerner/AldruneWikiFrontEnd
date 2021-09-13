import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Constants } from '../app.constants';
import {Campaign, CampaignOverview } from '../models/campaign';
import { User } from '../models/user';
import { convertMultiFileModelToFormData, convertSingleFileModelToFormData } from '../utils/formDataConverter';
import { GenericService } from './generic.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService extends GenericService{
  baseUrl: string = `${Constants.wikiApiUrl}/campaign`;

  constructor(
    http : HttpClient,
    private tokenService: TokenService,
  ) { 
    super(http)  //Second param indicates which class the data of this service is turned into
  }



  campaignList(): Observable<CampaignOverview[]>{
    const campaignObs: Observable<CampaignOverview[]> =  this.http.get<CampaignOverview[]>(`${this.baseUrl}/overview/`);
    return campaignObs.pipe(
      map((campaigns: CampaignOverview[]) => {
        campaigns.forEach(campaign => {
          campaign.isMember = this.tokenService.isCampaignMember(campaign.name.toLowerCase());
          campaign.isAdmin = this.tokenService.isCampaignAdmin(campaign.name.toLowerCase());
          campaign.isGuest = this.tokenService.isCampaignGuest(campaign.name.toLowerCase());
        });
        return campaigns;
      })
    );
  }

  create(data: Campaign): Observable<Campaign>{
    const campaignData = this.processCampaignData(data);
    return super.create(campaignData);
  }

  update(pk: number, data: Campaign): Observable<Campaign>{
    const campaignData = this.processCampaignData(data);
    return super.update(pk, campaignData);
  }

  patch(pk: number, data: Campaign): Observable<Campaign>{
    const campaignData = this.processCampaignData(data);
    return super.patch(pk, campaignData);
  }

  private processCampaignData(userModel: Campaign): Campaign | FormData{
    const hasNewIcon: boolean = this.hasImageSelected(userModel.icon);
    const hasNewBackgroundImage: boolean = this.hasImageSelected(userModel.background_image);

    if (!hasNewIcon && !hasNewBackgroundImage){
      delete userModel.icon;
      delete userModel.background_image;
      return userModel;

    } else if (!hasNewIcon && hasNewBackgroundImage){
      delete userModel.icon;
      const userModelFormData: FormData = convertSingleFileModelToFormData(userModel, 'background_image');
      return userModelFormData;

    } else if (hasNewIcon && !hasNewBackgroundImage){
      delete userModel.background_image;
      const userModelFormData: FormData = convertSingleFileModelToFormData(userModel, 'icon');
      return userModelFormData;

    } else {
      const userModelFormData: FormData = convertMultiFileModelToFormData(userModel, ["background_image", "icon"]);
      return userModelFormData;
    }
  }

  private hasImageSelected(imageFieldValue: any) : boolean{
    return imageFieldValue.constructor.name === "FileList";
  }

  delete(pk: number): Observable<any>{
    throw "You can not delete a campaign, please use 'deactivate' instead";
  }

  /** Under the hood this may call "delete" but "delete" does not actually delete a campaign in the backend, it just deactivates it 
   * The functions were renamed to make that fact clear
   */
  deactivate(pk: number): Observable<any>{
    return super.delete(pk);
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

  addGuest(campaign: string, user: User): Observable<User[]>{
    const requestBody = {action: "add_guest", user}
    return this.http.patch<User[]>(`${this.baseUrl}/${campaign}/members/`, requestBody);
  }

  addMember(campaign: string, user: User): Observable<User[]>{
    const requestBody = {action: "add_member", user}
    return this.http.patch<User[]>(`${this.baseUrl}/${campaign}/members/`, requestBody);
  }

  addAdmin(campaign: string, user: User): Observable<User[]>{
    const requestBody = {action: "add_admin", user}

    return this.http.patch<User[]>(`${this.baseUrl}/${campaign}/members/`, requestBody);
  }

  removeGuest(campaign: string, user: User): Observable<User[]>{
    const requestBody = {action: "remove_guest", user}
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
