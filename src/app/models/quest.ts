import { Session } from "src/app/models/session";
import { ArticleObject } from './base-models';

export interface Quest extends ArticleObject{
    status: string,
    taker: string,
    abstract: string,
    description: string,
    giver: number,
    giver_details?: {name: string, name_full: string, pk: number, image: string} ,
    start_session: number,
    start_session_details?: Session,    
    end_session: number,
    end_session_details?: Session,
}

export class EmptyFormQuest implements Quest{
    name: string;
    status: string;
    abstract: string;
    taker: string;
    description: string;
    giver: number;
    start_session: number;
    end_session: number;

    getAbsoluteRouterUrl(): string{
        return `/quest/${this.name}`;
    }
}