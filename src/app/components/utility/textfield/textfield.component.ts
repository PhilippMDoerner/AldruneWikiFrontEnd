import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { TokenService } from 'src/app/services/token.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss'],
})
export class TextfieldComponent
  extends PermissionUtilityFunctionMixin
  implements OnInit
{
  @Input() initialText: string;
  @Input() heading: string;
  @Input() allowEdit: boolean = true;
  @Input() formStateSubject: BehaviorSubject<string> = new BehaviorSubject(
    Constants.displayState
  );
  @Output() updateText: EventEmitter<string> = new EventEmitter();
  constants = Constants;

  textModel: string;

  constructor(route: ActivatedRoute, tokenService: TokenService) {
    super(tokenService, route);
  }

  ngOnInit(): void {
    this.initialText = this.initialText == null ? '' : this.initialText;
    this.textModel = this.initialText;
  }

  isInUpdateState(): boolean {
    return this.formStateSubject.value === Constants.updateState;
  }

  isInOutdatedUpdateState(): boolean {
    return this.formStateSubject.value === Constants.outdatedUpdateState;
  }

  isInDisplayState(): boolean {
    return this.formStateSubject.value === Constants.displayState;
  }

  enableEdit(): void {
    if (!this.allowEdit) return;
    this.formStateSubject.next(Constants.updateState);
  }

  finishEdit(): void {
    if (!this.allowEdit) return;

    this.formStateSubject.next(Constants.displayState);
    this.updateText.emit(this.textModel);
  }
  //TODO: on cancel edit on mobile this does not properly work. initialText has the correct value,
  //but for some arbitrary reason does not lead to a re-render of the components contents with that text
  cancelEdit(): void {
    if (!this.allowEdit) return;

    this.formStateSubject.next(Constants.displayState);
    this.textModel = this.initialText;
  }
}
