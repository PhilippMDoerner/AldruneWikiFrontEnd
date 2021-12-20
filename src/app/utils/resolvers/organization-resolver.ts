import { Injectable } from '@angular/core';
import { OrganizationObject } from 'src/app/models/organization';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { RoutingService } from 'src/app/services/routing.service';
import {
  BaseArticleResolver,
  BaseArticleUpdateResolver,
} from './base-resolvers';

@Injectable({ providedIn: 'root' })
export class OrganizationResolver extends BaseArticleResolver {
  constructor(service: OrganizationService, routing: RoutingService) {
    super(service, routing);
  }
}

@Injectable({ providedIn: 'root' })
export class OrganizationUpdateResolver extends BaseArticleUpdateResolver {
  dataModelClass = OrganizationObject;

  constructor(
    service: OrganizationService,
    globalUrlParamsService: GlobalUrlParamsService,
    routing: RoutingService
  ) {
    super(service, globalUrlParamsService, routing);
  }
}
