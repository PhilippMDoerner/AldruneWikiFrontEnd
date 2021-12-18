import { Injectable } from "@angular/core";
import { RelationshipMapService } from "src/app/relationship-map.service";
import { BaseArticleResolver } from "./base-resolvers";

@Injectable({ providedIn: 'root' })
export class RelationshipMapResolver extends BaseArticleResolver {
    constructor( service: RelationshipMapService ) { 
        super(service);
    }
}