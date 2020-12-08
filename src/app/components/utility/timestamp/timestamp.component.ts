import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { TimestampObject } from 'src/app/models/timestamp';
import { SessionAudioTimestampService } from 'src/app/services/session-audio-timestamp.service';

@Component({
  selector: 'app-timestamp',
  templateUrl: './timestamp.component.html',
  styleUrls: ['./timestamp.component.scss']
})
export class TimestampComponent implements OnInit {
  @Input() timestamp: TimestampObject;
  @Input() vimePlayer: any;
  @Output() timestampDelete: EventEmitter<TimestampObject> = new EventEmitter();
  isInDeleteState: boolean = false;

  constructor(
    private timestampService: SessionAudioTimestampService,
  ) { }

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

  deleteTimestamp(){
    this.timestampService.deleteTimestamp(this.timestamp.pk).pipe(first()).subscribe(response => {
      this.isInDeleteState = false;
      console.log("Timestamp delete emitted")
      this.timestampDelete.emit(this.timestamp);
    })
  }
}
