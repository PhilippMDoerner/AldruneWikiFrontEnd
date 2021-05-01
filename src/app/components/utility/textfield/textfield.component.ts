import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss']
})
export class TextfieldComponent extends PermissionUtilityFunctionMixin implements OnInit {
  @Input() initialText: string;
  @Input() heading: string;
  @Input() allowEdit: boolean = true;
  @Input() formStateSubject : BehaviorSubject<string> = new BehaviorSubject(Constants.displayState);
  @Output() updateText: EventEmitter<string> = new EventEmitter();
  constants = Constants;

  textModel: string;

  constructor() { super() }

  ngOnInit(): void {
    this.textModel = this.initialText;
  }

  isInUpdateState(): boolean{
      return this.formStateSubject.value === Constants.updateState;
  }

  isInOutdatedUpdateState(): boolean{
      return this.formStateSubject.value === Constants.outdatedUpdateState;
  }

  isInDisplayState(): boolean{
      return this.formStateSubject.value === Constants.displayState;
  }

  enableEdit(){
    if(!this.allowEdit) return;
    this.formStateSubject.next(Constants.updateState);
  }

  finishEdit(){
    if(!this.allowEdit) return;

    this.formStateSubject.next(Constants.displayState);
    this.updateText.emit(this.textModel);
  }

  cancelEdit(){
    if(!this.allowEdit) return;

    this.formStateSubject.next(Constants.displayState);
    this.textModel = this.initialText;
  }
}
