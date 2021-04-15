export interface PlayerClass{
    pk?: number,
    name: String,
}

export class PlayerClassObject implements PlayerClass{
    name: string;
    pk?: number;

    constructor(object?: PlayerClass){
        if (object) Object.assign(this, object)
    }
}

export interface CharacterPlayerClassConnection{
    pk?: number,
    player_class: number,
    character: number
}

export interface SpellClassConnection{
    pk?: number,
    player_class: number,
    spell: number
}
