import { Map } from "./map";
import { Location } from "./location";
import { MapMarkerType } from "./mapmarkertype";
export interface MapMarker{
    "color": string,
    "icon": string,
    "latitude": number,
    "longitude": number,
    "map": Map,
    "location": Location,
    "type": MapMarkerType,
    "pk": number
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