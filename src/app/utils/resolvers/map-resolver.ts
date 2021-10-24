import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Params, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { filter, first, map } from "rxjs/operators";
import { CampaignOverview } from "src/app/models/campaign";
import { MapObject } from "src/app/models/map";
import { OverviewItemObject } from "src/app/models/overviewItem";
import { GlobalUrlParamsService } from "src/app/services/global-url-params.service";
import { MapService } from "src/app/services/map.service";


@Injectable({ providedIn: 'root' })
export class MapResolver implements Resolve<{mapData: MapObject, maps: OverviewItemObject[]}> {
    constructor( 
        private service: MapService,
        private globalUrlParams: GlobalUrlParamsService,
    ) { }

    async resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<{mapData: MapObject, maps: OverviewItemObject[]}> {
        const params: Params = route.params;
        const campaign: CampaignOverview = await this.getCurrentCampaign();
        const maps: OverviewItemObject[] = await this.service.campaignList(campaign.name).pipe(first()).toPromise();
        
        const queryParameters: any = this.getQueryParameter(params, campaign, maps);

        return this.service.readByParam(campaign.name, queryParameters)
            .pipe(
                first(),
                map(mapData => {return {mapData, maps}})
            )
            .toPromise();
    }

    /** 
     * Fetches the map name from the url. If there is no map name parameter, it tries to give back the default map configured
     * for this campaign. If there is no default map, it tries to load the first map in the list of maps. If there are no maps,
     * it returns null
     */
    getQueryParameter(params: Params, campaign: CampaignOverview, maps: OverviewItemObject[]): any {
        if(maps.length === 0) return null;

        const hasMapParameter: boolean = params.name != null;
        const mapName: string = hasMapParameter ? params.name : this.getSecondaryMapChoice(campaign, maps);

        return {name: mapName};
    }


    getSecondaryMapChoice(campaign: CampaignOverview, maps: OverviewItemObject[]): string{
        if (maps.length === 0) return;

        const campaignDefaultMapName: string = campaign.default_map_details?.name;
        if(campaignDefaultMapName != null) return campaignDefaultMapName

        const firstMapName: string = maps[0].name;
        return firstMapName;
    }


    async getCurrentCampaign(): Promise<CampaignOverview>{
        await this.waitForAllCampaignDataToLoad();
        return this.globalUrlParams.getCurrentCampaign().value;
    }

    /**
     * @description Waits for the list of total campaigns available to the user to finish loading. This is necessary to 
     * ensure there is a campaign that that can be retrieved via "getCurrentCampaign". Particularly relevant in scenarios
     * where there is an initial page load on a url there
     */
    async waitForAllCampaignDataToLoad(){
        await this.globalUrlParams.getCampaigns()
            .pipe(
                filter((campaigns: CampaignOverview[]) => campaigns != null),
                first()
            )
            .toPromise();
        
        await this.globalUrlParams.getCurrentCampaign()
            .pipe(
                filter((campaign: CampaignOverview) => campaign != null),
                first()
            )
            .toPromise();
    }
}


@Injectable({ providedIn: 'root' })
export class MapOverviewResolver implements Resolve<OverviewItemObject[]> {
    constructor( 
        private service: MapService,
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<OverviewItemObject[]> {
        const params: Params = route.params;
        const campaignName: string = params.campaign;
        
        return this.service.campaignList(campaignName);
    }
}