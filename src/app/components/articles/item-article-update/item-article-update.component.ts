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

  form = new FormGroup({});
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
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;

    this.parameter_subscription = this.route.params.subscribe(params => {
      const itemName: string = params.name;
      const itemOwnerName: string = params.character_name;
      this.isForAssociatedObjectCreation = itemOwnerName && this.formState === this.constants.createState;

      if (this.formState === this.constants.updateState){
        this.itemService.getItem(itemName).pipe(first()).subscribe(item => {
          this.model = item;
        });
      } else if (this.isForAssociatedObjectCreation){
        this.characterService.getCharacter(itemOwnerName).pipe(first()).subscribe(itemOwner => {
          this.model = new ItemObject();
          this.model.owner = itemOwner.pk;
        });
      } else if (this.formState === this.constants.createState) {
        this.model = new ItemObject();
      } 
    })
  }

  onSubmit(){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.itemService.updateItem(this.model) : this.itemService.createItem(this.model);

    responseObservable.pipe(first()).subscribe(response => {
      const itemUrl: string = Constants.getRoutePath(this.router, 'item', {name: this.model.name});
      this.router.navigateByUrl(itemUrl);
    }, error => console.log(error));
  }

  getCancelRoutingDestination(): string{
    const isItemCharacterCreateUrl: boolean = routeNameMatches(this.route, "item-character-create");

    if (isItemCharacterCreateUrl){
      const characterName = this.route.snapshot.params['character_name'];
      const characterUrl = Constants.getRoutePath(this.router, 'character', {name: characterName});
      return characterUrl;
    }

    const itemUrl = Constants.getRoutePath(this.router, 'item', {name: this.model.name});
    return itemUrl;
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
