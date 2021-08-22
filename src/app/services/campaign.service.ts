import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService extends GenericService{
  baseUrl: string = `${Constants.wikiApiUrl}/campaign`;

  constructor(http : HttpClient) { 
    super(http)  //Second param indicates which class the data of this service is turned into
  }

  campaignList(): Observable<any[]>{
    return this.list();
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


}
