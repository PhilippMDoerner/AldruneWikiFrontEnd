import { Session } from 'src/app/models/session';

export interface SessionAudio{
    "audio_file": string,
    "session": number,
    "session_details": Session,
    "pk": number,
    "sessionAudioNeighbours": {
        "nextSessionAudio": {"isMainSessionInt": number, "sessionNumber": number}, 
        "priorSessionAudio": {"isMainSessionInt": number, "sessionNumber": number}
    }
}