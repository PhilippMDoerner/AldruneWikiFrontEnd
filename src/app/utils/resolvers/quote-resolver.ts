import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Quote } from "src/app/models/quote";
import { QuoteService } from "src/app/services/quote.service";


@Injectable({ providedIn: 'root' })
export class QuoteResolver {
    constructor( 
        private quoteService: QuoteService,
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Quote[]> {
        const params: Params = route.params;
        const campaignName: string = params.campaign;
        const characterName: string = params.name;

        return this.quoteService.getAllCharacterQuotes(campaignName, characterName)
    }
}