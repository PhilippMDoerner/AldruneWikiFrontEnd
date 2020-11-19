import { Constants } from '../app.constants';
import { ArticleObject } from './base-models';
import { Image } from './image';

export interface Creature extends ArticleObject{
    images?: Image,
    description: string,
}

export class CreatureObject implements Creature{
    pk?: number;
    images?: Image;
    name: string;
    description: string;

    constructor(object?: Creature){
        if (object) Object.assign(this, object);
    }

    getAbsoluteRouterUrl(): string{
        return `${Constants.wikiUrlFrontendPrefix}/creature/${this.name}`;
    }
}