import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { ItemService } from 'src/app/services/item/item.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleMixin } from 'src/app/utils/functions/articleMixin';

@Component({
  selector: 'app-item-article',
  templateUrl: './item-article.component.html',
  styleUrls: ['./item-article.component.scss']
})

export class ItemArticleComponent extends ArticleMixin {
  //ArticleMixin Variables
  articleData: Item;
  deleteRoute = {routeName: "item-overview", params: {campaign: null}}
  queryParameterName = "name";

  constructor(
    itemService: ItemService,
    public route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    globalUrlParams: GlobalUrlParamsService,
    tokenservice: TokenService,
  ) {
    super(
      itemService,
      route,
      routingService,
      warnings,
      globalUrlParams,
      tokenservice,
    )
   }
}
