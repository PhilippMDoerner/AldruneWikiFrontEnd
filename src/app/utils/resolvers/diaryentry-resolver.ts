import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { DiaryEntryObject } from 'src/app/models/diaryentry';
import { DiaryentryService } from 'src/app/services/diaryentry/diaryentry.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';
import {
  BaseArticleResolver,
  BaseArticleUpdateResolver,
} from './base-resolvers';

@Injectable({ providedIn: 'root' })
export class DiaryentryResolver extends BaseArticleResolver {
  constructor(service: DiaryentryService, routing: RoutingService) {
    super(service, routing);
  }

  getQueryParameter(params: Params): any {
    const isMainSession: number = parseInt(params.isMainSession);
    const sessionNumber: number = parseInt(params.sessionNumber);
    const authorName: string = params.authorName;
    return { isMainSession, sessionNumber, authorName };
  }
}

@Injectable({ providedIn: 'root' })
export class DiaryentryUpdateResolver extends BaseArticleUpdateResolver {
  dataModelClass = DiaryEntryObject;

  constructor(
    service: DiaryentryService,
    globalUrlParamsService: GlobalUrlParamsService,
    routing: RoutingService
  ) {
    super(service, globalUrlParamsService, routing);
  }

  getQueryParameters(params: Params): any {
    const isMainSession: number = parseInt(params.isMainSession);
    const sessionNumber: number = parseInt(params.sessionNumber);
    const authorName: string = params.authorName;
    return { isMainSession, sessionNumber, authorName };
  }
}
