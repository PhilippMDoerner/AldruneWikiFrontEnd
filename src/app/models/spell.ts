import { Constants } from '../app.constants';
import { ArticleObject } from './base-models';

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
    classes: string[]
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
    classes: string[]
    name: string;
    pk?: number;

    constructor(object?: Spell){
        if (object) Object.assign(this, object)
    }

    getAbsoluteRouterUrl(): string{
        return `${Constants.wikiUrlFrontendPrefix}/spell/${this.name}`;
    }
}