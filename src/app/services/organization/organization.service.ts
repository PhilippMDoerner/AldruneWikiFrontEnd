import { Injectable } from '@angular/core';
import { Organization, OrganizationObject } from "src/app/models/organization";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";
import { TransformArrayObservable, TransformObservable } from 'src/app/utils/functions/transform';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  organizationUrl: string = `${Constants.wikiApiUrl}/organization`;

  constructor(private http : HttpClient) { }

  @TransformArrayObservable(OrganizationObject)
  getOrganizations(): Observable<Organization[]>{
    return this.http.get<Organization[]>(this.organizationUrl);
  }

  @TransformObservable(OrganizationObject)
  getOrganization(organization: number | string): Observable<Organization>{
    const url: string = (typeof organization === 'number') ? `${this.organizationUrl}/pk/${organization}` :  `${this.organizationUrl}/${organization}`;
    return this.http.get<Organization>(url);
  }

  @TransformObservable(OrganizationObject)
  createOrganization(organization: Organization): Observable<Organization>{
    return this.http.post<Organization>(`${this.organizationUrl}/`, organization);
  }

  @TransformObservable(OrganizationObject)
  updateOrganization(organization: Organization): Observable<Organization>{
    const url: string = `${this.organizationUrl}/pk/${organization.pk}/`;
    return this.http.put<Organization>(url, organization);
  }

  @TransformObservable(OrganizationObject)
  deleteOrganization(organization_pk){
    const url: string = `${this.organizationUrl}/pk/${organization_pk}/`;
    return this.http.delete<Organization>(url);
  }
}
