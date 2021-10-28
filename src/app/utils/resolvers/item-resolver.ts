import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { first } from "rxjs/operators";
import { CampaignOverviewComponent } from "src/app/components/articles/campaign-overview/campaign-overview.component";
import { CampaignOverview } from "src/app/models/campaign";
import { CharacterObject } from "src/app/models/character";
import { ItemObject } from "src/app/models/item";
import { CharacterService } from "src/app/services/character/character.service";
import { GlobalUrlParamsService } from "src/app/services/global-url-params.service";
import { ItemService } from "src/app/services/item/item.service";
import { BaseArticleResolver, BaseArticleUpdateResolver } from "./base-resolvers";


@Injectable({ providedIn: 'root' })
export class ItemResolver extends BaseArticleResolver {
    constructor( service: ItemService ) { 
        super(service);
    }
}

@Injectable({ providedIn: 'root' })
export class ItemUpdateResolver extends BaseArticleUpdateResolver {
    dataModelClass = ItemObject;

    constructor( 
        service: ItemService,
        globalUrlParamsService: GlobalUrlParamsService 
    ) { 
        super(service, globalUrlParamsService);
    }
}


@Injectable({ providedIn: 'root' })
export class ItemCharacterCreationResolver implements Resolve<ItemObject> {
    constructor(
        private characterService: CharacterService,
        private globalUrlParamsService: GlobalUrlParamsService,
    ) { }


    async resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<ItemObject>{
        const currentCampaign: CampaignOverview = await this.globalUrlParamsService.getCurrentCampaign();
        const ownerName: string = route.params.character_name;
        const itemOwnerCharacter: CharacterObject = await this.characterService.readByParam(currentCampaign.name, {name: ownerName}).pipe(first()).toPromise();

        const modelData: ItemObject = new ItemObject();
        modelData.campaign = currentCampaign.pk;
        modelData.owner = itemOwnerCharacter.pk;

        return modelData;
    }
}