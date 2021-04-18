import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { Item, ItemObject } from 'src/app/models/item';
import { TransformObservable, TransformArrayObservable } from "src/app/utils/functions/transform";
import { GenericObjectService } from '../generic-object.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends GenericObjectService {
  baseUrl: string = `${Constants.wikiApiUrl}/item`;

  constructor(http : HttpClient) { super(http, ItemObject) }
}
