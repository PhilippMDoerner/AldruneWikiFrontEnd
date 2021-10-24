import { Injectable } from "@angular/core";
import { BaseArticleDetailListResolver } from "./base-resolvers";
import { SpellService } from "src/app/services/spell.service";


@Injectable({ providedIn: 'root' })
export class SpellResolver extends BaseArticleDetailListResolver {
    constructor( service: SpellService ) { 
        super(service);
    }
}