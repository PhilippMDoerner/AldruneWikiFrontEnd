
export interface CharacterRelationship {
    relationship_map: number,
    character_1: number,
    character_2: number,
    pk?: number,
    character_1_name?: string,
    character_2_name?: string,
    header: string,
    description?: string,
    color?: string,
}



export class CharacterRelationshipObject implements CharacterRelationship{
    constructor(object?: CharacterRelationship){
        if (object) Object.assign(this, object);
    }

    relationship_map: number;
    character_1: number;
    character_2: number;
    pk?: number;
    character_1_name?: string;
    character_2_name?: string;
    header: string;
    description?: string;
    color?: string;
}