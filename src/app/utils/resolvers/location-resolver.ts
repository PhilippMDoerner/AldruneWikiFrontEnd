import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { LocationService } from "src/app/services/location/location.service";
import { BaseArticleResolver } from "./base-resolvers";


@Injectable({ providedIn: 'root' })
export class LocationResolver extends BaseArticleResolver {
    constructor( service: LocationService ) { 
        super(service);
    }

    getQueryParameter(params: Params): any{
        const locationName: string = params['name'];
        const parentLocationName: string = params['parent_name'] ? params['parent_name'] : "None";
        return {locationName, parentLocationName};
    }    
}