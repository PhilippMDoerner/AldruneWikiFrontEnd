import { Injectable } from "@angular/core";
import { BaseArticleDetailListResolver } from "./base-resolvers";
import { RuleService } from "src/app/services/rule.service";


@Injectable({ providedIn: 'root' })
export class RuleResolver extends BaseArticleDetailListResolver {
    constructor( service: RuleService ) { 
        super(service);
    }
}