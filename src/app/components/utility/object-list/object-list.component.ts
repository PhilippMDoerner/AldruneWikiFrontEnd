import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants, OverviewType } from 'src/app/app.constants';
import { Article } from 'src/app/models/recentlyUpdatedArticle';
import { TokenService } from 'src/app/services/token.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.scss']
})
export class ObjectListComponent extends PermissionUtilityFunctionMixin implements OnInit {
  constants: any = Constants;
  @Input() heading: string;
  @Input() items: {'name': string}[];
  @Input() articleType: OverviewType;
  @Input() createLink: string = "";
  campaign: string = this.route.snapshot.params.campaign;
  itemLinks: string[];

  constructor(    
    route: ActivatedRoute,
    tokenService: TokenService,
  ) { 
    super(tokenService, route);
  }

  ngOnInit(): void {
    const articleTypeStr: string = this.articleType.toLocaleLowerCase();
    if (this.createLink === "") this.createLink = `${Constants.wikiUrlFrontendPrefix}/${articleTypeStr}/create`;

    this.itemLinks = this.items.map(item => `${Constants.wikiUrlFrontendPrefix}/${articleTypeStr}/${this.campaign}/${item.name}`);
  }

}
