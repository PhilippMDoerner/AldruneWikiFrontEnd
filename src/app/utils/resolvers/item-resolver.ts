import { Injectable } from "@angular/core";
import { ItemService } from "src/app/services/item/item.service";
import { BaseArticleResolver } from "./base-resolvers";


@Injectable({ providedIn: 'root' })
export class ItemResolver extends BaseArticleResolver {
    constructor( service: ItemService ) { 
        super(service);
    }
}