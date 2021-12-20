import { Injectable } from '@angular/core';
import { CharacterObject } from 'src/app/models/character';
import { CharacterService } from 'src/app/services/character/character.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';
import {
  BaseArticleResolver,
  BaseArticleUpdateResolver,
} from './base-resolvers';

@Injectable({ providedIn: 'root' })
export class CharacterResolver extends BaseArticleResolver {
  constructor(service: CharacterService, routing: RoutingService) {
    super(service, routing);
  }
}

@Injectable({ providedIn: 'root' })
export class CharacterUpdateResolver extends BaseArticleUpdateResolver {
  dataModelClass = CharacterObject;

  constructor(
    service: CharacterService,
    globalUrlParamsService: GlobalUrlParamsService,
    routing: RoutingService
  ) {
    super(service, globalUrlParamsService, routing);
  }
}
