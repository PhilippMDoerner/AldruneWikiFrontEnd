import { Map } from "./map";
import { Location } from "./location";
import { MapMarkerType } from "./mapmarkertype";
export interface MapMarker{
    "color"?: string,
    "icon"?: string,
    "latitude": number,
    "longitude": number,
    "map": number,
    "map_details"?: {"name": string},
    "location": number,
    "location_details"?: {"name": string, "parent_location_name": string},
    "type": number,
    "type_details"?: MapMarkerType,
    "pk"?: number
}

export class EmptyMapMarker implements MapMarker{
    latitude = null;
    longitude = null;
    map = null;
    location = null;
    type = null;
}

export interface SimpleMapMarker{
    "color": string,
    "icon": string,
    "latitude": number,
    "longitude": number,
    "map": number,
    "location": number,
    "type": number,
    "pk": number  
}