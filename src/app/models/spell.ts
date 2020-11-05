export interface Spell{
    "url": string,
    "name": string,
    "creation_datetime": string,
    "update_datetime": string,
    "spell_level": number,
    "casting_time": string,
    "range": string,
    "components": string,
    "duration": string,
    "concentration": boolean,
    "ritual": boolean,
    "school": string,
    "saving_throw": string,
    "damage": string,
    "description": string,
    "classes": string[]
}