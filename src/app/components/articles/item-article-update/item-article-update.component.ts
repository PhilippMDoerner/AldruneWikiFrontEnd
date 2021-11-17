import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { first } from 'rxjs/operators';
import { OverviewType } from 'src/app/app.constants';
import { CharacterObject } from 'src/app/models/character';
import { Item, ItemObject } from 'src/app/models/item';
import { CampaignService } from 'src/app/services/campaign.service';
import { CharacterService } from 'src/app/services/character/character.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { ItemService } from 'src/app/services/item/item.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleFormMixin } from 'src/app/utils/functions/articleFormMixin';

@Component({
  selector: 'app-item-article-update',
  templateUrl: './item-article-update.component.html',
  styleUrls: ['./item-article-update.component.scss']
})
export class ItemArticleUpdateComponent extends ArticleFormMixin {  
  //Defining ArticleFormMixin Properties
  serverModel: Item;
  userModel: ItemObject;
  userModelClass = ItemObject;

  formlyFields: FormlyFieldConfig[] = [ //TODO: Get auto pre select to work when you create item for a character. You get the options correctly and the usermodel also has the value correctly, it's just not displayed in the dropdown
    this.formlyService.genericInput({key: "name", isNameInput: true}),
    this.formlyService.genericSelect({key: 'owner', overviewType: OverviewType.Character, campaign: this.campaign.name, required: false})
  ];

  //Custom Properties

  constructor(
    itemService: ItemService,
    private characterService: CharacterService,
    router: Router,
    route: ActivatedRoute,
    private formlyService: MyFormlyService,
    warnings: WarningsService,  
    routingService: RoutingService,
    public campaignService: CampaignService,
    globalUrlParams: GlobalUrlParamsService,
    tokenService: TokenService,
  ) { super(
    router, 
    routingService, 
    warnings, 
    itemService,
    campaignService,
    globalUrlParams,
    route,
    tokenService,
  ) }

  updateRouterLinks(campaignName: string, userModel: ItemObject, params: Params): void{
    this.updateCancelUrl = this.routingService.getRoutePath("item", {campaign: campaignName, name: params.name});
    this.creationCancelUrl = this.routingService.getRoutePath('item-overview', {campaign: campaignName});
  }


  /**
   * @description Executes when cancel button is clicked. Extends normal cancel logic for the extra step, that items may be
   * created from the context, that you're creating an item for a character. In such a case, cancel should route you back
   * to the character. This is the logic that happens here.
   */
  onCancel(){
    if (this.isForAssociatedObjectCreation()){
      const characterName: string = this.route.snapshot.params['character_name'];
      this.routingService.routeToPath('character', {name: characterName, campaign: this.campaign.name});

    } else { //Is "normal" article creation and thus "normal" cancel
      const executionContext = this;
      ArticleFormMixin.prototype.onCancel(executionContext);
    }
  }

  /**
   * @description Checks if the route through which the Component is visited is the "item-character-create" route, which means
   * the item is being created for a specific character, whose name is available as request parameter ":character_name"
   * @returns {boolean} True if this route is currently "item-character-create",false if it isn't
   */
  private isForAssociatedObjectCreation(): boolean{
    return this.routingService.routeNameMatches(this.route, "item-character-create");
  }
}
