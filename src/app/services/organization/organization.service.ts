import { Injectable } from '@angular/core';
import { Organization, OrganizationListEntry } from "src/app/models/organization";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  organizationUrl: string = `${Constants.wikiApiURL}/organization`;

  constructor(private http : HttpClient) { }

  getOrganizations(): Observable<Organization[]>{
    return this.http.get<Organization[]>(this.organizationUrl);
  }

  getOrganization(organization: number | string): Observable<Organization>{
    const url = (typeof organization === 'number') ? `${this.organizationUrl}/pk/${organization}` :  `${this.organizationUrl}/${organization}`;
    return this.http.get<Organization>(url);
  }
}
