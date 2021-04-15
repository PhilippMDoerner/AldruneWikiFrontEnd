import { Constants } from '../app.constants';
import { ObjectListComponent } from '../components/utility/object-list/object-list.component';
import { ApiObject, ArticleObject } from './base-models';
import { Image } from "./image";
import { PlayerClass } from './playerclass';

export interface Character extends ArticleObject{
    player_character: boolean,
    alive: boolean,
    title: string,
    gender: string,
    race: string,
    description: string,
    organization: number,
    organization_details?: characterOrganization,
    current_location: number,
    current_location_details?: characterLocation,
    items?: characterItem[],
    encounters?: characterEncounter[],
    images?: Image[],
    player_class?: PlayerClass[],
}

export interface characterLocation{
    pk: number,
    name?: string,
    name_full: string,
    parent_location: string
}

interface characterEncounter{
    name?: string,
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

export class CharacterObject implements Character{
    constructor(object?: Character){
        if (object) Object.assign(this, object);
    }

    player_character: boolean;
    alive: boolean;
    name: string;
    title: string;
    gender: string;
    race: string;
    description: string;
    organization: number;
    current_location: number;
    pk?: number;
    current_location_details?: characterLocation;
    organization_details?: characterOrganization;
    items?: characterItem[];
    encounters?: characterEncounter[];
    images?: Image[];
    player_class?: PlayerClass[];

    getAbsoluteRouterUrl(): string{
        return `${Constants.wikiUrlFrontendPrefix}/character/${this.name}`;
    }
}