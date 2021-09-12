import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransformArrayObservable, TransformObservable, transformObservableArrayContent, transformObservableContent } from '../utils/functions/transform';
//TODO: See if you can't throw in an inheritance of GenericService
@Injectable({
  providedIn: 'root'
})
export abstract class GenericObjectService{
  baseUrl: string;

  constructor(
    public http: HttpClient,
    public objectClass: any,
  ) {  }

  list(): Observable<any[]>{
    const dataObs: Observable<any[]> = this.http.get<any[]>(`${this.baseUrl}/`);
    return transformObservableArrayContent(dataObs, this.objectClass);
  }

  campaignList(campaign: string): Observable<any[]>{
    const dataObs: Observable<any[]> = this.http.get<any[]>(`${this.baseUrl}/${campaign}/overview/`);
    return transformObservableArrayContent(dataObs, this.objectClass);
  }

  create(data: any): Observable<any>{
    const dataObs: Observable<any> = this.http.post(`${this.baseUrl}/`, data);
    return transformObservableContent(dataObs, this.objectClass);
  }

  update(pk: number, data: any): Observable<any>{
    const dataObs: Observable<any> = this.http.put(`${this.baseUrl}/pk/${pk}/`, data);
    return transformObservableContent(dataObs, this.objectClass);
  }

  read(pk: number): Observable<any>{
    const dataObs: Observable<any> = this.http.get(`${this.baseUrl}/pk/${pk}/`);
    return transformObservableContent(dataObs, this.objectClass);
  }

  /**
   * @description Allows you to send a read query based on a param, e.g. "name", assuming the backend is set up for it.
   * The targetted URL will be "${baseURL of API Endpoint}/param"
   * @param param 
   * @returns The data from that endpoint transformed into an object specified by the service
   */
  @TransformObservable("objectClass")
  readByParam(campaign: string, params: any): Observable<any>{
    if (typeof params.name !== "string"){
      console.error("The params you used in the service")
      console.error(params)
      throw `Invalid params exception. You tried to use the base readByParams of GenericObjectService with a parameter 
      object without the "name" attribute. This indicates your call is more complex than 
      this base implementation is useful for. Overwrite readByParam in the service that inherits from  
      GenericObjectService and implement the function yourself`;
    }

    if(campaign == null){
      throw "You tried to use readByParam without specifying which campaign you're querying for!";
    }

    const dataObs: Observable<any> = this.http.get(`${this.baseUrl}/${campaign}/${params.name}/`);
    return transformObservableContent(dataObs, this.objectClass);
  }

  delete(pk: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/pk/${pk}/`);
  }

  patch(pk: number, data: any): Observable<any>{
    const dataObs: Observable<any> = this.http.patch(`${this.baseUrl}/pk/${pk}/`, data);
    return transformObservableContent(dataObs, this.objectClass);
  }
}