import { EncounterConnection } from "src/app/models/encounterconnection";
import { ArticleObject } from './base-models';
export interface Encounter extends ArticleObject{
    description: string,
    session_number: number,
    session_number_details?: {name: string, pk: number, name_full: string},
    encounterConnections?: EncounterConnection[],
    location: number,
    location_details?: {name: string, pk: number, name_full: string, parent_location_name: string},
}

export class EncounterObject implements Encounter {
    pk?: number;
    description: string;
    session_number: number;
    location: number;
    name: string;

    constructor(object?: Encounter){
        if (object) Object.assign(this, object)
    }

    getAbsoluteRouterUrl(){
        if (!this.pk) throw "Can't generate URL for Encounter object without pk";
        return `/encounter/${this.pk}`;
    }
}