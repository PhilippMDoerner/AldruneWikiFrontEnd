import { Component, ContentChild, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { SessionAudio, SessionAudioObject } from 'src/app/models/sessionaudio';
import { Timestamp, TimestampObject } from 'src/app/models/timestamp';
import { RoutingService } from 'src/app/services/routing.service';
import { SessionAudioTimestampService } from 'src/app/services/session-audio-timestamp.service';
import { SessionAudioService } from 'src/app/services/session-audio.service';
import { WarningsService } from 'src/app/services/warnings.service';
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
  }

  timestamps: Timestamp[];
  createTimestampEventSubject: Subject<number> = new Subject();
  isInTimestampCreateState: boolean = false;
  
  parameter_subscription: Subscription;
  create_timestamp_event_subscription: Subscription;

  @ContentChild("audioSource") audioSourceChild: ElementRef;
  @ViewChild("audioSource") audioSourceChild2: ElementRef;
  @ViewChild("vimePlayer") vimePlayer: any; 
  @ViewChild("playerSection") playerSection: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionAudioService: SessionAudioService,
    private timestampService: SessionAudioTimestampService,
    private warnings: WarningsService,  
    public routingService: RoutingService,
  ) { super() }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const isMainSessionInt: number = params.isMainSession;
      const sessionNumber: number = params.sessionNumber;
      const campaign: string = params.campaign;

      this.sessionAudioService.readByParam(campaign, {isMainSession: isMainSessionInt, sessionNumber}).pipe(first()).subscribe(
        (sessionAudio: SessionAudioObject) => {
          this.sessionAudio = sessionAudio;
          this.priorSessionAudio = sessionAudio.sessionAudioNeighbours.priorSessionAudio;
          this.nextSessionAudio = sessionAudio.sessionAudioNeighbours.nextSessionAudio;
        }, 
        error => this.routingService.routeToErrorPage(error)
      );

      this.timestampService.getTimestamps(isMainSessionInt, sessionNumber).pipe(first()).subscribe(
        (timestamps: TimestampObject[]) => this.timestamps = timestamps,
        error => this.routingService.routeToErrorPage(error)
      )
    })

    this.create_timestamp_event_subscription = this.createTimestampEventSubject.subscribe(
      (timestampTime: number) => this.toggleTimestampCreateState()
    );
  }

  routeToSessionAudio({isMainSessionInt, sessionNumber}){
    //Only needed because the vime player doesn't properly trigger events for src changes
    const sessionAudioUrl: string = this.routingService.getRoutePath('sessionaudio', {
        isMainSession: isMainSessionInt, 
        sessionNumber: sessionNumber
      }
    );
    this.router.navigateByUrl(sessionAudioUrl);
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
  }

  deleteArticle(){
    this.sessionAudioService.delete(this.sessionAudio.pk).pipe(first()).subscribe(
      response => this.routingService.routeToPath('sessionaudio-overview'),
      error => this.warnings.showWarning(error)
    );
  }

  @HostListener('document:keydown', ["$event"]) 
  playerControls(keyPressEvent){
    if (this.keyAffectsPlayer(keyPressEvent)){
      const controlFunction: Function = this.sessionAudioKeyControlMapping[keyPressEvent.code];
      controlFunction(this.vimePlayer); //vimePlayer must be passed as an argument, as "this" doesn't work for callbacks
      keyPressEvent.preventDefault();
    }
  }

  keyAffectsPlayer(keyPressEvent): boolean{
    const isKeyPressForSearchbar: boolean = document.activeElement.id === "search";
    const isKeyPressForPlayer: boolean = !this.isInTimestampCreateState && !isKeyPressForSearchbar;

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
