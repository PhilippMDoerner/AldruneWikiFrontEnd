import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-tinymce',
  templateUrl: './formly.component.html',
  styleUrls: ['./formly.component.scss']
})

export class FormlyComponent extends FieldType {}
