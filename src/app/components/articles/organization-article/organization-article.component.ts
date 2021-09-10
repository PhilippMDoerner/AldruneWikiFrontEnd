import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Organization, OrganizationObject } from 'src/app/models/organization';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleMixin } from 'src/app/utils/functions/articleMixin';

@Component({
  selector: 'app-organization-article',
  templateUrl: './organization-article.component.html',
  styleUrls: ['./organization-article.component.scss']
})
export class OrganizationArticleComponent extends ArticleMixin implements OnInit {
  //ArticleMixinVariables
  articleData: Organization;
  deleteRoute = {routeName: "organization-overview", params: {campaign: null}};
  queryParameterName: string = 'name';


  constructor(
    organizationService: OrganizationService,
    public route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    globalUrlParams: GlobalUrlParamsService,
  ) {
    super(
      organizationService,
      route,
      routingService,
      warnings,
      globalUrlParams
    )
   }
}
