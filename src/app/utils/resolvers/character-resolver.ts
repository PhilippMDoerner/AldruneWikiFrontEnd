import { Injectable } from "@angular/core";
import { CharacterObject } from "src/app/models/character";
import { CharacterService } from "src/app/services/character/character.service";
import { GlobalUrlParamsService } from "src/app/services/global-url-params.service";
import { BaseArticleResolver, BaseArticleUpdateResolver } from "./base-resolvers";


@Injectable({ providedIn: 'root' })
export class CharacterResolver extends BaseArticleResolver {
    constructor( service: CharacterService ) { 
        super(service);
    }
}

@Injectable({ providedIn: 'root' })
export class CharacterUpdateResolver extends BaseArticleUpdateResolver {
    dataModelClass = CharacterObject;

    constructor( 
        service: CharacterService,
        globalUrlParamsService: GlobalUrlParamsService,
    ) { 
        super(service, globalUrlParamsService);
    }
}