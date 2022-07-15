import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { CharacterObject } from '../models/character';
import { GenericObjectService } from './generic-object.service';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationMembershipService extends GenericObjectService{
  baseUrl: string = `${Constants.wikiApiUrl}/character/organizationmemberships`;

  constructor(
    http: HttpClient
  ) { super(http, CharacterObject)}
}
