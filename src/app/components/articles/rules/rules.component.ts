import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Rule, RuleObject } from "src/app/models/rule";
import { RuleService } from 'src/app/services/rule.service';
@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  rules: Rule[];
  panelIsOpenArray: boolean[];
  constants: any = Constants;

  constructor(
    private ruleService: RuleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.ruleService.getRules().pipe(first()).subscribe( 
      (rules: RuleObject[]) => {
        this.rules = rules;

        this.panelIsOpenArray = [];
        for (let rule of rules){
          this.panelIsOpenArray.push(true);
        }
      },
      error => Constants.routeToErrorPage(this.router, error)
    )
  }

  panelIsOpen(i: number): boolean{
    return this.panelIsOpenArray[i];
  }

  togglePanel(i: number){
    this.panelIsOpenArray[i] = !this.panelIsOpenArray[i];
  }
}
