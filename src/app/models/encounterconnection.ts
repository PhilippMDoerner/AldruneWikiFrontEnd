export interface EncounterConnection{
    "pk"?: number,
    "encounter": number,
    "encounter_details"?: {'name': string, "name_full": string, "pk": number},
    "character": number,
    "character_details"?: {'name': string, "name_full": string, "pk": number},
}