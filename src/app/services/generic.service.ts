import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericService {

  baseUrl: string;

  constructor(private http: HttpClient) { }

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

  delete(pk: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/pk/${pk}`);
  }

}
