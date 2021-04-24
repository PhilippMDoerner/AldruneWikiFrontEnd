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

  create(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/`, data);
  }

  update(pk: number, data: any): Observable<any>{
    return this.http.put(`${this.baseUrl}/pk/${pk}`, data);
  }

  read(pk: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/pk/${pk}`);
  }

  /**
   * @description Allows you to send a read query based on a param, e.g. "name", assuming the backend is set up for it.
   * The targetted URL will be "${baseURL of API Endpoint}/param"
   * @param param 
   * @returns The data from that endpoint by the service
   */
  readByParam(param: number | string): Observable<any>{
    return this.http.get(`${this.baseUrl}/${param}`);
  }

  delete(pk: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/pk/${pk}`);
  }

}
