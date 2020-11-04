import { Session } from 'protractor';

export interface Quest{
    "pk": number,
    "creation_datetime"?: string,
    "update_datetime"?: string,
    "name": string,
    "status": string,
    "taker": string,
    "abstract": string,
    "description": string,
    "is_secret": boolean,
    "giver": number,
    "giver_details"?: {"name": string, "name_full": string, "pk": number} ,
    "start_session": string,
    "start_session_details"?: Session,    
    "end_session": string,
    "end_session_details"?: Session,
}