import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-toggle',
  templateUrl: './delete-toggle.component.html',
  styleUrls: ['./delete-toggle.component.scss']
})
export class DeleteToggleComponent implements OnInit {
  isInDeleteState: boolean = false;
  @Input() deleteEventEmission: string = null;
  @Input() deleteMessage: string = "Delete this object?";
  @Output() deleteEvent : EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleDeleteState(){
    this.isInDeleteState = !this.isInDeleteState
  }

  emitDeleteEvent(){
    if (this.isInDeleteState){
      this.deleteEvent.emit(this.deleteEventEmission);
    }
    this.isInDeleteState = false;
  }

}
