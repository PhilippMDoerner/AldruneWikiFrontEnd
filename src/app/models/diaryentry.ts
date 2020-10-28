import { Session } from "src/app/models/session";

export interface DiaryEntry{
    "creation_datetime"?: string,
    "update_datetime"?: string,
    "title": string,
    "entry": string,
    "author": number,
    "author_details"?: diaryEntryUser
    "session": number
    "session_details"?: Session,
    "pk": number,
}

interface diaryEntryUser{
    pk: number,
    name: string
}
export class EmptyFormDiaryEntry{
    "title" = null;
    "entry" = null;
    "author" = null;
    "session" = null;
    "pk" = null;
}