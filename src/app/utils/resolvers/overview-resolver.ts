import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Params, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { OverviewType } from "src/app/app.constants";
import { OverviewItemObject } from "src/app/models/overviewItem";
import { OverviewService } from "src/app/services/overview.service";


@Injectable({ providedIn: 'root' })
export class OverviewResolver implements Resolve<OverviewItemObject[]> {
    constructor(
        private overviewService: OverviewService,
        private router: Router,
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<OverviewItemObject[]>{
        const params: Params = route.params;
        const campaignName: string = params.campaign;
        const overviewType = this.getOverviewType(state.url);

        return this.overviewService.getCampaignOverviewItems(campaignName, overviewType);
    }

    getOverviewType(overviewUrl: string): OverviewType{
        const urlSplit: string[] = overviewUrl.split('/');
        const overviewTypeString: string = urlSplit[urlSplit.length - 2];
        const capitalizedOverviewTypeString: string = this.capitalize(overviewTypeString);
        console.log(capitalizedOverviewTypeString);
        console.log(OverviewType);
        return OverviewType[capitalizedOverviewTypeString];
    }

    capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
