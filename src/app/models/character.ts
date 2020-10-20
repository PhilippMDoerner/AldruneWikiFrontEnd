import { Encounter } from "./encounter";
import { Image } from "./image";

// TODO: Check out to move encounters and images into this one single object to reduce queries on the backend to a minimum
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
    current_location: string,
    items: string[],
    pk: number;
    encounters: characterEncounter[];
    images: Image[];
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

export interface FormCharacter{
    is_player_character: boolean,
    is_alive: boolean,
    name: string,
    title: string,
    gender: string,
    race: string,
    organization: string,
    current_location: string
}