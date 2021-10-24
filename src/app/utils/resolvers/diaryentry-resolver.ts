import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { DiaryentryService } from "src/app/services/diaryentry/diaryentry.service";
import { BaseArticleResolver } from "./base-resolvers";


@Injectable({ providedIn: 'root' })
export class DiaryentryResolver extends BaseArticleResolver {
    constructor( service: DiaryentryService ) { 
        super(service);
    }

    getQueryParameter(params: Params): any{
        const isMainSession: number = parseInt(params.isMainSession);
        const sessionNumber: number = parseInt(params.sessionNumber);
        const authorName: string = params.authorName;
        return {isMainSession, sessionNumber, authorName};
    }
}