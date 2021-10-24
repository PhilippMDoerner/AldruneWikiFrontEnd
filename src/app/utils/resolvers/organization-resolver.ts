import { Injectable } from "@angular/core";
import { OrganizationService } from "src/app/services/organization/organization.service";
import { BaseArticleResolver } from "./base-resolvers";


@Injectable({ providedIn: 'root' })
export class OrganizationResolver extends BaseArticleResolver {
    constructor( service: OrganizationService ) { 
        super(service);
    }
}