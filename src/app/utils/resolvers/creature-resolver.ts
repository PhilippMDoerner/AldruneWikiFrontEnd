import { Injectable } from "@angular/core";
import { CreatureService } from "src/app/services/creature/creature.service";
import { BaseArticleResolver } from "./base-resolvers";


@Injectable({ providedIn: 'root' })
export class CreatureResolver extends BaseArticleResolver {
    constructor( service: CreatureService ) { 
        super(service);
    }
}