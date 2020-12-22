import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { SessionAudio, SessionAudioObject } from 'src/app/models/sessionaudio';
import { SessionAudioService } from 'src/app/services/session-audio.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { first } from 'rxjs/operators';
import { WarningsService } from 'src/app/services/warnings.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-session-audio-update',
  templateUrl: './session-audio-update.component.html',
  styleUrls: ['./session-audio-update.component.scss']
})
export class SessionAudioUpdateComponent implements OnInit {
  constants: any = Constants;

  private parameter_subscription: Subscription;

  formState: string;

  form = new FormGroup({});
  model: SessionAudio;
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericSelect({key: "session", optionsType: "session", wrappers: ["session-update-wrapper"]}),
    this.formlyService.singleFileField({key: "audio_file", label: "Audio File"}),
  ];

  constructor(
    private formlyService: MyFormlyService,
    private audioService: SessionAudioService,
    private router: Router,
    private route: ActivatedRoute,
    private warnings: WarningsService,  
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? Constants.updateState : Constants.createState;

    this.parameter_subscription = this.route.params.subscribe(params => {
      if (this.formState === Constants.updateState){
        const isMainSessionInt: number = params['isMainSession'];
        const sessionNumber: number = params['sessionNumber'];
        this.audioService.getSessionAudioFile(isMainSessionInt, sessionNumber).pipe(first()).subscribe(
          (sessionAudio: SessionAudioObject) => this.model = sessionAudio,
          error => this.routingService.routeToErrorPage(error)
        );

      } else if (this.formState === Constants.createState) {
        this.model = new SessionAudioObject();
      } 
    })

  }

  onSubmit(){
    const isFormInUpdateState: boolean = (this.formState === Constants.updateState);

    const responseObservable: Observable<SessionAudioObject> =  isFormInUpdateState ? this.audioService.updateSessionAudioFile(this.model) : this.audioService.createSessionAudioFile(this.model);
    responseObservable.pipe(first()).subscribe( 
      (sessionAudio: SessionAudioObject) => this.routingService.routeToApiObject(sessionAudio),
      error => this.warnings.showWarning(error)
    );
  }

  onCancel(){
    const isFormInUpdateState : boolean = (this.formState === Constants.updateState)
    if (isFormInUpdateState){
      this.routingService.routeToPath('sessionaudio', {
        isMainSession: this.route.snapshot.params.isMainSession,
        sessionNumber: this.route.snapshot.params.sessionNumber
      });
    } else {
      this.routingService.routeToPath('sessionaudio-overview');
    } 
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}