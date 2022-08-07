import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';
import { animateElement } from 'src/app/utils/functions/animationDecorator';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-toggle',
  templateUrl: './delete-toggle.component.html',
  styleUrls: ['./delete-toggle.component.scss'],
})
export class DeleteToggleComponent extends PermissionUtilityFunctionMixin {
  @Input() deleteEventEmission: string = null;
  @Input() deleteMessage: string = "Delete this object?";
  @Output() deleteEvent : EventEmitter<string> = new EventEmitter();

  constructor(
    tokenService: TokenService,
    route: ActivatedRoute
  ) { 
    super(tokenService, route); 
  }

  emitDeleteEvent(){
    this.deleteEvent.emit(this.deleteEventEmission);
  }
}
