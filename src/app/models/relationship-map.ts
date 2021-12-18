import { CharacterRelationship } from "./character-relationship";

export interface RelationshipMap {
    "name": string,
    "creation_datetime": string,
    "update_datetime": string,
    "campaign": number,
    "relationships": CharacterRelationship[]
}

export class RelationshipMapObject implements RelationshipMap{
    constructor(object?: RelationshipMap){
        if (object) Object.assign(this, object);
    }

    name: string;
    creation_datetime: string;
    update_datetime: string;
    campaign: number;
    relationships: CharacterRelationship[];
}