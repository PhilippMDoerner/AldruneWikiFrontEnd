import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { OverviewType } from 'src/app/app.constants';
import { CharacterObject } from 'src/app/models/character';
import { Item, ItemObject } from 'src/app/models/item';
import { CampaignService } from 'src/app/services/campaign.service';
import { CharacterService } from 'src/app/services/character/character.service';
import { ItemService } from 'src/app/services/item/item.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
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

  updateCancelRoute = {routeName: "item", params: {name: null, campaign: this.campaign }};
  creationCancelRoute = {routeName: "item-overview", params: {campaign: this.campaign}};//Only used when creating normally, not when creating item for a specific character
  
  formlyFields: FormlyFieldConfig[] = [ //TODO: Get auto pre select to work when you create item for a character. You get the options correctly and the usermodel also has the value correctly, it's just not displayed in the dropdown
    this.formlyService.genericInput({key: "name", isNameInput: true}),
    this.formlyService.genericSelect({key: 'owner', overviewType: OverviewType.Character, campaign: this.campaign, required: false})
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
    public campaignService: CampaignService
  ) { super(
    router, 
    routingService, 
    warnings, 
    itemService,
    route,
    campaignService
  ) }

  createUserModel(queryParameters): void{
    this.userModel = new this.userModelClass();

    this.campaignService.readByParam(this.campaign).pipe(first()).subscribe(
      (campaignData: {name: String, pk: number}) => {
          this.userModel.campaign = campaignData.pk;
      },
      error => this.warnings.showWarning(error)
    );

    console.log("Associated: " + this.isForAssociatedObjectCreation());
    if(this.isForAssociatedObjectCreation()){
      const itemOwnerName: string = this.route.snapshot.params.character_name;
    
      this.characterService.readByParam(this.campaign, itemOwnerName).pipe(first()).subscribe(
        (itemOwner: CharacterObject) => {this.userModel.owner = itemOwner.pk; console.log(this.userModel)},
        error => this.routingService.routeToErrorPage(error)
      );
    }

    console.log(this.formlyFields);
    console.log(this);
  }

  /**
   * @description Executes when cancel button is clicked. Extends normal cancel logic for the extra step, that items may be
   * created from the context, that you're creating an item for a character. In such a case, cancel should route you back
   * to the character. This is the logic that happens here.
   */
  onCancel(){
    if (this.isForAssociatedObjectCreation()){
      const characterName: string = this.route.snapshot.params['character_name'];
      this.routingService.routeToPath('character', {name: characterName, campaign: this.campaign});

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
