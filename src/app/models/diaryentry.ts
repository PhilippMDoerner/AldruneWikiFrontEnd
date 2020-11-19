import { Session } from "src/app/models/session";
import { Constants } from '../app.constants';
import { ApiObject, ArticleObject } from './base-models';

export interface DiaryEntry extends ApiObject{
    title: string,
    entry: string,
    author: number,
    author_details?: diaryEntryUser
    session: number
    session_details?: Session,
}

interface diaryEntryUser{
    pk: number,
    name: string
}
export class DiaryEntryObject implements DiaryEntry{
    title: string;
    entry: string;
    session: number;
    pk?: number;
    session_details?: Session;
    author: number;
    author_details?: diaryEntryUser;

    constructor(object?: DiaryEntry){
        if(object) Object.assign(this, object);
    }

    getAbsoluteRouterUrl(): string{
        if (!this.session_details) throw "Can't generate URL for diaryEntry object without Session Details";
        if (!this.session_details) throw "Can't generate URL for diaryEntry object without author_Details";
        return `${Constants.wikiUrlFrontendPrefix}/diaryentry/${this.session_details.session_number}/${this.session_details.is_main_session_int}/${this.author_details.name}`;
    }
}