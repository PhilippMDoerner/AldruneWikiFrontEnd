import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Item, ItemObject } from 'src/app/models/item';
import { CharacterService } from 'src/app/services/character/character.service';
import { ItemService } from 'src/app/services/item/item.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { routeNameMatches } from 'src/app/utils/functions/routeFilter';

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
    this.formlyService.genericInput({key: 'name'}),
    this.formlyService.genericSelect({key: 'owner', optionsType: 'character'})
  ];

  constructor(
    private itemService: ItemService,
    private characterService: CharacterService,
    private router: Router,
    private route: ActivatedRoute,
    private formlyService: MyFormlyService,
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? Constants.updateState : Constants.createState;

    this.parameter_subscription = this.route.params.subscribe(params => {
      const itemName: string = params.name;
      const itemOwnerName: string = params.character_name;
      this.isForAssociatedObjectCreation = itemOwnerName && this.formState === Constants.createState;

      if (this.formState === Constants.updateState){
        this.itemService.getItem(itemName).pipe(first()).subscribe(
          (item: ItemObject) =>  this.model = item
        );
      } else if (this.isForAssociatedObjectCreation){
        this.characterService.getCharacter(itemOwnerName).pipe(first()).subscribe(itemOwner => {
          this.model = new ItemObject();
          this.model.owner = itemOwner.pk;
        });
      } else if (this.formState === Constants.createState) {
        this.model = new ItemObject();
      } 
    })
  }

  onSubmit(){
    const isFormInUpdateState: boolean = (this.formState === Constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.itemService.updateItem(this.model) : this.itemService.createItem(this.model);

    responseObservable.pipe(first()).subscribe(
      (item: ItemObject) => Constants.routeToApiObject(this.router, item),
      error => console.log(error)
    );
  }

  onCancel(){
    const isFormInUpdateState: boolean = (this.formState === Constants.updateState);
    const isItemCharacterCreateUrl: boolean = routeNameMatches(this.route, "item-character-create");

    if (isItemCharacterCreateUrl){
      const characterName: string = this.route.snapshot.params['character_name'];
      Constants.routeToPath(this.router, 'character', {name: characterName});
    } else if (isFormInUpdateState){
      const itemName: string = this.route.snapshot.params.name;
      Constants.routeToPath(this.router, 'item', {name: itemName});
    } else {
      Constants.routeToPath(this.router, 'item-overview');
    }
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
