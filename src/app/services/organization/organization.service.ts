import { Injectable } from '@angular/core';
import { Organization, OrganizationObject } from "src/app/models/organization";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";
import { TransformArrayObservable, TransformObservable } from 'src/app/utils/functions/transform';
import { GenericObjectService } from '../generic-object.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends GenericObjectService{
  baseUrl: string = `${Constants.wikiApiUrl}/organization`;

  constructor(http : HttpClient) { super(http, OrganizationObject) }
}
