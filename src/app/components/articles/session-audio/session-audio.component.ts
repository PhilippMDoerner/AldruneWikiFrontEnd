import { Component, ContentChild, ContentChildren, ElementRef, OnDestroy, OnInit, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subject, Subscription } from 'rxjs';
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
  createTimestampEventSubject: Subject<number> = new Subject();
  
  parameter_subscription: Subscription;

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
      const sessionAudioOverviewUrl = Constants.getRoutePath(this.router, 'sessionaudio-overview');
      this.router.navigateByUrl(sessionAudioOverviewUrl);
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

  ngOnDestroy(){
    if(this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
