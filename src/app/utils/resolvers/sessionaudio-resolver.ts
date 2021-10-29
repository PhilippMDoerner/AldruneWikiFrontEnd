import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { SessionAudioObject } from "src/app/models/sessionaudio";
import { TimestampObject } from "src/app/models/timestamp";
import { GlobalUrlParamsService } from "src/app/services/global-url-params.service";
import { SessionAudioTimestampService } from "src/app/services/session-audio-timestamp.service";
import { SessionAudioService } from "src/app/services/session-audio.service";
import { BaseArticleListResolver, BaseArticleResolver, BaseArticleUpdateResolver } from "./base-resolvers";


@Injectable({ providedIn: 'root' })
export class SessionAudioResolver extends BaseArticleResolver {
    constructor( service: SessionAudioService ) { 
        super(service);
    }

    getQueryParameter(params: Params): any{
        const isMainSessionInt: number = params.isMainSession;
        const sessionNumber: number = params.sessionNumber;
        return {isMainSession: isMainSessionInt, sessionNumber};
    }
}

@Injectable({ providedIn: 'root' })
export class SessionAudioOverviewResolver extends BaseArticleListResolver {
    constructor( service: SessionAudioService ) { 
        super(service);
    }
}

@Injectable({ providedIn: 'root' })
export class TimestampResolver {
    constructor( private timestampService: SessionAudioTimestampService ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<TimestampObject[]> {
        const params: Params = route.params;

        const campaignName: string = params.campaign;
        const isMainSessionInt: number = params.isMainSession;
        const sessionNumber: number = params.sessionNumber;
    
        return this.timestampService.getTimestamps(campaignName, isMainSessionInt, sessionNumber)
    }
}

@Injectable({ providedIn: 'root' })
export class SessionAudioUpdateResolver extends BaseArticleUpdateResolver {
    dataModelClass = SessionAudioObject;

    constructor( 
        service: SessionAudioService,
        globalUrlParamsService: GlobalUrlParamsService,
    ) { 
        super(service, globalUrlParamsService);
    }

    getQueryParameters(params: Params): any{
        const isMainSessionInt: number = params.isMainSession;
        const sessionNumber: number = params.sessionNumber;
        return {isMainSession: isMainSessionInt, sessionNumber};
    }
}