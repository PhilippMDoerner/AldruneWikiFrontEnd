import { Session } from 'src/app/models/session';
import { ApiObject } from './base-models';

export interface SessionAudio extends ApiObject{
    audio_file: string,
    session: number,
    session_details?: Session,
    sessionAudioNeighbours?: {
        nextSessionAudio: {isMainSessionInt: number, sessionNumber: number}, 
        priorSessionAudio: {isMainSessionInt: number, sessionNumber: number}
    }
}

export class SessionAudioObject implements SessionAudio{
    pk?: number;
    audio_file: string;
    session: number;
    session_details?: Session;
    sessionAudioNeighbours?: {
        nextSessionAudio: {isMainSessionInt: number, sessionNumber: number}, 
        priorSessionAudio: {isMainSessionInt: number, sessionNumber: number}
    }

    constructor(object?: SessionAudio){
        if (object) Object.assign(this, object)
    }

    getAbsoluteRouterUrl(): string{
        if (!this.session_details) throw "Can't generate URL for SessionAudio object without session_details";
        return `/sessionaudio/${this.session_details.session_number}/${this.session_details.session_number}`;
    }
}