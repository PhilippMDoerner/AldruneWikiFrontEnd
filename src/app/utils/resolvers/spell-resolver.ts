import { Injectable } from '@angular/core';
import { BaseArticleDetailListResolver } from './base-resolvers';
import { SpellService } from 'src/app/services/spell.service';
import { RoutingService } from 'src/app/services/routing.service';

@Injectable({ providedIn: 'root' })
export class SpellResolver extends BaseArticleDetailListResolver {
  constructor(service: SpellService, routing: RoutingService) {
    super(service, routing);
  }
}
