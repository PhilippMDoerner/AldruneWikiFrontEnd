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

  getItem(item: number | string): Observable<Item>{
    const url = (typeof item === 'number') ? `${this.itemUrl}/pk/${item}` :  `${this.itemUrl}/${item}`;
    return this.http.get<Item>(url);
  }

  createItem(item: Item): Observable<Item>{
    return this.http.post<Item>(`${this.itemUrl}/`, item);
  }

  updateItem(item: Item): Observable<Item>{
    const url = `${this.itemUrl}/pk/${item.pk}/`;
    return this.http.put<Item>(url, item);
  }

  deleteItem(item_pk: number){
    const url = `${this.itemUrl}/pk/${item_pk}/`;
    return this.http.delete(url);
  }
}
