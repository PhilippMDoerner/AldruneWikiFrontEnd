import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Rule, RuleObject } from "src/app/models/rule";
import { RoutingService } from 'src/app/services/routing.service';
import { RuleService } from 'src/app/services/rule.service';
import { TokenService } from 'src/app/services/token.service';
@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit, AfterViewInit {
  rules: Rule[];
  panelIsOpenArray: boolean[];
  constants: any = Constants;

  @ViewChildren("ruleElements") ruleComponents: QueryList<any>;

  constructor(
    private ruleService: RuleService,
    public routingService: RoutingService,
    public tokenService: TokenService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ruleService.list().pipe(first()).subscribe( 
      (rules: RuleObject[]) => {
        this.rules = rules;

        this.panelIsOpenArray = [];
        for (let rule of rules){
          this.panelIsOpenArray.push(true);
        }
      },
      error => this.routingService.routeToErrorPage(error)
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

  addRule(){
    const newRule = new RuleObject();
    newRule.name = "New Rule";
    this.rules.push(newRule);
  }

  onRuleDelete(index: number){
    this.rules.splice(index, 1);
  }
}
