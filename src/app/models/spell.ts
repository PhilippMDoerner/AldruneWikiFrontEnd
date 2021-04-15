import { Constants } from '../app.constants';
import { ArticleObject } from './base-models';
import { PlayerClass } from './playerclass';

export interface Spell extends ArticleObject{
    spell_level: number,
    casting_time: string,
    range: string,
    components: string,
    duration: string,
    concentration: boolean,
    ritual: boolean,
    school: string,
    saving_throw: string,
    damage: string,
    description: string,
    classes: PlayerClass[],
    id?: number,
}

export class SpellObject implements Spell{
    spell_level: number;
    casting_time: string;
    range: string;
    components: string;
    duration: string;
    concentration: boolean;
    ritual: boolean;
    school: string;
    saving_throw: string;
    damage: string;
    description: string;
    classes: PlayerClass[]
    name?: string;
    id?: number;

    constructor(object?: Spell){
        if (object) Object.assign(this, object)
    }

    getAbsoluteRouterUrl(): string{
        return `${Constants.wikiUrlFrontendPrefix}/spell/${this.name}`;
    }
}