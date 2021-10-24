import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Params, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { OverviewItem } from "src/app/models/overviewItem";
import { RecentlyUpdatedService } from "src/app/services/recently-updated.service";

@Injectable({ providedIn: 'root' })
export class SearchResolver implements Resolve<{articles: OverviewItem[], emptyResponse: string}> {
    constructor(
        public articleService: RecentlyUpdatedService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<{articles: OverviewItem[], emptyResponse: string}> {
        const params: Params = route.params;
        const campaignName: string = params.campaign;
        const searchString: string = params.searchString;

        return this.articleService.getCampaignSearchArticle(campaignName, searchString)
    }
}



