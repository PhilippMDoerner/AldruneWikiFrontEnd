import { ExtendedMapMarker, MapMarker } from './mapmarker';

export interface Map{
    "name": string,
    "icon": string,
    "creation_datetime": string,
    "image": string,
    "pk": number
}

export interface ExtendedMap extends Map{
    "markers": ExtendedMapMarker[],
}

export interface SimpleMap{
    "name": string,
    "icon": string,
    "image": string,
    "pk": number  
}