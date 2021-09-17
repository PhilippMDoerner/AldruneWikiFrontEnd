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
export class DeleteToggleComponent extends PermissionUtilityFunctionMixin implements OnInit {
  isInDeleteState: boolean = false;
  @Input() deleteEventEmission: string = null;
  @Input() deleteMessage: string = "Delete this object?";
  @Output() deleteEvent : EventEmitter<string> = new EventEmitter();

  @ViewChild("deleteButton") deleteButton: ElementRef;

  constructor(
    tokenService: TokenService,
    route: ActivatedRoute
  ) { 
    super(tokenService, route); 
  }

  ngOnInit(): void {
  }

  toggleDeleteState(){
    this.isInDeleteState = !this.isInDeleteState
    animateElement( this.deleteButton.nativeElement , 'flipInY');
  }

  emitDeleteEvent(){
    if (this.isInDeleteState){
      this.deleteEvent.emit(this.deleteEventEmission);
    }
    this.isInDeleteState = false;
  }
}
