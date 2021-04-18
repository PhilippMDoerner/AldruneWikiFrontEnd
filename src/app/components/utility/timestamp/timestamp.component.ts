import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { TimestampObject } from 'src/app/models/timestamp';
import { SessionAudioTimestampService } from 'src/app/services/session-audio-timestamp.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';
import { animateElement } from 'src/app/utils/functions/animationDecorator';

@Component({
  selector: 'app-timestamp',
  templateUrl: './timestamp.component.html',
  styleUrls: ['./timestamp.component.scss']
})
export class TimestampComponent extends PermissionUtilityFunctionMixin implements OnInit {
  @Input() timestamp: TimestampObject;
  @Input() vimePlayer: any;
  @Output() timestampDelete: EventEmitter<TimestampObject> = new EventEmitter();
  @ViewChild('timestampDeleteElement') timestampDeleteElementRef : ElementRef;
  isInDeleteState: boolean = false;

  constructor(
    private timestampService: SessionAudioTimestampService,
  ) { super() }

  ngOnInit(): void {
  }

  timeToString(seconds: number): string{
    const hours = Math.floor(seconds/3600);
    const minutes = Math.floor((seconds - hours*3600)/60);
    const remainingSeconds = Math.floor(seconds - hours*3600 - minutes*60);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  toggleDeleteState(): void{
    this.isInDeleteState = !this.isInDeleteState;
  }

  onCancelClick(): void{
    if(this.isInDeleteState){
      animateElement(this.timestampDeleteElementRef.nativeElement, 'slideOutRight')
        .then(() => this.toggleDeleteState());
    } else {
      this.toggleDeleteState();
    }
  }

  deleteTimestamp(){
    this.timestampService.delete(this.timestamp.pk).pipe(first()).subscribe(response => {
      this.isInDeleteState = false;
      this.timestampDelete.emit(this.timestamp);
    })
  }
}
