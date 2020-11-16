import { ArticleObject } from './base-models';
import { MapMarker } from './mapmarker';

export interface Map extends ArticleObject{
    icon: string,
    image: string,
}

export interface ExtendedMap extends Map{
    markers?: MapMarker[],
}

export class EmptyFormMap implements ExtendedMap{
    name = null;
    icon = null;
    image = null;

    getAbsoluteRouterUrl(): string{
        return `/map/${this.name}`;
    }
}