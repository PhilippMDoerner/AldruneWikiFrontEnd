import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { PermissionGroup } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  groupUrl: string = `${Constants.wikiApiUrl}/group`;

  constructor(
    private http: HttpClient
  ) { }

  getGroups(): Observable<PermissionGroup[]>{
    return this.http.get<PermissionGroup[]>(`${this.groupUrl}`);
  }
}
