import { ApiObject } from './base-models';

export interface EncounterConnection extends ApiObject{
    encounter: number,
    encounter_details?: {name: string, name_full: string, pk: number},
    character: number,
    character_details?: {name: string, name_full: string, pk: number},
}

export class EmptyFormEncounterConnection implements EncounterConnection{
    pk?: number;
    encounter: number;
    character: number;

    getAbsoluteRouterUrl(){
        if (!this.pk) throw "Can't generate URL for EncounterConnection object without pk";
        return `/encounterconnection/${this.pk}`;
    }
}