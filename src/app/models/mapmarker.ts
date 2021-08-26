import { MapMarkerType } from "./mapmarkertype";
import { ApiObject } from './base-models';
import { Constants } from '../app.constants';
export interface MapMarker extends ApiObject{
    color?: string,
    icon?: string,
    latitude: number,
    longitude: number,
    map: number,
    map_details?: {name: string},
    location: number,
    location_details?: {name: string, parent_location_name: string, description: string, sublocations: string[]},
    type: number,
    type_details?: MapMarkerType,
    pk?: number
}

export class MapMarkerObject implements MapMarker{
    latitude: number;
    longitude: number;
    icon?: string;
    color?: string;
    map: number;
    map_details?: {name: string};
    location: number;
    location_details?: {name: string, parent_location_name: string, description: string, sublocations: string[]};
    campaign_details?: {name: string, pk: number};
    type: number;
    type_details?: MapMarkerType;
    pk?: number;

    constructor(object?: MapMarker){
        if(object) Object.assign(this, object);
    }

    getAbsoluteRouterUrl(): string{
        if (!this.map_details) throw "Can't generate URL for MapMarker object without map_details";
        if (!this.location_details) throw "Can't generate URL for Encounter object without location_details";
        return `${Constants.wikiUrlFrontendPrefix}/marker/${this.campaign_details.name}/${this.location_details.parent_location_name}/${this.location_details.name}/${this.map_details.name}`;
    }
}
