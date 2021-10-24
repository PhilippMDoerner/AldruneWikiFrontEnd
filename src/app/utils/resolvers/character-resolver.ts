import { Injectable } from "@angular/core";
import { CharacterService } from "src/app/services/character/character.service";
import { BaseArticleResolver } from "./base-resolvers";


@Injectable({ providedIn: 'root' })
export class CharacterResolver extends BaseArticleResolver {
    constructor( service: CharacterService ) { 
        super(service);
    }
}