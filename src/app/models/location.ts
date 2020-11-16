import { ArticleObject } from './base-models';
import { Image } from "./image";

export interface Location extends ArticleObject{
    name_full?: string,
    description: string,
    parent_location: number,
    images?: Image[],
    parent_location_details?: {
        pk: number,
        name: string,
        parent_location: string,
        name_full: string,
    },
    parent_location_list?: string[],
    characters?: LocationCharacter[],
    sublocations?: SubLocation[],
    marker_details?: [{map: string, map_icon: string}],

    getAbsoluteRouterUrlForParentLocation(): string
}

export interface SubLocation{
    creation_datetime: string,
    update_datetime: string,
    name: string,
    pk: number,
    characters: LocationCharacter[],
    name_full: string,
    description: string,
    parent_location_name: string,
}

interface LocationCharacter{
    name: string,
    pk: number,
    name_full: string
}

export class LocationObject implements Location{
    name: string;
    description: string;
    parent_location: number;
    parent_location_details?: {
        pk: number,
        name: string,
        parent_location: string,
        name_full: string,
    }
    pk?: number;

    constructor(object?: Location){
        if (object) Object.assign(this, object)
    }

    getAbsoluteRouterUrl(): string{
        if (!this.parent_location_details) throw "Can't generate URL for Location object without parent_location_details";
        return `/location/${this.parent_location_details.name}/${this.name}`;
    }

    getAbsoluteRouterUrlForParentLocation(): string{
        if (!this.parent_location_details) throw "Can't generate URL for Parent-Location of Location object without parent_location_details";
        return `/location/${this.parent_location_details.parent_location}/${this.parent_location_details.name}`;
    }
}

