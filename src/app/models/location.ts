export interface Location {
    "creation_datetime": string,
    "update_datetime": string,
    "name": string,
    "name_full": string,
    "description": string,
    "parent_location": {
        'pk': number,
        'name': string,
        'parent_location': string,
        'name_full': string
    },
    "pk": number
}

export interface SimpleLocation {
    "name": string,
    "description": string,
    "parent_location": number,
    "pk": number
}

