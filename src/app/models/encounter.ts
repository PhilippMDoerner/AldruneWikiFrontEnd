import { EncounterConnection } from "src/app/models/encounterconnection";
export interface Encounter{
    "pk": number,
    "creation_datetime": string,
    "update_datetime": string,
    "description": string,
    "session": encounterSession,
    "encounterConnections": EncounterConnection[],
    "name": string
    "location": encounterLocation
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

export interface SimpleEncounter{
    "pk": number,
    "description": string,
    "session_number": number,
    "location": number
}