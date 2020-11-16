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

export class EmptyFormSessionAudio implements SessionAudio{
    audio_file: string = null;
    session: number = null;
    session_details?: Session;

    getAbsoluteRouterUrl(): string{
        if (!this.session_details) throw "Can't generate URL for SessionAudio object without session_details";
        return `/sessionaudio/${this.session_details.session_number}/${this.session_details.session_number}`;
    }
}