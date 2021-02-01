import { EncounterConnection } from "src/app/models/encounterconnection";
import { Constants } from '../app.constants';
import { ArticleObject } from './base-models';

interface diaryEntryUser{
    pk: number,
    name: string
}

export interface Encounter extends ArticleObject{
    pk?: number,
    description: string,
    session_number: number,
    session_number_details?: {name: string, pk: number, name_full: string},
    encounterConnections?: EncounterConnection[],
    location: number,
    location_details?: {name: string, pk: number, name_full: string, parent_location_name: string},
    author: number,
    author_details?: diaryEntryUser,
    title: string,
    order_index: number;
}

export class EncounterObject implements Encounter {
    pk?: number;
    description: string;
    session_number: number;
    encounterConnections?: EncounterConnection[];
    location: number;
    name: string;
    author: number;
    author_details?: diaryEntryUser;
    title: string;
    order_index: number;


    constructor(object?: Encounter){
        if (object) Object.assign(this, object)
    }

    getAbsoluteRouterUrl(){
        if (!this.pk) throw "Can't generate URL for Encounter object without pk";
        return `${Constants.wikiUrlFrontendPrefix}/encounter/${this.pk}`;
    }
}