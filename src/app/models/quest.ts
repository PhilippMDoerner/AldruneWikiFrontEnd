import { Session } from "src/app/models/session";

export interface Quest{
    "pk"?: number,
    "creation_datetime"?: string,
    "update_datetime"?: string,
    "name": string,
    "status": string,
    "taker": string,
    "abstract": string,
    "description": string,
    "giver": number,
    "giver_details"?: {"name": string, "name_full": string, "pk": number, "image": string} ,
    "start_session": number,
    "start_session_details"?: Session,    
    "end_session": number,
    "end_session_details"?: Session,
}

export class EmptyFormQuest implements Quest{
    name: string = null;
    status: string = null;
    abstract: string = null;
    taker: string = null;
    description: string = null;
    giver: number = null;
    start_session: number = null;
    end_session: number = null;
}