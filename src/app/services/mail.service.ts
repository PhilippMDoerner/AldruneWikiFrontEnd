import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../app.constants';
import { OverviewService } from './overview.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  mailUrl: string = `${Constants.wikiApiUrl}/mail`;

  constructor(
    private http: HttpClient
  ) { }

  send_error_notification(error: object): Observable<any>{
    return this.http.post<any>(`${this.mailUrl}/error`, error);
  }

  requestPasswordReset(username: string): Observable<any>{
    return this.http.post(`${this.mailUrl}/reset`, {username: username});
  }
}
