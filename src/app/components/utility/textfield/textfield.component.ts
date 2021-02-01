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
  @Input() allowEdit: boolean = true;
  @Input() isEditState : boolean = false;
  @Output() updateText: EventEmitter<string> = new EventEmitter();
  updatedText: string;
  constants = Constants;

  constructor() { super() }

  ngOnInit(): void {
    this.updatedText = this.initialText;
  }

  ngOnChanges(): void{
    this.updatedText = this.initialText;
  }

  enableEdit(){
    if(!this.allowEdit) return;
    this.isEditState = true;
  }

  finishEdit(){
    if(!this.allowEdit) return;

    this.isEditState = false;
    this.updateText.emit(this.updatedText);
  }

  cancelEdit(){
    if(!this.allowEdit) return;

    this.isEditState = false;
    this.updatedText = this.initialText;
  }
}
