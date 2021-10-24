import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { MarkerService } from "src/app/services/marker.service";
import { BaseArticleResolver } from "./base-resolvers";


@Injectable({ providedIn: 'root' })
export class MarkerResolver extends BaseArticleResolver {
    constructor( service: MarkerService ) { 
        super(service);
    }

    getQueryParameter(params: Params): any{
        const parentLocationName: string = params['parent_location_name'];
        const locationName: string = params['location_name'];
        const mapName: string = params['map_name'];
    
        return {parentLocationName, locationName, mapName};
    }
}