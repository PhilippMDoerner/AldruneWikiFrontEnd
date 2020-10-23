import { Injectable } from '@angular/core';
import { Organization, OrganizationListEntry } from "src/app/models/organization";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";
import { map, catchError, mergeMap, toArray, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  organizationUrl: string = `${Constants.wikiApiUrl}/organization`;

  constructor(private http : HttpClient) { }

  getOrganizations(): Observable<Organization[]>{
    return this.http.get<Organization[]>(this.organizationUrl);
  }

  getListItems(): Observable<Organization[]>{
    return this.getOrganizations();
  }

  getOrganization(organization: number | string): Observable<Organization>{
    const url = (typeof organization === 'number') ? `${this.organizationUrl}/pk/${organization}` :  `${this.organizationUrl}/${organization}`;
    return this.http.get<Organization>(url);
  }

  getOrganizationsFormList(): Observable<{label: string, value: string}[]>{
    const organizationObs = this.getOrganizations();
    return organizationObs.pipe(
      mergeMap((asIs: Organization[]) => asIs),
      map((organization: Organization) => ({
        label: organization.name,
        value: organization.name
      })),
      toArray(),
    );
  }
}
