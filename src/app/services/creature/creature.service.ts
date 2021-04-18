import { Injectable } from '@angular/core';
import { Creature, CreatureObject } from "src/app/models/creature";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/app.constants";
import { Observable } from "rxjs";
import { TransformArrayObservable, TransformObservable } from 'src/app/utils/functions/transform';
import { GenericObjectService } from '../generic-object.service';

@Injectable({
  providedIn: 'root'
})
export class CreatureService extends GenericObjectService{
  baseUrl: string = `${Constants.wikiApiUrl}/creature`
  constructor(http : HttpClient) { 
    super(http, CreatureObject)  //Second param indicates which class the data of this service is turned into
  }

}
