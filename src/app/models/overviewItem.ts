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
    name: string,
    article_type: string,
    pk: number,
    name_full: string,
    player_character?: boolean,
    author?: string,
    parent_location_name?: string,
    session_details?: Session,
    download_url?: string,
}

export class OverviewItemObject implements OverviewItem{
    constructor(object?: OverviewItem){
        if (object) Object.assign(this, object);
    }

    name: string;
    article_type: string;
    pk: number;
    name_full: string;

    getAbsoluteRouterUrl(): string{
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