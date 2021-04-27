import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { RuleObject } from 'src/app/models/rule';
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
//TODO: Write a mixin for card-like entities such as encounters, rules and spells
export class RuleComponent extends CardFormMixin implements OnInit {
  @Input() cardData: RuleObject;
  @ViewChild('card') card: ElementRef;
  cardDelete = new EventEmitter<number>()

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name"}),
    this.formlyService.genericTextField({key: "description"}),
  ];

  constructor(
    ruleService: RuleService,
    private formlyService: MyFormlyService,
    public warnings: WarningsService,  
  ) { 
    super(
      warnings,
      ruleService
    )
  }

  ngOnInit(): void {
    const isCreateState: boolean = this.cardData.name === "New Rule";
    this.formState = isCreateState ? Constants.createState : Constants.displayState;
    this.isOpen = isCreateState;

    if(isCreateState){
      this.userModel = new RuleObject();
    }
  }
}
