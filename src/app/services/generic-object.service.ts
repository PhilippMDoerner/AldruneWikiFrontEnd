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
  ) { }

  list(): Observable<any[]>{
    const obs: Observable<any[]> = this.http.get<any[]>(this.baseUrl);
    const transformedObs = transformObservableArrayContent(obs, this.objectClass);
    return transformedObs;
  }

  create(data: any): Observable<any>{
    const obs: Observable<any> = this.http.post(`${this.baseUrl}/`, data);
    const transformedObs = transformObservableContent(obs, this.objectClass);
    return transformedObs;
  }

  update(pk: number, data: any): Observable<any>{
    const obs: Observable<any> = this.http.put(`${this.baseUrl}/pk/${pk}/`, data);
    const transformedObs = transformObservableContent(obs, this.objectClass);
    return transformedObs;
  }

  read(pk: number): Observable<any>{
    const obs: Observable<any> = this.http.get(`${this.baseUrl}/pk/${pk}`);
    const transformedObs = transformObservableContent(obs, this.objectClass);
    return transformedObs;
  }

  /**
   * @description Allows you to send a read query based on a param, e.g. "name", assuming the backend is set up for it.
   * The targetted URL will be "${baseURL of API Endpoint}/param"
   * @param param 
   * @returns The data from that endpoint transformed into an object specified by the service
   */
  readByParam(param: number | string): Observable<any>{
    const obs: Observable<any> = this.http.get(`${this.baseUrl}/${param}`);
    const transformedObs = transformObservableContent(obs, this.objectClass);
    return transformedObs;
  }

  delete(pk: number): Observable<any>{
    const obs: Observable<any> = this.http.delete(`${this.baseUrl}/pk/${pk}`);
    const transformedObs = transformObservableContent(obs, this.objectClass);
    return transformedObs;
  }

}