import { ApiObject } from './base-models';

export interface EncounterConnection{
    pk?: number,
    encounter: number,
    encounter_details?: {name: string, name_full: string, pk: number},
    character: number,
    character_details?: {name: string, name_full: string, pk: number},
}

export class EncounterConnectionObject implements EncounterConnection{
    pk?: number;
    encounter: number;
    character: number;
}