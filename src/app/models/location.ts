import { Image } from './image';

export interface Location {
    "creation_datetime"?: string,
    "update_datetime"?: string,
    "name": string,
    "name_full"?: string,
    "description": string,
    "parent_location": number,
    "images"?: Image[],
    "parent_location_details"?: {
        'pk': number,
        'name': string,
        'parent_location': string,
        'name_full': string,
    },
    "parent_location_list"?: string[],
    "pk": number,
    "characters"?: LocationCharacter[],
    "sublocations"?: SubLocation[]
}

export interface SubLocation{
    "creation_datetime": string,
    "update_datetime": string,
    "name": string,
    "pk": number,
    "characters": LocationCharacter[],
    "name_full": string,
    "description": string,
    "parent_location_name": string,
}

interface LocationCharacter{
    "name": string,
    "pk": number,
    "name_full": string
}

export class EmptyFormLocation {
    "name": string = null;
    "description": string = null;
    "parent_location": number = null;
    "pk": number = null;
}

