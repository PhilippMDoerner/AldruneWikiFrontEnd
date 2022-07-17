import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { SessionAudio, SessionAudioObject } from 'src/app/models/sessionaudio';
import { SessionAudioService } from 'src/app/services/session-audio.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { first } from 'rxjs/operators';
import { WarningsService } from 'src/app/services/warnings.service';
import { RoutingService } from 'src/app/services/routing.service';
import { HttpEventType } from '@angular/common/http';
import { ArticleFormMixin } from 'src/app/utils/functions/articleFormMixin';
import { Constants, OverviewType } from 'src/app/app.constants';
import { CampaignService } from 'src/app/services/campaign.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-session-audio-update',
  templateUrl: './session-audio-update.component.html',
  styleUrls: ['./session-audio-update.component.scss']
})
export class SessionAudioUpdateComponent extends ArticleFormMixin implements OnInit {
  //Defining ArticleFormMixin Properties
  userModel: SessionAudioObject;
  serverModel: SessionAudio;
  userModelClass = SessionAudioObject;

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericDisableSelect({
      key: "session", 
      overviewType: OverviewType.Session, 
      campaign: this.campaign.name, 
      wrappers: ["session-update-wrapper"],
      disabledExpression: (selectOption: SessionAudio) => {
        const isCurrentlySelectedOption =  selectOption.pk === this.userModel.session_details?.pk;
        return selectOption.has_recording && !isCurrentlySelectedOption;
      },
      tooltipMessage: "All sessions that already have a recording are disabled.",
      warningMessage: "The session you selected already has a recording attached to it! Uploading this file will not work!",
      showWrapperLabel: false
    }),
    this.formlyService.singleFileField({key: "audio_file", label: "Audio File", required: this.isInCreateState()}),
  ];

  //Custom Properties
  isWaitingForResponse: boolean = false;
  private file_subscription: Subscription;
  fileUploadProgress: number;

  constructor(
    private formlyService: MyFormlyService,
    public audioService: SessionAudioService,
    router: Router,
    route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    campaignService: CampaignService,
    globalUrlParams: GlobalUrlParamsService,
    tokenService: TokenService,
  ) { 
    super(
      router,
      routingService,
      warnings,
      audioService,
      campaignService,
      globalUrlParams,
      route,
      tokenService,
    );
  }

  updateRouterLinks(campaignName: string, userModel: SessionAudioObject, params: Params): void {
    this.creationCancelUrl = this.routingService.getRoutePath('sessionaudio-overview', {campaign: campaignName});
    this.updateCancelUrl = this.routingService.getRoutePath("sessionaudio", {
      campaign: campaignName, 
      sessionNumber: userModel.session_details?.session_number,
      isMainSession: userModel.session_details?.is_main_session_int,
    });
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
      const file: File = this.userModel.audio_file[0] as any as File;
      const fileName = file.name.replaceAll(Constants.prologueForbiddenCharacters, "")

      observable = this.audioService.uploadFile(fileName, file);
    }

    this.file_subscription = observable.subscribe(
      (event) => this.handleFileUpload(event),
      error => this.warnings.showWarning(error)
    )
  }

  handleFileUpload(event: any){
    const uploadInProgress: boolean = event.type === HttpEventType.UploadProgress;
    const uploadFinished: boolean = event.type === HttpEventType.Response;

    if (uploadInProgress){ //Update recorded upload-progress
      this.fileUploadProgress = (event.loaded / event.total * 100)

    } else if(uploadFinished){ //Route to newly created object
      this.file_subscription.unsubscribe();
      
      if(this.isInCreateState()){
        const fileName = event.body;
        this.userModel.audio_file = fileName;
        this.articleService.create(this.userModel)
        .pipe(first())
        .subscribe(
          (sessionAudio: SessionAudio) => this.routeToSessionAudio(sessionAudio),
          error => this.warnings.showWarning(error)
        )
      } else {
        const sessionAudio: SessionAudio = event.body;
        this.routeToSessionAudio(sessionAudio);
      }

    }
  }

  routeToSessionAudio(sessionAudio: SessionAudio){
    console.log("Routing to a path for ", sessionAudio)
    const pathParams = {
      isMainSession: sessionAudio.session_details.is_main_session_int,
      sessionNumber: sessionAudio.session_details.session_number,
      campaign: this.campaign.name
    }

    this.routingService.routeToPath('sessionaudio', pathParams);
  }

  ngOnDestroy(){
    if (this.file_subscription) this.file_subscription.unsubscribe();
  }
}