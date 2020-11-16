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

export class EmptyFormSpell implements Spell{
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

    getAbsoluteRouterUrl(): string{
        return `/spell/${this.name}`;
    }
}