import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { CharacterObject } from 'src/app/models/character';
import { Item, ItemObject } from 'src/app/models/item';
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
export class ItemArticleUpdateComponent extends ArticleFormMixin implements OnInit {

  //Defining ArticleFormMixin Properties
  serverModel: Item;
  userModel: ItemObject;
  updateCancelRoute = {routeName: "item", params: {name: null }};
  creationCancelRoute = {routeName: "item-overview", params: {}};//Only used when creating normally, not when creating item for a specific character
  
  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", isNameInput: true}),
    this.formlyService.genericSelect({key: 'owner', optionsType: 'character', required: false})
  ];

  //Custom Properties
  private parameter_subscription: Subscription;

  constructor(
    itemService: ItemService,
    private characterService: CharacterService,
    router: Router,
    private route: ActivatedRoute,
    private formlyService: MyFormlyService,
    warnings: WarningsService,  
    routingService: RoutingService,
  ) { super(
    router, 
    routingService, 
    warnings, 
    itemService
  ) }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const itemName: string = params.name;
      this.campaign = params.campaign;
      
      //Update Cancel Route Params
      this.updateCancelRoute.params.name = itemName;

      //Get Item
      if (this.isInUpdateState()){
        this.articleService.readByParam(this.campaign, itemName).pipe(first()).subscribe(
          (item: ItemObject) =>  this.userModel = item,
          error => this.routingService.routeToErrorPage(error)
        );

      } else if (this.isInCreateState()) {
        this.userModel = new ItemObject();

        if(this.isForAssociatedObjectCreation()){
          const itemOwnerName: string = params.character_name;

          this.characterService.readByParam(this.campaign, itemOwnerName).pipe(first()).subscribe(
            (itemOwner: CharacterObject) => this.userModel.owner = itemOwner.pk,
            error => this.routingService.routeToErrorPage(error)
          );
        }
      } 
    })
  }

  /**
   * @description Executes when cancel button is clicked. Extends normal cancel logic for the extra step, that items may be
   * created from the context, that you're creating an item for a character. In such a case, cancel should route you back
   * to the character. This is the logic that happens here.
   */
  onCancel(){
    if (this.isForAssociatedObjectCreation()){
      const characterName: string = this.route.snapshot.params['character_name'];
      this.routingService.routeToPath('character', {name: characterName});

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

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
