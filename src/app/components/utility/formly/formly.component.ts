import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Constants } from 'src/app/app.constants';


@Component({
  selector: 'formly-field-tinymce',
  templateUrl: './formly.component.html',
  styleUrls: ['./formly.component.scss']
})

export class FormlyComponent extends FieldType {
  constants: any = Constants;
}
