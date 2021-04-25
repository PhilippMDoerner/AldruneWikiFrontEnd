import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { SessionAudio, SessionAudioObject } from 'src/app/models/sessionaudio';
import { SessionAudioService } from 'src/app/services/session-audio.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { first } from 'rxjs/operators';
import { WarningsService } from 'src/app/services/warnings.service';
import { RoutingService } from 'src/app/services/routing.service';
import { HttpEvent, HttpEventType, HttpUploadProgressEvent } from '@angular/common/http';

@Component({
  selector: 'app-session-audio-update',
  templateUrl: './session-audio-update.component.html',
  styleUrls: ['./session-audio-update.component.scss']
})
export class SessionAudioUpdateComponent implements OnInit {
  constants: any = Constants;

  isWaitingForResponse: boolean = false;
  private parameter_subscription: Subscription;
  private file_subscription: Subscription;

  fileUploadProgress: number;

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
        this.audioService.readByParam({isMainSession: isMainSessionInt, sessionNumber}).pipe(first()).subscribe(
          (sessionAudio: SessionAudioObject) => this.model = sessionAudio,
          error => this.routingService.routeToErrorPage(error)
        );

      } else if (this.formState === Constants.createState) {
        this.model = new SessionAudioObject();
      } 
    })

  }

  onSubmit(){ //TODO: Make this work also for file updates. There's some kind of issue with that on the session-audio-upload service with the put method
    console.log("Submitted File")
    const isFormInUpdateState: boolean = (this.formState === Constants.updateState);
    if(isFormInUpdateState){
      console.log("Updating File");
      const updateObservable = this.audioService.update(this.model.pk, this.model);
      updateObservable.pipe(first()).subscribe(
        (sessionAudio: SessionAudio) => this.routeToSessionAudio(sessionAudio),
        error => this.warnings.showWarning(error)
      );

    } else {
      console.log("Creating File");
      const createObservable = this.audioService.create(this.model);
      this.file_subscription = createObservable.subscribe(
        (event) => this.handleFileUpload(event),
        error => this.warnings.showWarning(error)
      )
    }

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

  handleFileUpload(event: any){
    const uploadInProgress: boolean = event.type === HttpEventType.UploadProgress;
    const uploadFinished: boolean = event.type === HttpEventType.Response;
    console.log("handleFileUpload");
    console.log(event);
    if (uploadInProgress){ //Update recorded upload-progress
      this.fileUploadProgress = (event.loaded / event.total * 100)

    } else if(uploadFinished){ //Route to newly created object
      this.file_subscription.unsubscribe();
      const sessionAudio: SessionAudio = event.body;
      this.routeToSessionAudio(sessionAudio);
    }
  }

  routeToSessionAudio(sessionAudio: SessionAudio){
    const pathParams = {
      isMainSession: sessionAudio.session_details.is_main_session_int,
      sessionNumber: sessionAudio.session_details.session_number
    }

    this.routingService.routeToPath('sessionaudio', pathParams);
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
    if (this.file_subscription) this.file_subscription.unsubscribe();
  }
}