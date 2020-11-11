import { EncounterConnection } from "src/app/models/encounterconnection";
export interface Encounter{
    "pk"?: number,
    "creation_datetime"?: string,
    "update_datetime"?: string,
    "description": string,
    "session_number": number,
    "session_number_details"?: {"name": string, "pk": number, "name_full": string},
    "encounterConnections"?: EncounterConnection[],
    "name"?: string
    "location": number,
    "location_details"?: {"name": string, "pk": number, "name_full": string, "parent_location_name": string},
}

interface encounterLocation{
    "pk": number,
    "name": string,
    "name_full": string
}

interface encounterSession{
    "name": string,
    "pk": number
}

export class EmptyFormEncounter{
    "pk": number = null;
    "description": string = null;
    "session_number": number = null;
    "location": number = null;
}