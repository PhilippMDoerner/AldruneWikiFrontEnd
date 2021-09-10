import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericService {

  baseUrl: string;

  constructor(
    public http: HttpClient
  ) { }

  list(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl);
  }

  campaignList(campaign: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/${campaign}/overview`);
  }

  create(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/`, data);
  }

  update(pk: number, data: any): Observable<any>{
    return this.http.put(`${this.baseUrl}/pk/${pk}/`, data);
  }

  read(pk: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/pk/${pk}/`);
  }

  /**
   * @description Allows you to send a read query based on a param, e.g. "name", assuming the backend is set up for it.
   * The targetted URL will be "${baseURL of API Endpoint}/param"
   * @param param 
   * @returns The data from that endpoint by the service
   */
  readByParam(campaign: string, params: any): Observable<any>{
    if (typeof params.name !== "string"){
      console.error("The params you used in the service")
      console.error(params)
      throw `Invalid params exception. You tried to use the base readByParams of GenericService with a parameter 
      object without the "name" attribute. This indicates your call is more complex than 
      this base implementation is useful for. Overwrite readByParam in the service that inherits from  
      GenericObjectService and implement the function yourself`;
    }

    return this.http.get(`${this.baseUrl}/${campaign}/${params.name}/`);
  }

  delete(pk: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/pk/${pk}/`);
  }

  patch(pk: number, data: any): Observable<any>{
    return this.http.patch(`${this.baseUrl}/pk/${pk}/`, data);
  }
}
