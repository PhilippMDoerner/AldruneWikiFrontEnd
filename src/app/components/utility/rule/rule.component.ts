import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Rule, RuleObject } from 'src/app/models/rule';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RuleService } from 'src/app/services/rule.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { CardFormMixin } from 'src/app/utils/functions/cardMixin';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})

export class RuleComponent extends CardFormMixin implements OnInit {
  @ViewChild('card') card: ElementRef;

  @Input() cardData: RuleObject;
  userModel: RuleObject;
  userModelClass = RuleObject;
  serverModel: Rule;

  cardDelete = new EventEmitter<number>()

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name"}),
    this.formlyService.genericTextField({key: "description"}),
  ];

  constructor(
    ruleService: RuleService,
    private formlyService: MyFormlyService,
    public warnings: WarningsService,  
    public element: ElementRef,
    route: ActivatedRoute,
    tokenService: TokenService,
  ) { 
    super(
      warnings,
      ruleService,
      route,
      tokenService
    )
  }
}
