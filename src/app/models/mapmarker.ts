import { Map } from "./map";
import { Location } from "./location";
import { MapMarkerType } from "./mapmarkertype";
import { ApiObject } from './base-models';
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

export class EmptyMapMarker implements MapMarker{
    latitude: number;
    longitude: number;
    map: number;
    map_details?: {name: string};
    location: number;
    location_details?: {name: string, parent_location_name: string, description: string, sublocations: string[]};
    type: number;

    getAbsoluteRouterUrl(): string{
        if (!this.map_details) throw "Can't generate URL for MapMarker object without map_details";
        if (!this.location_details) throw "Can't generate URL for Encounter object without location_details";
        return `/marker/${this.location_details.parent_location_name}/${this.location_details.name}/${this.map_details.name}`;
    }
}
