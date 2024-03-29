import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { PlayerClass } from '../models/playerclass';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerClassService extends GenericService{
  baseUrl: string = `${Constants.wikiApiUrl}/player_class`;

  constructor(
    http: HttpClient
  ) { super(http) }
}
