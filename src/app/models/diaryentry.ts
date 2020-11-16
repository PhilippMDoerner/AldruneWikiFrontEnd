import { Session } from "src/app/models/session";
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
export class EmptyFormDiaryEntry implements DiaryEntry{
    title: string = null;
    entry: string = null;
    session: number = null;
    pk: number = null;
    session_details?: Session = null;
    author: number = null;
    author_details: diaryEntryUser = null;

    getAbsoluteRouterUrl(): string{
        if (!this.session_details) throw "Can't generate URL for diaryEntry object without Session Details";
        return `/diaryentry/${this.session_details.session_number}/${this.session_details.is_main_session_int}/${this.author_details.name}`;
    }
}