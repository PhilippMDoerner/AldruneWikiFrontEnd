import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-formcontainer',
  templateUrl: './formly-formcontainer.component.html',
  styleUrls: ['./formly-formcontainer.component.scss']
})
export class FormlyFormcontainerComponent{
  form = new FormGroup({});

  @Input() model: {any};
  @Input() fields: FormlyFieldConfig[];
  @Input() enctype: string = "application/x-www-form-urlencoded"; //Default form enctype in HTML5
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  constructor() {}

  onSubmit(): void{
    this.submit.emit(this.model);
  }

  onCancel(): void{
    this.cancel.emit(this.model);
  }
}
