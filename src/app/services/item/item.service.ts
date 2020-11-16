import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { Item, ItemObject } from 'src/app/models/item';
import { TransformObservable, TransformArrayObservable } from "src/app/utils/functions/transform";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemUrl: string = `${Constants.wikiApiUrl}/item`;

  constructor(private http : HttpClient) { }

  @TransformArrayObservable(ItemObject)
  getItems(): Observable<Item[]>{
    return this.http.get<Item[]>(this.itemUrl);
  }

  @TransformObservable(ItemObject)
  getItem(item: number | string): Observable<Item>{
    const url = (typeof item === 'number') ? `${this.itemUrl}/pk/${item}` :  `${this.itemUrl}/${item}`;
    return this.http.get<Item>(url);
  }

  @TransformObservable(ItemObject)
  createItem(item: Item): Observable<Item>{
    return this.http.post<Item>(`${this.itemUrl}/`, item);
  }

  @TransformObservable(ItemObject)
  updateItem(item: Item): Observable<Item>{
    const url = `${this.itemUrl}/pk/${item.pk}/`;
    return this.http.put<Item>(url, item);
  }

  @TransformObservable(ItemObject)
  deleteItem(item_pk: number){
    const url = `${this.itemUrl}/pk/${item_pk}/`;
    return this.http.delete(url);
  }
}
