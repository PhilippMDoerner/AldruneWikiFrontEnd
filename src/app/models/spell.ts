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
    player_class_connections: SpellPlayerClassConnection[],
    pk?: number,
}

export interface SpellPlayerClassConnection{
    pk?: number,
    player_class: number,
    spell: number,
    player_class_details?: PlayerClass
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
    player_class_connections: SpellPlayerClassConnection[]
    name?: string;
    pk?: number;
    campaign_details?: {pk: number, name: string};
    campaign: number;

    constructor(object?: Spell){
        if (object) Object.assign(this, object)
    }

    getAbsoluteRouterUrl(): string{
        return `${Constants.wikiUrlFrontendPrefix}/spells/${this.campaign_details.name}/${this.name}`;
        // return this.routingService.getRoutePath("spell", {campaign: this.campaign_details.name, name: this.name});
    }
}