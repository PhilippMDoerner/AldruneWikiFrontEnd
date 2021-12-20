import { Injectable } from '@angular/core';
import { BaseArticleDetailListResolver } from './base-resolvers';
import { RuleService } from 'src/app/services/rule.service';
import { RoutingService } from 'src/app/services/routing.service';

@Injectable({ providedIn: 'root' })
export class RuleResolver extends BaseArticleDetailListResolver {
  constructor(service: RuleService, routing: RoutingService) {
    super(service, routing);
  }
}
