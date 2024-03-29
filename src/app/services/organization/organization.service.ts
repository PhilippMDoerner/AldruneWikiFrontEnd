import { Injectable } from '@angular/core';
import { OrganizationObject } from "src/app/models/organization";
import { HttpClient } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { GenericObjectService } from '../generic-object.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends GenericObjectService{
  baseUrl: string = `${Constants.wikiApiUrl}/organization`;

  constructor(http : HttpClient) { super(http, OrganizationObject) }
}
