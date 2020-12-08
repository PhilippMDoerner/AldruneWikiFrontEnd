import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-datepicker',
  templateUrl: './formly-datepicker.component.html',
  styleUrls: ['./formly-datepicker.component.scss']
})
export class FormlyDatepickerComponent extends FieldType {
  // TODO: Fix the bug about the datepicker being updated during initialization of the view.
  // TODO: Fix the initial date not being displayed in the datepicker input field
  ngOnInit(){console.log(this.to)};
}
