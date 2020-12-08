import { Component, ContentChild, ContentChildren, ElementRef, OnDestroy, OnInit, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { SessionAudio } from 'src/app/models/sessionaudio';
import { TimestampObject, Timestamp } from 'src/app/models/timestamp';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { SessionAudioTimestampService } from 'src/app/services/session-audio-timestamp.service';
import { SessionAudioService } from 'src/app/services/session-audio.service';


@Component({
  selector: 'app-session-audio',
  templateUrl: './session-audio.component.html',
  styleUrls: ['./session-audio.component.scss']
})

export class SessionAudioComponent implements OnInit, OnDestroy {
  constants: any = Constants;

  sessionAudio: SessionAudio;
  priorSessionAudio: {isMainSessionInt: number, sessionNumber: number};
  nextSessionAudio: {isMainSessionInt: number, sessionNumber: number};

  timestamps: Timestamp[];
  timestampModel: TimestampObject = new TimestampObject();
  timestampForm: FormGroup = new FormGroup({});
  timestampFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "time", maxLength: 8, minLength: 8, className: "timestamp-input black-background px-0 col-lg-2"}),
    this.formlyService.genericInput({key: "name", label: "Title", className: "timestamp-input black-background col-lg-10"}),
  ]
  timestampCreateState: boolean = false;
  
  parameter_subscription: Subscription;

  @ContentChild("audioSource") audioSourceChild: ElementRef;
  @ViewChild("audioSource") audioSourceChild2: ElementRef;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionAudioService: SessionAudioService,
    private timestampService: SessionAudioTimestampService,
    private formlyService: MyFormlyService,
    ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const isMainSessionInt: number = params.isMainSession;
      const sessionNumber: number = params.sessionNumber;

      this.sessionAudioService.getSessionAudioFile(isMainSessionInt, sessionNumber).pipe(first()).subscribe(sessionAudio => {
        this.sessionAudio = sessionAudio;
        this.priorSessionAudio = sessionAudio.sessionAudioNeighbours.priorSessionAudio;
        this.nextSessionAudio = sessionAudio.sessionAudioNeighbours.nextSessionAudio;
      }, error => console.log(error));

      this.timestampService.getTimestamps(isMainSessionInt, sessionNumber).pipe(first()).subscribe(timestamps => {
        this.timestamps = timestamps;
      })
    })
  }

  routeToSessionAudio({isMainSessionInt, sessionNumber}){
    //Only needed because the vime player doesn't properly trigger events for src changes
    const sessionAudioUrl: string = Constants.getRoutePath(this.router, 'sessionaudio', {isMainSession: isMainSessionInt, sessionNumber: sessionNumber});
    this.router.navigateByUrl(sessionAudioUrl);
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
  }

  deleteArticle(){
    this.sessionAudioService.deleteSessionAudioFile(this.sessionAudio.pk).pipe(first()).subscribe(response => {
      this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}/sessionaudio`);
    }, error => console.log(error));
  }

  reloadPlayer(audioSource){
    const audioPlayer = audioSource.parentElement;
    audioPlayer.load();
  }

  togglePlayer(vimePlayer){
    if (vimePlayer.playing) vimePlayer.pause();
    else vimePlayer.play();
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

  toggleTimestampCreateState(timestampTime: number){
    this.timestampCreateState = !this.timestampCreateState;

    if (this.timestampCreateState){
      this.timestampModel = new TimestampObject();
      this.timestampModel.time = this.timeToString(timestampTime);
      this.timestampModel.session_audio = this.sessionAudio.pk;
    }
  }

  createTimestamp(){
    if (typeof this.timestampModel.time === "number") throw `Error during creation of request to create timestamp. The input ${this.timestampModel.time} is not the expected time-string`
    this.timestampModel.time = this.stringToTime(this.timestampModel.time);;

    this.timestampService.createTimestamp(this.timestampModel).pipe(first()).subscribe(timestamp => {
      this.timestamps.unshift(timestamp);
      this.timestampCreateState = false;
    });
  }

  cancelTimestampCreateState(){
    this.timestampCreateState = false;
  }

  deleteTimestamp(timestamp: Timestamp){
    this.timestampService.deleteTimestamp(timestamp.pk).pipe(first()).subscribe(response => {
      const index: number = this.timestamps.indexOf(timestamp);
      this.timestamps.splice(index, 1);
    })
  }

  ngOnDestroy(){
    if(this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
