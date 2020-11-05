import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Rule } from "src/app/models/rule";
import { RuleService } from 'src/app/services/rule.service';
@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  rules: Rule[];
  panelIsOpenArray: boolean[];
  rules_subscription: Subscription;

  constructor(
    private ruleService: RuleService,
  ) { }

  ngOnInit(): void {
    this.rules_subscription = this.ruleService.getRules().subscribe( rules => {
      this.rules = rules;
      this.panelIsOpenArray = [];
      for (let rule of rules){
        this.panelIsOpenArray.push(true);
      }
    })
  }

  panelIsOpen(i: number): boolean{
    return this.panelIsOpenArray[i];
  }

  togglePanel(i: number){
    this.panelIsOpenArray[i] = !this.panelIsOpenArray[i];
  }

  ngOnDestroy(){
    if(this.rules_subscription) this.rules_subscription.unsubscribe();
  }
}
