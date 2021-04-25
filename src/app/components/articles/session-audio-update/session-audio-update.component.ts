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
import { HttpEvent, HttpEventType, HttpUploadProgressEvent } from '@angular/common/http';
import { ArticleFormMixin } from 'src/app/utils/functions/articleFormMixin';

@Component({
  selector: 'app-session-audio-update',
  templateUrl: './session-audio-update.component.html',
  styleUrls: ['./session-audio-update.component.scss']
})
export class SessionAudioUpdateComponent extends ArticleFormMixin implements OnInit {
  //Defining ArticleFormMixin Properties
  userModel: SessionAudioObject;
  serverModel: SessionAudio;
  updateCancelRoute = {routeName: "sessionaudio", params: {isMainSession: null, sessionNumber: null}};
  creationCancelRoute = {routeName: "sessionaudio-overview", params: {}};

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericSelect({key: "session", optionsType: "session", wrappers: ["session-update-wrapper"]}),
    this.formlyService.singleFileField({key: "audio_file", label: "Audio File", required: this.isInCreateState()}),
  ];

  //Custom Properties
  isWaitingForResponse: boolean = false;
  private parameter_subscription: Subscription;
  private file_subscription: Subscription;
  fileUploadProgress: number;

  constructor(
    private formlyService: MyFormlyService,
    audioService: SessionAudioService,
    router: Router,
    private route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
  ) { 
    super(
      router,
      routingService,
      warnings,
      audioService
    )
  }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      if (this.isInUpdateState()){
        const isMainSessionInt: number = params['isMainSession'];
        const sessionNumber: number = params['sessionNumber'];

        //Update Cancel Route Params
        this.updateCancelRoute.params.isMainSession = isMainSessionInt;
        this.updateCancelRoute.params.sessionNumber = sessionNumber;

        //Get SessionAudioObject
        this.articleService.readByParam({isMainSession: isMainSessionInt, sessionNumber}).pipe(first()).subscribe(
          (sessionAudio: SessionAudioObject) => this.userModel = sessionAudio,
          error => this.routingService.routeToErrorPage(error)
        );

      } else if (this.isInCreateState()) {
        this.userModel = new SessionAudioObject();
      } 
    })

  }

  onSubmit(){ //Allow for put requests
    //If you're not uploading a file, just send a patch request
    const skipFileUpload: boolean = this.userModel.audio_file.constructor.name.toLowerCase() === "string";
    if((this.isInUpdateState() || this.isInOutdatedUpdateState()) && skipFileUpload){
      //Remove audio file to not overwrite this piece of data later
      delete this.userModel.audio_file;
      this.articleService.patch(this.userModel.pk, this.userModel).pipe(first()).subscribe(
        (sessionAudio: SessionAudioObject) => this.routeToSessionAudio(sessionAudio),
        error => this.warnings.showWarning(error)
      );
      return;
    }

    //If you are uploading a file, send a put/post request depending on if you're updating/creating an entry
    let observable: Observable<any>;
    if(this.isInUpdateState()){
      observable = this.articleService.update(this.userModel.pk, this.userModel);
    } else {
      observable = this.articleService.create(this.userModel);
    }

    this.file_subscription = observable.subscribe(
      (event) => this.handleFileUpload(event),
      error => this.warnings.showWarning(error)
    )
  }

  handleFileUpload(event: any){
    const uploadInProgress: boolean = event.type === HttpEventType.UploadProgress;
    const uploadFinished: boolean = event.type === HttpEventType.Response;
    // console.log("handleFileUpload");
    // console.log(event);
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