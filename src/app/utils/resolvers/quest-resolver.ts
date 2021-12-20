import { Injectable } from '@angular/core';
import { QuestObject } from 'src/app/models/quest';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { QuestService } from 'src/app/services/quest.service';
import { RoutingService } from 'src/app/services/routing.service';
import {
  BaseArticleListResolver,
  BaseArticleResolver,
  BaseArticleUpdateResolver,
} from './base-resolvers';

@Injectable({ providedIn: 'root' })
export class QuestResolver extends BaseArticleResolver {
  constructor(service: QuestService, routing: RoutingService) {
    super(service, routing);
  }
}

@Injectable({ providedIn: 'root' })
export class QuestOverviewResolver extends BaseArticleListResolver {
  constructor(service: QuestService, routing: RoutingService) {
    super(service, routing);
  }
}

@Injectable({ providedIn: 'root' })
export class QuestUpdateResolver extends BaseArticleUpdateResolver {
  dataModelClass = QuestObject;

  constructor(
    service: QuestService,
    globalUrlParamsService: GlobalUrlParamsService,
    routing: RoutingService
  ) {
    super(service, globalUrlParamsService, routing);
  }
}
