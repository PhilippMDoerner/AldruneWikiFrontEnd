import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { Item, EmptyFormItem } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item/item.service';
import { OverviewService } from 'src/app/services/overview.service';

@Component({
  selector: 'app-item-article-update',
  templateUrl: './item-article-update.component.html',
  styleUrls: ['./item-article-update.component.scss']
})
export class ItemArticleUpdateComponent implements OnInit {

  private item_subscription: Subscription;
  private parameter_subscription: Subscription;

  constants: any = Constants;
  formState: string;
  form = new FormGroup({});
  model: Item | EmptyFormItem;
  fields: FormlyFieldConfig[] = [
    {
      key: "name",
      type: "input",
      templateOptions:{
        label: "Name"
      }
    },
    {
      key: "owner",
      type: "select",
      templateOptions:{
        label: "Owner",
        labelProp: "name",
        valueProp: "pk",
        options: this.characterService.getOverviewItems('character'),
      }
    },
  ];

  constructor(
    private itemService: ItemService,
    private characterService: OverviewService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;

    if (this.formState === this.constants.updateState){
      this.parameter_subscription = this.route.params.subscribe(params => {
        const itemName: string = params['name'];
  
        this.item_subscription = this.itemService.getItem(itemName).subscribe(item => {
          this.model = item;
        }, error =>{ this.router.navigateByUrl("error");});
      });
    } else if (this.formState === this.constants.createState) {
      this.model = new EmptyFormItem();
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
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
    if (this.item_subscription) this.item_subscription.unsubscribe();
  }
}
