import { Injectable } from "@angular/core";
import { BaseArticleDetailListResolver } from "./base-resolvers";
import { SessionService } from "src/app/services/session.service";
import { RoutingService } from "src/app/services/routing.service";


@Injectable({ providedIn: 'root' })
export class SessionResolver extends BaseArticleDetailListResolver {
    constructor( service: SessionService, routing: RoutingService ) { 
        super(service, routing);
    }
}