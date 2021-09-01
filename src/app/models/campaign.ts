import { ArticleObject } from './base-models';
import { Image } from './image';
import { Constants } from '../app.constants';

export interface Campaign extends ArticleObject{
    name: string;
    pk?: number;
}

export class CampaignObject implements Campaign{
    pk?: number;
    name: string;

    constructor(object?: Campaign){
        if (object) Object.assign(this, object);
    }

    getAbsoluteRouterUrl(): string{
        return `${Constants.wikiUrlFrontendPrefix}/admin` ;
    }
}