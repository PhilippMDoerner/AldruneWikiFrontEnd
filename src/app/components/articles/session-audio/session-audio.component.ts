import { Component, ContentChild, ContentChildren, ElementRef, OnInit, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

export class SessionAudioComponent implements OnInit {
  constants: any = Constants;

  sessionAudio: SessionAudio;
  priorSessionAudio: {isMainSessionInt: number, sessionNumber: number};
  nextSessionAudio: {isMainSessionInt: number, sessionNumber: number};

  timestamps: Timestamp[];
  timestamp_model: TimestampObject = new TimestampObject();
  timestampCreateState: boolean = false;
  
  sessionAudio_subscription: Subscription;
  parameter_subscription: Subscription;
  timestamp_suscription: Subscription;

  @ContentChild("audioSource") audioSourceChild: ElementRef;
  @ViewChild("audioSource") audioSourceChild2: ElementRef;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionAudioService: SessionAudioService,
    private timestampService: SessionAudioTimestampService,
    ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const isMainSessionInt: number = params.isMainSession;
      const sessionNumber: number = params.sessionNumber;

      this.sessionAudio_subscription = this.sessionAudioService.getSessionAudioFile(isMainSessionInt, sessionNumber).subscribe(sessionAudio => {
        this.sessionAudio = sessionAudio;
        this.priorSessionAudio = sessionAudio.sessionAudioNeighbours.priorSessionAudio;
        this.nextSessionAudio = sessionAudio.sessionAudioNeighbours.nextSessionAudio;
      }, error => console.log(error));

      this.timestamp_suscription = this.timestampService.getTimestamps(isMainSessionInt, sessionNumber).subscribe(timestamps => {
        this.timestamps = timestamps;
      })
    })
  }

  routeToSessionAudio({isMainSessionInt, sessionNumber}){
    //Only needed because the vime player doesn't properly trigger events for src changes
    this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}/sessionaudio/${isMainSessionInt}/${sessionNumber}`);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  deleteArticle(){
    this.sessionAudioService.deleteSessionAudioFile(this.sessionAudio.pk).subscribe(response => {
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

  toggleTimestampCreateState(timestampTime: number, timestampTimeInput: any){
    this.timestampCreateState = !this.timestampCreateState;

    if (this.timestampCreateState){
      this.timestamp_model = new TimestampObject();
      timestampTimeInput.value = this.timeToString(timestampTime);
      this.timestamp_model.session_audio = this.sessionAudio.pk;
    }
  }

  createTimestamp(timestampTimeInput: any, timestampNameInput: any){
    this.timestamp_model.time = this.stringToTime(timestampTimeInput.value);
    this.timestamp_model.name = timestampNameInput.value;
    this.timestampService.createTimestamp(this.timestamp_model).subscribe(timestamp => {
      this.timestamps.unshift(timestamp);
      this.timestampCreateState = false;
    }, error => console.log(error)).unsubscribe();
  }

  cancelTimestampCreateState(){
    this.timestampCreateState = false;
  }

  deleteTimestamp(timestamp: Timestamp){
    console.log(timestamp);
    this.timestampService.deleteTimestamp(timestamp.pk).subscribe(response => {
      console.log(response);
      const index: number = this.timestamps.indexOf(timestamp);
      this.timestamps.splice(index, 1);
    }).unsubscribe();
  }

  ngOnDestroy(){
    if(this.sessionAudio_subscription) this.sessionAudio_subscription.unsubscribe();
    if(this.timestamp_suscription) this.timestamp_suscription.unsubscribe();
    if(this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
