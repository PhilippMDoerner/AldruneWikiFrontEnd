import { Image } from "./image";

export interface Character{
    creation_datetime: string,
    update_datetime: string,
    player_character: boolean,
    alive: boolean,
    name: string,
    title: string,
    gender: string,
    race: string,
    description: string,
    organization: number,
    organization_details: characterOrganization,
    current_location: number,
    current_location_details: characterLocation,
    items: characterItem[],
    pk: number;
    encounters: characterEncounter[];
    images: Image[];
}

export interface characterLocation{
    pk: number,
    name: string,
    name_full: string,
    parent_location: string
}

interface characterEncounter{
    name: string,
    creation_datetime: string,
    update_datetime:string,
    encounterConnections: characterEncounterConnections[]
    description: string
    pk: number
}

interface characterEncounterConnections{
    connection_pk: number
    character_name: string,
}

interface characterOrganization{
    pk: number,
    name: string
}

interface characterItem{
    pk: number,
    name: string
}



export class EmptyFormCharacter{
    player_character: boolean;
    alive: boolean;
    name: string;
    title: string;
    gender: string;
    race: string;
    description: string;
    organization: number;
    current_location: number;
    pk: number;
}