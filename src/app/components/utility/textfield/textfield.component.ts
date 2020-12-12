import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Constants } from 'src/app/app.constants';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss']
})
export class TextfieldComponent extends PermissionUtilityFunctionMixin implements OnInit, OnChanges {
  @Input() initialText: string;
  @Input() heading: string;
  @Output() updateText: EventEmitter<string> = new EventEmitter();
  updatedText: string;
  isEditState: boolean = false;
  constants = Constants;

  constructor() { super() }

  ngOnInit(): void {
    this.updatedText = this.initialText;
  }

  ngOnChanges(): void{
    this.updatedText = this.initialText;
  }

  enableEdit(){
    this.isEditState = true;
  }

  finishEdit(){
    this.isEditState = false;
    this.updateText.emit(this.updatedText);
  }

  cancelEdit(){
    this.isEditState = false;
    this.updatedText = this.initialText;
  }
}
