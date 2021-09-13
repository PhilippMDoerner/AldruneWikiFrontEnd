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
    campaign?: number //Exists to allow CampaignArticlePermission in the backend to check which campaign to look at for if you got permission or not
}