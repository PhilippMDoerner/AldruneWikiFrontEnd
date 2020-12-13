import { Component, ContentChild, ContentChildren, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { SessionAudio, SessionAudioObject } from 'src/app/models/sessionaudio';
import { Timestamp } from 'src/app/models/timestamp';
import { SessionAudioTimestampService } from 'src/app/services/session-audio-timestamp.service';
import { SessionAudioService } from 'src/app/services/session-audio.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';


@Component({
  selector: 'app-session-audio',
  templateUrl: './session-audio.component.html',
  styleUrls: ['./session-audio.component.scss']
})

export class SessionAudioComponent extends PermissionUtilityFunctionMixin implements OnInit, OnDestroy {
  constants: any = Constants;

  sessionAudio: SessionAudio;
  priorSessionAudio: {isMainSessionInt: number, sessionNumber: number};
  nextSessionAudio: {isMainSessionInt: number, sessionNumber: number};
  sessionAudioKeyControlMapping: any = {
    "Space": this.togglePlayer,
    "Enter": this.togglePlayer,
    "KeyM": this.toggleSound,
    "ArrowRight": this.seekForwards,
    "ArrowLeft": this.seekBackwards,
    "ArrowUp": this.increaseSound,
    "ArrowDown": this.decreaseSound
  }

  timestamps: Timestamp[];
  createTimestampEventSubject: Subject<number> = new Subject();
  isInTimestampCreateState: boolean = false;
  
  parameter_subscription: Subscription;
  create_timestamp_event_subscription: Subscription;

  @ContentChild("audioSource") audioSourceChild: ElementRef;
  @ViewChild("audioSource") audioSourceChild2: ElementRef;
  @ViewChild("vimePlayer") vimePlayer: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionAudioService: SessionAudioService,
    private timestampService: SessionAudioTimestampService,
    ) { super() }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const isMainSessionInt: number = params.isMainSession;
      const sessionNumber: number = params.sessionNumber;

      this.sessionAudioService.getSessionAudioFile(isMainSessionInt, sessionNumber).pipe(first()).subscribe((sessionAudio: SessionAudioObject) => {
        this.sessionAudio = sessionAudio;
        this.priorSessionAudio = sessionAudio.sessionAudioNeighbours.priorSessionAudio;
        this.nextSessionAudio = sessionAudio.sessionAudioNeighbours.nextSessionAudio;
      }, error => console.log(error));

      this.timestampService.getTimestamps(isMainSessionInt, sessionNumber).pipe(first()).subscribe(timestamps => {
        this.timestamps = timestamps;
      })
    })

    this.create_timestamp_event_subscription = this.createTimestampEventSubject.subscribe((timestampTime: number) => {
      this.toggleTimestampCreateState();
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
      const sessionAudioOverviewUrl = Constants.getRoutePath(this.router, 'sessionaudio-overview');
      this.router.navigateByUrl(sessionAudioOverviewUrl);
    }, error => console.log(error));
  }

  @HostListener('document:keydown', ["$event"]) 
  playerControls(keyPressEvent){
    if (this.keyAffectsPlayer(keyPressEvent)){
      const controlFunction: Function = this.sessionAudioKeyControlMapping[keyPressEvent.code];
      controlFunction(this.vimePlayer);
      keyPressEvent.preventDefault();
    }
  }

  keyAffectsPlayer(keyPressEvent): boolean{
    const isKeyPressForPlayer: boolean = !this.isInTimestampCreateState;
    const keyHasControlMapping: boolean = this.sessionAudioKeyControlMapping.hasOwnProperty(keyPressEvent.code);
    return isKeyPressForPlayer && keyHasControlMapping;
  }

  toggleTimestampCreateState(): void{
    this.isInTimestampCreateState = !this.isInTimestampCreateState;
  }

  // Player Control functions
  togglePlayer(vimePlayer: any){
    if (vimePlayer.playing) vimePlayer.pause();
    else vimePlayer.play();
  }

  toggleSound(vimePlayer: any){
    vimePlayer.muted = !vimePlayer.muted;
  }

  seekForwards(vimePlayer: any): void{
    let nextTime: number = vimePlayer.currentTime + 5;

    if (nextTime > vimePlayer.duration){
      nextTime = vimePlayer.duration;
    } else if (nextTime < 0){
      nextTime = 0;
    }

    vimePlayer.currentTime = nextTime;
  }

  seekBackwards(vimePlayer: any): void{
    let nextTime: number = vimePlayer.currentTime - 5;

    if (nextTime > vimePlayer.duration){
      nextTime = vimePlayer.duration;
    } else if (nextTime < 0){
      nextTime = 0;
    }

    vimePlayer.currentTime = nextTime;
  }

  increaseSound(vimePlayer: any): void{
    const nextVolume = vimePlayer.volume + 5;
    if (nextVolume > 100) vimePlayer.volume = 100;
    else vimePlayer.volume = nextVolume;
  }

  decreaseSound(vimePlayer: any): void{
    const nextVolume = vimePlayer.volume - 5;
    if (nextVolume < 0) vimePlayer.volume = 0;
    else vimePlayer.volume = nextVolume;
  }

  ngOnDestroy(){
    if(this.parameter_subscription) this.parameter_subscription.unsubscribe();
    if(this.create_timestamp_event_subscription) this.create_timestamp_event_subscription.unsubscribe();
  }
}
