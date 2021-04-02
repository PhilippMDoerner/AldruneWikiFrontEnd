import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminUrl =  `${Constants.wikiApiUrl}/admin`

  constructor(private http: HttpClient) { }

  clearDatabase(): Observable<any>{
    return this.http.delete(`${this.adminUrl}/database`);
  }
}
