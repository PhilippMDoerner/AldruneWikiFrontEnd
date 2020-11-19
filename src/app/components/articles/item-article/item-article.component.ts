import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  private item_subscription: Subscription;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const itemName = this.route.snapshot.params.name;

    this.item_subscription = this.itemService.getItem(itemName).subscribe(item => {
      this.item = item;
    }, error =>{ this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}/error`)});
  }

  onDescriptionUpdate(updatedDescription){
    const oldDescription = this.item.description;
    this.item.description = updatedDescription;
    this.itemService.updateItem(this.item).subscribe(diaryEntry => {
    }, error =>{
      this.item.description = oldDescription;
      console.log(error);
    })
  }

  deleteArticle(){
      this.itemService.deleteItem(this.item.pk).subscribe(response => {
        this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}/item`)
      }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.item_subscription) this.item_subscription.unsubscribe();
  }

}
