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
    name: string;
    icon: string;
    image: string;

    constructor(object?: Map){
        if(object) Object.assign(this, object);
    }

    getAbsoluteRouterUrl(): string{
        return `/map/${this.name}`;
    }
}