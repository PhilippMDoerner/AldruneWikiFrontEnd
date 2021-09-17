import { Session } from 'src/app/models/session';
import { Constants } from '../app.constants';
import { ArticleObject } from './base-models';

export interface SessionAudio extends ArticleObject{
    audio_file: string,
    audio_url?: string,
    session: number,
    session_details?: Session,
    sessionAudioNeighbours?: {
        nextSessionAudio: {isMainSessionInt: number, sessionNumber: number}, 
        priorSessionAudio: {isMainSessionInt: number, sessionNumber: number}
    }
    has_recording?: boolean;
}

export class SessionAudioObject implements SessionAudio{
    pk?: number;
    audio_file: string;
    audio_url?: string;
    session: number;
    session_details?: Session;
    sessionAudioNeighbours?: {
        nextSessionAudio: {isMainSessionInt: number, sessionNumber: number}, 
        priorSessionAudio: {isMainSessionInt: number, sessionNumber: number}
    }
    has_recording?: boolean;
    name?: string;
    name_full?: string;
    update_datetime?: string;
    description?: string;
    campaign_details?: {pk: number, name: string};


    constructor(object?: SessionAudio){
        if (object) Object.assign(this, object)
    }

    getAbsoluteRouterUrl(): string{
        if (!this.session_details) throw "Can't generate URL for SessionAudio object without session_details";
        return `${Constants.wikiUrlFrontendPrefix}/sessionaudio/${this.campaign_details.name}/${this.session_details.is_main_session_int}/${this.session_details.session_number}`;
    }
}