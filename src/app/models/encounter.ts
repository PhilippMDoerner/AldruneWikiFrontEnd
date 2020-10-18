import { EncounterConnection } from "src/app/models/encounterconnection";
export interface Encounter{
    "pk": number,
    "creation_datetime": string,
    "update_datetime": string,
    "description": string,
    "encounterConnections": EncounterConnection[],
    "name": string
}