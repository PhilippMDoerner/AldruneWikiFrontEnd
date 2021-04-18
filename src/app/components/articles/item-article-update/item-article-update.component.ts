import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { CharacterObject } from 'src/app/models/character';
import { Item, ItemObject } from 'src/app/models/item';
import { CharacterService } from 'src/app/services/character/character.service';
import { ItemService } from 'src/app/services/item/item.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-item-article-update',
  templateUrl: './item-article-update.component.html',
  styleUrls: ['./item-article-update.component.scss']
})
export class ItemArticleUpdateComponent implements OnInit {
  constants: any = Constants;


  private parameter_subscription: Subscription;

  isForAssociatedObjectCreation: boolean;
  formState: string;

  model: ItemObject;
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", isNameInput: true}),
    this.formlyService.genericSelect({key: 'owner', optionsType: 'character', required: false})
  ];

  constructor(
    private itemService: ItemService,
    private characterService: CharacterService,
    private router: Router,
    private route: ActivatedRoute,
    private formlyService: MyFormlyService,
    private warnings: WarningsService,  
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? Constants.updateState : Constants.createState;

    this.parameter_subscription = this.route.params.subscribe(params => {
      const itemName: string = params.name;
      const itemOwnerName: string = params.character_name;
      this.isForAssociatedObjectCreation = itemOwnerName && this.formState === Constants.createState;

      if (this.formState === Constants.updateState){
        this.itemService.getItem(itemName).pipe(first()).subscribe(
          (item: ItemObject) =>  this.model = item,
          error => this.routingService.routeToErrorPage(error)
        );
      } else if (this.isForAssociatedObjectCreation){
        this.characterService.readByParam(itemOwnerName).pipe(first()).subscribe(
          (itemOwner: CharacterObject) => {
            this.model = new ItemObject();
            this.model.owner = itemOwner.pk;
          },
          error => this.routingService.routeToErrorPage(error)
        );
      } else if (this.formState === Constants.createState) {
        this.model = new ItemObject();
      } 
    })
  }

  onSubmit(){
    const isFormInUpdateState: boolean = (this.formState === Constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.itemService.updateItem(this.model) : this.itemService.createItem(this.model);

    responseObservable.pipe(first()).subscribe(
      (item: ItemObject) => this.routingService.routeToApiObject(item),
      error => this.warnings.showWarning(error)
    );
  }

  onCancel(){
    const isFormInUpdateState: boolean = (this.formState === Constants.updateState);
    const isItemCharacterCreateUrl: boolean = this.routingService.routeNameMatches(this.route, "item-character-create");

    if (isItemCharacterCreateUrl){
      const characterName: string = this.route.snapshot.params['character_name'];
      this.routingService.routeToPath('character', {name: characterName});
    } else if (isFormInUpdateState){
      const itemName: string = this.route.snapshot.params.name;
      this.routingService.routeToPath('item', {name: itemName});
    } else {
      this.routingService.routeToPath('item-overview');
    }
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
