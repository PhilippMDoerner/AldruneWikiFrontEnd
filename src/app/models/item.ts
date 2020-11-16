import { ArticleObject } from './base-models';
import { Image } from './image';

export interface Item extends ArticleObject{
    description: string,
    owner: number,
    owner_details?: {name: string, pk: number},
    images?: Image[],
}

export class EmptyFormItem implements Item{
    name: string;
    description: string;
    owner: number;
    pk: number;

    getAbsoluteRouterUrl(): string{
        return `/item/${name}`;
    }
}