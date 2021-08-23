import { Session } from "src/app/models/session";
import { Constants } from "../app.constants";
import { ArticleObject } from './base-models';

export interface Quest extends ArticleObject{
    status: string,
    taker: number,
    taker_details?: {name: string, name_full: string, pk: number}
    abstract: string,
    description: string,
    giver: number,
    giver_details?: {name: string, name_full: string, pk: number} ,
    start_session: number,
    start_session_details?: Session,    
    end_session: number,
    end_session_details?: Session,
}

export class QuestObject implements Quest{
    name?: string;
    status: string;
    abstract: string;
    taker: number;
    taker_details?: {name: string, name_full: string, pk: number}
    description: string;
    giver: number;
    giver_details?: {name: string, name_full: string, pk: number};
    start_session: number;
    start_session_details?: Session;    
    end_session: number;
    end_session_details?: Session;
    pk?: number;
    campaign_details?: {pk: number, name: string};
    campaign: number;

    constructor(object?: Quest){
        if (object) Object.assign(this, object)
    }

    getAbsoluteRouterUrl(): string{
        return `${Constants.wikiUrlFrontendPrefix}/quest/${this.campaign_details.name}/${this.name}`;

        // return this.routingService.getRoutePath("quest", {campaign: this.campaign_details.name, name: this.name});
    }
}