import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-file',
  templateUrl: './file-upload.component.html',
})
export class FormlyFieldFile extends FieldType {}