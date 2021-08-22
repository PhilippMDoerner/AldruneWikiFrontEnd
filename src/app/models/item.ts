import { Constants } from "../app.constants";
import { ArticleObject } from './base-models';
import { Image } from './image';

export interface Item extends ArticleObject{
    description: string,
    owner: number,
    owner_details?: {name: string, pk: number},
    images?: Image[],
}

export class ItemObject implements Item{
    name?: string;
    description: string;
    owner: number;
    owner_details?: {name: string, pk: number};
    images?: Image[];
    pk?: number;
    campaign_details: {pk: number, name: string};

    constructor(object?: Item){
        if (object) Object.assign(this, object)
    }

    getAbsoluteRouterUrl(): string{
        return `${Constants.wikiUrlFrontendPrefix}/item/${this.campaign_details.name}/${this.name}`;
        //return this.routingService.getRoutePath("item", {campaign: this.campaign_details.name, name: this.name});
    }
}