import { Injectable } from '@angular/core';
import { CreatureObject } from 'src/app/models/creature';
import { CreatureService } from 'src/app/services/creature/creature.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';
import {
  BaseArticleResolver,
  BaseArticleUpdateResolver,
} from './base-resolvers';

@Injectable({ providedIn: 'root' })
export class CreatureResolver extends BaseArticleResolver {
  constructor(service: CreatureService, routing: RoutingService) {
    super(service, routing);
  }
}

@Injectable({ providedIn: 'root' })
export class CreatureUpdateResolver extends BaseArticleUpdateResolver {
  dataModelClass = CreatureObject;

  constructor(
    service: CreatureService,
    globalUrlParamsService: GlobalUrlParamsService,
    routing: RoutingService
  ) {
    super(service, globalUrlParamsService, routing);
  }
}
