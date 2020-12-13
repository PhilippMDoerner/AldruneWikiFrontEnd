import { Session } from 'src/app/models/session';
import { CharacterObject } from './character';
import { CreatureObject } from './creature';
import { DiaryEntryObject } from './diaryentry';
import { EncounterObject } from './encounter';
import { ItemObject } from './item';
import { LocationObject } from './location';
import { OrganizationObject } from './organization';
import { QuestObject } from './quest';
import { SessionAudioObject } from './sessionaudio';
import { SessionObject } from './session';
import { MapObject } from './map';
import { TimestampObject } from './timestamp';
import { MapMarkerObject } from './mapmarker';

export interface OverviewItem{
    article_type: string,
    name: string,
    pk: number,
    name_full: string,
    description?: string,
    update_date?: string,

    //For Character-Type OverviewItems
    player_character?: boolean,

    //For Location-Type OverviewItems
    parent_location_details?: {name: string, pk: number},

    //For Diaryentry-Type OverviewItems
    session_details?: Session,
    author_details?: {pk: number, name: string}
}

export class OverviewItemObject implements OverviewItem{
    constructor(object?: OverviewItem){
        if (object) Object.assign(this, object);
    }

    article_type: string;
    name: string;
    pk: number;
    name_full: string;
    description: string;
    update_date?: string;

    //For Character-Type OverviewItems
    player_character?: boolean;

    //For Location-Type OverviewItems
    parent_location_details?: {name: string, pk: number};

    //For Diaryentry-Type OverviewItems
    session_details?: Session;
    author_details?: {pk: number, name: string};

    getAbsoluteRouterUrl(): string{
        if (!this.article_type) throw "Can not generate URL for undefined article_type";
        const ArticleClass = ArticleTypeToObjectClassMapping[this.article_type]
        const articleObject = new ArticleClass(this);
        return articleObject.getAbsoluteRouterUrl();
    }
}

export const ArticleTypeToObjectClassMapping = {
    character: CharacterObject,
    creature: CreatureObject,
    diaryentry: DiaryEntryObject,
    encounter: EncounterObject,
    item: ItemObject,
    location: LocationObject,
    organization: OrganizationObject,
    quest: QuestObject,
    sessionaudio: SessionAudioObject,
    session: SessionObject,
    map: MapObject,
    timestamp: TimestampObject,
    mapmarker: MapMarkerObject,
    
}