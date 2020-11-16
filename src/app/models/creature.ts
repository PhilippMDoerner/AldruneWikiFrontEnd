import { ArticleObject } from './base-models';
import { Image } from './image';

export interface Creature extends ArticleObject{
    images?: Image,
    description: string,
}

export class EmptyFormCreature implements Creature{
    pk = null;
    name = null;
    description = null;

    getAbsoluteRouterUrl(): string{
        return `/creature/${this.name}`;
    }
}