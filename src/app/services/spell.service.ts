import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from "src/app/app.constants";
import { Spell, SpellObject } from '../models/spell';
import { TransformArrayObservable, TransformObservable } from '../utils/functions/transform';
import { GenericObjectService } from './generic-object.service';

@Injectable({
  providedIn: 'root'
})
export class SpellService extends GenericObjectService{
  baseUrl: string = `${Constants.wikiApiUrl}/spell`;

  constructor(http: HttpClient) { super(http, SpellObject) }
}
