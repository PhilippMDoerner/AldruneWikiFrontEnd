import { Component, ContentChild, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { SessionAudio, SessionAudioObject } from 'src/app/models/sessionaudio';
import { Timestamp, TimestampObject } from 'src/app/models/timestamp';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';
import { SessionAudioTimestampService } from 'src/app/services/session-audio-timestamp.service';
import { SessionAudioService } from 'src/app/services/session-audio.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleMixin } from 'src/app/utils/functions/articleMixin';

@Component({
  selector: 'app-session-audio',
  templateUrl: './session-audio.component.html',
  styleUrls: ['./session-audio.component.scss']
})

export class SessionAudioComponent extends ArticleMixin implements OnInit, OnDestroy {
  constants: any = Constants;

  priorSessionAudioUrl: string;
  nextSessionAudioUrl: string;
  sessionAudioKeyControlMapping: any = {
    "Space": this.togglePlayer,
    "Enter": this.togglePlayer,
    "KeyM": this.toggleSound,
    "ArrowRight": this.seekForwards,
    "ArrowLeft": this.seekBackwards,
  }

  deleteRoute = {routeName: "sessionaudio-overview", params: {campaign: null}};

  timestamps: Timestamp[];
  createTimestampEventSubject: Subject<number> = new Subject();
  isInTimestampCreateState: boolean = false;
  
  create_timestamp_event_subscription: Subscription;

  @ContentChild("audioSource") audioSourceChild: ElementRef;
  @ViewChild("audioSource") audioSourceChild2: ElementRef;
  @ViewChild("vimePlayer") vimePlayer: any; 
  @ViewChild("playerSection") playerSection: any;

  constructor(
    route: ActivatedRoute,
    private router: Router,
    sessionAudioService: SessionAudioService,
    private timestampService: SessionAudioTimestampService,
    warnings: WarningsService,  
    routingService: RoutingService,
    globalUrlParams: GlobalUrlParamsService,
  ) { super(
      sessionAudioService,
      route,
      routingService,
      warnings,
      globalUrlParams
  ) }

  ngOnInit(): void {
    super.ngOnInit();

    this.create_timestamp_event_subscription = this.createTimestampEventSubject.subscribe(
      (timestampTime: number) => this.toggleTimestampCreateState()
    );
  }

  onArticleLoadFinished(sessionAudio: SessionAudioObject){
    super.onArticleLoadFinished(sessionAudio);

    const priorSessionAudioData: {isMainSessionInt: number, sessionNumber: number} = sessionAudio.sessionAudioNeighbours.priorSessionAudio;
    this.priorSessionAudioUrl = this.createSessionAudioUrl(priorSessionAudioData);

    const nextSessionAudioData: {isMainSessionInt: number, sessionNumber: number} = sessionAudio.sessionAudioNeighbours.nextSessionAudio;
    this.nextSessionAudioUrl = this.createSessionAudioUrl(nextSessionAudioData);
  }

  createSessionAudioUrl(sessionAudioData: {isMainSessionInt: number, sessionNumber: number}): string{
    if (
      sessionAudioData == null 
      || sessionAudioData.isMainSessionInt == null 
      || sessionAudioData.sessionNumber == null
    ){
      return null;
    }

    return this.routingService.getRoutePath('sessionaudio', {
      campaign: this.campaign.name,
      isMainSession: sessionAudioData.isMainSessionInt, 
      sessionNumber: sessionAudioData.sessionNumber
    });
  }

  getQueryParameter(params: Params): any{
    const isMainSessionInt: number = params.isMainSession;
    const sessionNumber: number = params.sessionNumber;
    return {isMainSession: isMainSessionInt, sessionNumber};
  }

  /**  Added loading timestamp data to normal article data being loaded */
  async loadArticleData(campaign: CampaignOverview, params: Params): Promise<void>{
    super.loadArticleData(campaign, params);

    this.loadSessionAudioTimestamps(campaign, params);
  }

  async loadSessionAudioTimestamps(campaign: CampaignOverview, params: Params): Promise<void>{
    const isMainSessionInt: number = params.isMainSession;
    const sessionNumber: number = params.sessionNumber;

    this.timestampService.getTimestamps(campaign.name, isMainSessionInt, sessionNumber)
      .pipe(first())
      .subscribe(
        (timestamps: TimestampObject[]) => this.timestamps = timestamps,
        error => this.routingService.routeToErrorPage(error)
      ); 
  }

  routeToSessionAudio({isMainSessionInt, sessionNumber}){
    //Only needed because the vime player doesn't properly trigger events for src changes
    const sessionAudioUrl: string = this.routingService.getRoutePath('sessionaudio', {
        isMainSession: isMainSessionInt, 
        sessionNumber: sessionNumber,
        campaign: this.campaign
      }
    );
    this.router.navigateByUrl(sessionAudioUrl);
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
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
    super.ngOnDestroy();

    if(this.create_timestamp_event_subscription) this.create_timestamp_event_subscription.unsubscribe();
  }
}
