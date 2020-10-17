import { Encounter } from "./encounter";
import { Image } from "./image";

export interface Character{
    url: string,
    creation_datetime: string,
    update_datetime: string,
    player_character: boolean,
    alive: boolean,
    name: string,
    title: string | null,
    gender: string,
    race: string,
    description: string,
    is_secret: boolean,
    organization: string | null,
    current_location: string | null,
    images: Image[],
    encounters: Encounter[]
}