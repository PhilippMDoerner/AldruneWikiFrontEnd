import { Session } from "src/app/models/session";
import { Constants } from '../app.constants';
import { ApiObject } from './base-models';
import { DiaryEntryEncounterConnectionObject } from "./diaryencounterconnection";
import { Encounter } from "./encounter";

export interface DiaryEntry extends ApiObject{
    title: string,
    author: number,
    author_details?: diaryEntryUser
    session: number
    session_details?: Session,
    encounters: diaryEntryEncounter[]
}

interface diaryEntryUser{
    pk: number,
    name: string
}

export interface diaryEntryEncounter extends Encounter{
    connection: DiaryEntryEncounterConnectionObject
}

export class DiaryEntryObject implements DiaryEntry{
    title: string;
    session: number;
    pk?: number;
    session_details?: Session;
    author: number;
    author_details?: diaryEntryUser;
    encounters: diaryEntryEncounter[]

    constructor(object?: DiaryEntry){
        if(object) Object.assign(this, object);
    }

    getAbsoluteRouterUrl(): string{
        if (!this.session_details) throw "Can't generate URL for diaryEntry object without Session Details";
        if (!this.session_details) throw "Can't generate URL for diaryEntry object without author_Details";
        return `${Constants.wikiUrlFrontendPrefix}/diaryentry/${this.session_details.session_number}/${this.session_details.is_main_session_int}/${this.author_details.name}`;
    }
}