import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Item, ItemObject } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item/item.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-item-article',
  templateUrl: './item-article.component.html',
  styleUrls: ['./item-article.component.scss']
})

export class ItemArticleComponent implements OnInit {
  constants: any = Constants;
  item: Item;
  articleType: string = 'item';

  private parameter_subscription: Subscription;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private warnings: WarningsService
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const itemName = params.name;

      this.itemService.getItem(itemName).pipe(first()).subscribe(
        (item: ItemObject) => this.item = item,
        error => Constants.routeToErrorPage(this.router, error)
      );
    })
  }

  onDescriptionUpdate(updatedDescription){
    const oldDescription = this.item.description;
    this.item.description = updatedDescription;
    this.itemService.updateItem(this.item).pipe(first()).subscribe(
      (item: ItemObject) => {},
      error =>{
        this.item.description = oldDescription;
        this.warnings.showWarning(error);
      }
    );
  }

  deleteArticle(){
    this.itemService.deleteItem(this.item.pk).pipe(first()).subscribe(
      response => Constants.routeToPath(this.router, 'item-overview'),
      error => this.warnings.showWarning(error)
    );
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }

}
