import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Rule, RuleObject } from 'src/app/models/rule';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { RuleService } from 'src/app/services/rule.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { animateElement } from 'src/app/utils/functions/animationDecorator';
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
    route: ActivatedRoute
  ) { 
    super(
      warnings,
      ruleService,
      route
    )
  }
}
