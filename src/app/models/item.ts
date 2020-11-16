import { ArticleObject } from './base-models';
import { Image } from './image';

export interface Item extends ArticleObject{
    description: string,
    owner: number,
    owner_details?: {name: string, pk: number},
    images?: Image[],
}

export class ItemObject implements Item{
    name: string;
    description: string;
    owner: number;
    owner_details?: {name: string, pk: number};
    images?: Image[];
    pk?: number;

    constructor(object?: Item){
        if (object) Object.assign(this, object)
    }

    getAbsoluteRouterUrl(): string{
        return `/item/${name}`;
    }
}