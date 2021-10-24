import { ArticleObject } from "src/app/models/base-models";
import { ActivatedRouteSnapshot, Params, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { GenericObjectService } from "src/app/services/generic-object.service";
import { first } from "rxjs/operators";
import { GenericService } from "src/app/services/generic.service";


export class BaseArticleResolver implements Resolve<ArticleObject> {
    constructor(
        public service: GenericObjectService | GenericService,
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<ArticleObject> | Promise<ArticleObject>{
        const params: Params = route.params;
        const campaignName: string = params.campaign;
        const queryParameters: any = this.getQueryParameter(params);

        return this.service.readByParam(campaignName, queryParameters).pipe(first());
    }

    getQueryParameter(params: Params){
        return {name: params.name};
    }
}

export class BaseArticleListResolver implements Resolve<ArticleObject[]> {
    constructor(
        public service: GenericObjectService | GenericService,
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<ArticleObject[]> | Promise<ArticleObject[]>{
        const params: Params = route.params;
        const campaignName: string = params.campaign;

        return this.service.campaignList(campaignName);
    }
}

export class BaseArticleDetailListResolver implements Resolve<ArticleObject[]> {
    constructor(
        public service: GenericObjectService | GenericService,
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<ArticleObject[]> | Promise<ArticleObject[]>{
        const params: Params = route.params;
        const campaignName: string = params.campaign;

        return this.service.campaignDetailList(campaignName);
    }
}