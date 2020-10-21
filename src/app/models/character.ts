import { Encounter } from "./encounter";
import { Image } from "./image";

export interface Character{
    creation_datetime: string,
    update_datetime: string,
    is_player_character: boolean,
    is_alive: boolean,
    name: string,
    title: string,
    gender: string,
    race: string,
    description: string,
    organization: string,
    current_location: characterLocation,
    items: string[],
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

export interface characterEncounter{
    name: string,
    creation_datetime: string,
    update_datetime:string,
    encounterConnections: characterEncounterConnections[]
    description: string
    pk: number
}

export interface characterEncounterConnections{
    connection_pk: number
    character_name: string,
}
