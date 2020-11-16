import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { Item, ItemObject } from 'src/app/models/item';
import { CharacterService } from 'src/app/services/character/character.service';
import { ItemService } from 'src/app/services/item/item.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { OverviewService } from 'src/app/services/overview.service';

@Component({
  selector: 'app-item-article-update',
  templateUrl: './item-article-update.component.html',
  styleUrls: ['./item-article-update.component.scss']
})
export class ItemArticleUpdateComponent implements OnInit {
  constants: any = Constants;

  private item_subscription: Subscription;
  private character_subscription: Subscription;

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
    const itemName: string = this.route.snapshot.params.name;
    const itemOwnerName: string = this.route.snapshot.params.character_name;
    this.isForAssociatedObjectCreation = itemOwnerName && this.formState === this.constants.createState;

    if (this.formState === this.constants.updateState){
      this.item_subscription = this.itemService.getItem(itemName).subscribe(item => {
        this.model = item;
      });
    } else if (this.isForAssociatedObjectCreation){
      this.character_subscription = this.characterService.getCharacter(itemOwnerName).subscribe(itemOwner => {
        this.model = new ItemObject();
        this.model.owner = itemOwner.pk;
      });
    } else if (this.formState === this.constants.createState) {
      this.model = new ItemObject();
    } 
  }

  onSubmit(model: Item){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.itemService.updateItem(model) : this.itemService.createItem(model);

    responseObservable.subscribe(response => {
      console.log(response);
      this.router.navigateByUrl(`/item/${model.name}`);
    }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.item_subscription) this.item_subscription.unsubscribe();
    if (this.character_subscription) this.character_subscription.unsubscribe();
  }
}
