import { ArticleObject } from './base-models';
import { Image } from './image';
import { Constants } from '../app.constants';

export interface Creature extends ArticleObject{
    images?: Image,
    description: string,
    campaign: number;
}

export class CreatureObject implements Creature{
    pk?: number;
    images?: Image;
    name?: string;
    description: string;
    campaign_details: {pk: number, name: string};
    campaign: number;

    constructor(object?: Creature){
        if (object) Object.assign(this, object);
    }

    getAbsoluteRouterUrl(): string{
        return `${Constants.wikiUrlFrontendPrefix}/creature/${this.campaign_details.name}/${this.name}`;
        //return this.routingService.getRoutePath("creature", {campaign: this.campaign_details.name, name: this.name});
    }
}