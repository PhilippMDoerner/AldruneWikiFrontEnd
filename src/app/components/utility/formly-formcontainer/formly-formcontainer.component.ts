import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-formcontainer',
  templateUrl: './formly-formcontainer.component.html',
  styleUrls: ['./formly-formcontainer.component.scss']
})
export class FormlyFormcontainerComponent {
  form = new FormGroup({});

  @Input() model: {any};
  @Input() fields: FormlyFieldConfig[];
  @Input() enctype: string = "application/x-www-form-urlencoded"; //Default form enctype in HTML5
  @Input() enableSubmitButtons: boolean = true;
  @Output() formlySubmit: EventEmitter<any> = new EventEmitter();
  @Output() formlyCancel: EventEmitter<any> = new EventEmitter();

  constructor() {}

  onSubmit(): void{
    if(this.form.valid){
      this.formlySubmit.emit(this.model);
    }
  }

  onCancel(): void{
    this.formlyCancel.emit(this.model);
  }
}
