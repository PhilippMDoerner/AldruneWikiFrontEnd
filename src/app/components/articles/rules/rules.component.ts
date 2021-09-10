import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  RuleObject } from "src/app/models/rule";
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';
import { RuleService } from 'src/app/services/rule.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleListMixin } from 'src/app/utils/functions/articleListMixin';
@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent extends ArticleListMixin implements OnInit, AfterViewInit {
 
  @ViewChildren("ruleElements") ruleComponents: QueryList<any>;

  articleModelClass = RuleObject;
  articleStarterTitle = "New Rule";

  constructor(
    ruleService: RuleService,
    public routingService: RoutingService,
    public tokenService: TokenService,
    route: ActivatedRoute,
    warning: WarningsService,
    globalUrlParams: GlobalUrlParamsService
  ) { 
    super(
      ruleService,
      route,
      routingService,
      warning,
      globalUrlParams
    )
  }

  ngAfterViewInit(): void{
    const urlRuleName: string = this.route.snapshot.params["name"];

    this.ruleComponents.changes.subscribe( 
      (queryList: QueryList<any>) => this.scrollToRuleInQueryList(queryList, urlRuleName)
    );
  }

  scrollToRuleInQueryList(queryList: QueryList<any>, ruleName: string){
    const targetRuleComponent = queryList.find( ruleComponent => ruleComponent.cardData.name === ruleName );
    const hasTargetSpell = targetRuleComponent != null;

    if(hasTargetSpell){
      targetRuleComponent.element.nativeElement.scrollIntoView();
    }
  }
}
