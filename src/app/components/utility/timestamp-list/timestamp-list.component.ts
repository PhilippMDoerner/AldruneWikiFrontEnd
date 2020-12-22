import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { SessionAudioObject } from 'src/app/models/sessionaudio';
import { TimestampObject } from 'src/app/models/timestamp';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { SessionAudioTimestampService } from 'src/app/services/session-audio-timestamp.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-timestamp-list',
  templateUrl: './timestamp-list.component.html',
  styleUrls: ['./timestamp-list.component.scss']
})
export class TimestampListComponent implements OnInit, OnDestroy {
  @Input() sessionAudio: SessionAudioObject;
  @Input() timestamps: TimestampObject[];
  @Input() vimePlayer: any;
  @Input() createTimestampEventSubject: Subject<number>;
  @Output() timestampClick: EventEmitter<number> = new EventEmitter();
  @Output() timestampCreate: EventEmitter<any> = new EventEmitter();

  timestampModel: TimestampObject = new TimestampObject();
  timestampForm: FormGroup = new FormGroup({});
  timestampFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "time", maxLength: 8, minLength: 8, className: "timestamp-input black-background px-0 col-lg-2 col-3"}),
    this.formlyService.genericInput({key: "name", label: "Title", className: "timestamp-input black-background px-0 col-lg-10 col-9"}),
  ];
  timestampCreateState: boolean = false;

  subject_subscription: Subscription;

  constructor(
    private timestampService: SessionAudioTimestampService,
    private formlyService: MyFormlyService,
    private warningsService: WarningsService,
  ) { }

  ngOnInit(): void {
    this.subject_subscription = this.createTimestampEventSubject.subscribe((timeInSeconds: number) => {
      this.timestampCreateState = !this.timestampCreateState;
      if (this.timestampCreateState){
        this.timestampModel = new TimestampObject();
        this.timestampModel.time = this.timeToString(timeInSeconds);
        this.timestampModel.session_audio = this.sessionAudio.pk;
      }
    })
  }

  timeToString(seconds: number): string{
    const hours = Math.floor(seconds/3600);
    const minutes = Math.floor((seconds - hours*3600)/60);
    const remainingSeconds = Math.floor(seconds - hours*3600 - minutes*60);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  stringToTime(timeString: string): number{
    const hours: number = parseInt(timeString.substr(0, 2));
    const minutes: number = parseInt(timeString.substr(3, 2));
    const seconds: number = parseInt(timeString.substr(6, 2));
    return hours*3600 + minutes*60 + seconds;
  }

  createTimestamp(): void{
    if (typeof this.timestampModel.time === "number") throw `Error during creation of request to create timestamp. The input ${this.timestampModel.time} is not the expected time-string`
    this.timestampModel.time = this.stringToTime(this.timestampModel.time);

    this.timestampService.createTimestamp(this.timestampModel).pipe(first()).subscribe(
      (timestamp: TimestampObject) => {
        this.timestamps.unshift(timestamp);
        this.timestampCreateState = false;
        this.timestampCreate.emit();
      },
      error => this.warningsService.showWarning(error)
    );
  }

  cancelTimestampCreateState(): void{
    this.timestampCreateState = false;
  }

  deleteTimestamp(timestamp: TimestampObject){
    const index: number = this.timestamps.indexOf(timestamp);
    this.timestamps.splice(index, 1);
  }

  ngOnDestroy(): void{
    if(this.subject_subscription) this.subject_subscription.unsubscribe();
  }
}
