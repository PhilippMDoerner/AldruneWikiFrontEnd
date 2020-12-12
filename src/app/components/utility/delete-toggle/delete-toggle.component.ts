import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/app.constants';
import { AddPermissionUtilityFunctions, CurrentUserHasPermissions, hasPermissions, PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';
import { PermissionGuardService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-delete-toggle',
  templateUrl: './delete-toggle.component.html',
  styleUrls: ['./delete-toggle.component.scss']
})
@AddPermissionUtilityFunctions()
export class DeleteToggleComponent extends PermissionUtilityFunctionMixin implements OnInit {
  isInDeleteState: boolean = false;
  @Input() deleteEventEmission: string = null;
  @Input() deleteMessage: string = "Delete this object?";
  @Output() deleteEvent : EventEmitter<string> = new EventEmitter();

  constructor(
    private permissionService: PermissionGuardService
  ) { super() }

  ngOnInit(): void {
  }

  @CurrentUserHasPermissions([Constants.apiDeletePermission])
  toggleDeleteState(){
    this.isInDeleteState = !this.isInDeleteState
  }

  @CurrentUserHasPermissions([Constants.apiDeletePermission])
  emitDeleteEvent(){
    if (this.isInDeleteState){
      this.deleteEvent.emit(this.deleteEventEmission);
    }
    this.isInDeleteState = false;
  }
}
