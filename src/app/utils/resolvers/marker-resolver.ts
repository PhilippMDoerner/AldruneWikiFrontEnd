import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Params, Resolve, RouterStateSnapshot } from "@angular/router";
import { first } from "rxjs/operators";
import { CampaignOverview } from "src/app/models/campaign";
import { MapObject } from "src/app/models/map";
import { MapMarkerObject } from "src/app/models/mapmarker";
import { GlobalUrlParamsService } from "src/app/services/global-url-params.service";
import { MapService } from "src/app/services/map.service";
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

@Injectable({providedIn: "root" })
export class MarkerMapCreateResolver implements Resolve<MapMarkerObject> {
    constructor(
        private mapService: MapService,
        private globalUrlParamsService: GlobalUrlParamsService,
    ){}

    async resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<MapMarkerObject>{
        const routeParams: Params = route.params;
        const currentCampaignName: string = routeParams.campaign;
        const mapName: string = routeParams.map_name;
        const map: MapObject = await this.mapService.readByParam(currentCampaignName, {name: mapName}).pipe(first()).toPromise();

        const dataModel: MapMarkerObject = new MapMarkerObject();
        dataModel.latitude = parseInt(routeParams.latitude);
        dataModel.longitude = parseInt(routeParams.longitude);
        dataModel.map = map.pk;

        return dataModel
    }
}