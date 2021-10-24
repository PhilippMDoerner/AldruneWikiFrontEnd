import { Injectable } from "@angular/core";
import { QuestService } from "src/app/services/quest.service";
import { BaseArticleListResolver, BaseArticleResolver } from "./base-resolvers";


@Injectable({ providedIn: 'root' })
export class QuestResolver extends BaseArticleResolver {
    constructor( service: QuestService ) { 
        super(service);
    }
}

@Injectable({ providedIn: 'root' })
export class QuestOverviewResolver extends BaseArticleListResolver {
    constructor( service: QuestService ) { 
        super(service);
    }
}