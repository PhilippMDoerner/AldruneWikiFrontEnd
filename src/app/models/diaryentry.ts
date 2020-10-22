export interface DiaryEntry{
    "creation_datetime": string,
    "update_datetime": string,
    "title": string,
    "entry": string,
    "author": diaryEntryUser,
    "session": diaryEntrySession,
}

interface diaryEntrySession{
    pk: number,
    session: string
}

interface diaryEntryUser{
    pk: number,
    name: string
}
export interface SimpleDiaryEntry{
    "title": string,
    "entry": string,
    "author": number,
    "session": number,
}