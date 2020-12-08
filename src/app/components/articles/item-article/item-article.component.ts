import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item/item.service';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const itemName = params.name;

      this.itemService.getItem(itemName).pipe(first()).subscribe(item => {
        this.item = item;
      }, error =>{ this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}/error`)});
    })
  }

  onDescriptionUpdate(updatedDescription){
    const oldDescription = this.item.description;
    this.item.description = updatedDescription;
    this.itemService.updateItem(this.item).pipe(first()).subscribe(diaryEntry => {
    }, error =>{
      this.item.description = oldDescription;
      console.log(error);
    })
  }

  deleteArticle(){
      this.itemService.deleteItem(this.item.pk).pipe(first()).subscribe(response => {
        const itemOverviewUrl: string = Constants.getRoutePath(this.router, 'item-overview');
        this.router.navigateByUrl(itemOverviewUrl);
      }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }

}
