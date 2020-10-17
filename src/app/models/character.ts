import { Encounter } from "./encounter";
import { Image } from "./image";

export interface Character{
    url: string,
    creation_datetime: string,
    update_datetime: string,
    player_character: boolean,
    alive: boolean,
    name: string,
    title: string,
    gender: string,
    race: string,
    description: string,
    is_secret: boolean,
    organization: characterOrganization,
    current_location: string,
    images: Image[],
    encounters: characterEncounter[],
    items: characterItems[]
}

interface characterItems {
    url: string,
    name: string
}

interface characterOrganization{
    url: string,
    name: string
}

interface characterEncounter{
    name: string,
    url: string,
    creation_datetime: string,
    update_datetime:string,
    encounterConnections: characterEncounterConnections[]
    description: string
    pk: number
}

interface characterEncounterConnections{
    character: string,
    url: string
}