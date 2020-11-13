import { Component, ContentChild, ContentChildren, ElementRef, OnInit, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { SessionAudio } from 'src/app/models/sessionaudio';
import { EmptyFormTimestamp, Timestamp } from 'src/app/models/timestamp';
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
  timestamp_model: EmptyFormTimestamp = new EmptyFormTimestamp();
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

  ngAfterViewInit(){
    console.log(this.audioSourceChild);
    console.log(this.audioSourceChild2);
  }

  routeToSessionAudio({isMainSessionInt, sessionNumber}){
    //Only needed because the vime player doesn't properly trigger events for src changes
    this.router.navigateByUrl(`sessionaudio/${isMainSessionInt}/${sessionNumber}`);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  deleteArticle(){
    this.sessionAudioService.deleteSessionAudioFile(this.sessionAudio.pk).subscribe(response => {
      this.router.navigateByUrl("/sessionaudio");
    }, error => console.log(error));
  }

  reloadPlayer(audioSource){
    console.log("Reload");
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

  toggleTimestampCreateState(){
    this.timestampCreateState = !this.timestampCreateState;
    if (this.timestampCreateState) this.timestamp_model = new EmptyFormTimestamp();
  }

  createTimestamp(){
    this.timestampService.createTimestamp(this.timestamp_model).subscribe(timestamp => {
      this.timestamps.unshift(timestamp);
      this.timestamp_model = new EmptyFormTimestamp();
      this.timestampCreateState = false;
    }).unsubscribe();
  }

  cancelTimestampCreateState(){
    this.timestampCreateState = false;
  }

  deleteTimestamp(timestamp: Timestamp){
    this.timestampService.deleteTimestamp(timestamp.pk).subscribe(response => {
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
