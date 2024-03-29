import { Constants } from '../app.constants';
import { ArticleObject } from './base-models';
import { MapMarker } from './mapmarker';

export interface Map extends ArticleObject{
    icon: string,
    image: string,
}

export interface ExtendedMap extends Map{
    markers?: MapMarker[],
}

export class MapObject implements ExtendedMap{
    name?: string;
    icon: string;
    image: string;
    pk?: number;
    campaign_details?: {pk: number, name: string};
    campaign: number;

    constructor(object?: Map){
        if(object) Object.assign(this, object);
    }

    getAbsoluteRouterUrl(): string{
        return `${Constants.wikiUrlFrontendPrefix}/map/${this.campaign_details.name}/${this.name}`;
        //return this.routingService.getRoutePath("map", {campaign: this.campaign_details.name, name: this.name});
    }
}