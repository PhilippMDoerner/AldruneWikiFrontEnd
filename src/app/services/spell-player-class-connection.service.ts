import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { SpellPlayerClassConnection } from '../models/spell';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class SpellPlayerClassConnectionService extends GenericService{
  baseUrl: string = `${Constants.wikiApiUrl}/spellclassconnection`;
  constructor(http: HttpClient) { super(http) }
}
