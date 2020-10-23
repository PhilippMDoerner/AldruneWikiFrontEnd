import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { Item } from 'src/app/models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemUrl: string = `${Constants.wikiApiUrl}/item`;

  constructor(private http : HttpClient) { }

  getItems(): Observable<Item[]>{
    return this.http.get<Item[]>(this.itemUrl);
  }

  getListItems(): Observable<Item[]>{
    return this.getItems();
  }
}
