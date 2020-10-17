import { EncounterConnection } from "src/app/models/encounterconnection";
export interface Encounter    {
    "url": string,
    "creation_datetime": string,
    "update_datetime": string,
    "description": string,
    "is_secret": boolean,
    "location": string,
    "session_number": string,
    "encounterconnection": EncounterConnection[],
    "name": string
}