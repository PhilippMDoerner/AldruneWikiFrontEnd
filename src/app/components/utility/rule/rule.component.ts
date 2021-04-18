import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { RuleObject } from 'src/app/models/rule';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { RuleService } from 'src/app/services/rule.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { animateElement } from 'src/app/utils/functions/animationDecorator';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {
  isOpen: boolean = false;
  isUpdateState: boolean = false;
  isCreateState: boolean;

  @Input() rule: RuleObject;
  @Input() index: number;

  @Output() deleteRule: EventEmitter<number> = new EventEmitter();

  @ViewChild('ruleCard') ruleCard: ElementRef;

  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name"}),
    this.formlyService.genericTextField({key: "description"}),
  ];

  constructor(
    private ruleService: RuleService,
    private formlyService: MyFormlyService,
    private warnings: WarningsService,  
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.isCreateState = this.rule.name === "New Rule";
    this.isOpen = this.isCreateState
  }

  togglePanel(): void{
    this.isOpen = !this.isOpen;
  }

  onSubmit(){
    const responseObservable: Observable<RuleObject> =  this.isUpdateState ? 
        this.ruleService.update(this.rule.id, this.rule) : 
        this.ruleService.create(this.rule);

    responseObservable.pipe(first()).subscribe(
      (rule: RuleObject) => {
        this.rule = rule;
        this.isUpdateState = false;
        this.isCreateState = false;
      },
      error => this.warnings.showWarning(error)
    );
  }

  onCancel(){
    this.isUpdateState = false;
    if(this.isCreateState){
      this.removeRule();
    }
  }

  removeRule(){
    animateElement(this.ruleCard.nativeElement, 'fadeOutDown')
      .then(() => this.deleteRule.emit(this.index));
  }


  onDelete(){
    this.ruleService.delete(this.rule.id).pipe(first()).subscribe(
      () => this.removeRule(),
      error => this.warnings.showWarning(error)
    );
  }

  toggleFormState(){
    if(!this.isCreateState && !this.isUpdateState){
      this.isUpdateState = true;
    } else if (this.isUpdateState){
      this.isCreateState = false;
      this.isUpdateState = false;
    } else if (this.isCreateState){
      this.removeRule();
    }
  }
}
