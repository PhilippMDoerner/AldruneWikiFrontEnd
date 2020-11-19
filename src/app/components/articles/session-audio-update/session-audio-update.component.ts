import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { SessionAudio, SessionAudioObject } from 'src/app/models/sessionaudio';
import { SessionAudioService } from 'src/app/services/session-audio.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';

@Component({
  selector: 'app-session-audio-update',
  templateUrl: './session-audio-update.component.html',
  styleUrls: ['./session-audio-update.component.scss']
})
export class SessionAudioUpdateComponent implements OnInit {
  constants: any = Constants;

  private sessionaudio_subscription: Subscription;
  private parameter_subscription: Subscription;

  formState: string;

  form = new FormGroup({});
  model: SessionAudio;
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericSelect({key: "session", optionsType: "session"}),
    this.formlyService.singleFileField({key: "audio_file", label: "Audio File"}),
  ];

  constructor(
    private formlyService: MyFormlyService,
    private audioService: SessionAudioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;

    if (this.formState === this.constants.updateState){
      const isMainSessionInt: number = this.route.snapshot.params['isMainSession'];
      const sessionNumber: number = this.route.snapshot.params['sessionNumber'];
      this.sessionaudio_subscription = this.audioService.getSessionAudioFile(isMainSessionInt, sessionNumber).subscribe(item => {
        this.model = item;
      });
    } else if (this.formState === this.constants.createState) {
      this.model = new SessionAudioObject();
    } 
  }

  onSubmit(){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);

    const responseObservable: any =  isFormInUpdateState ? this.audioService.updateSessionAudioFile(this.model) : this.audioService.createSessionAudioFile(this.model);
    responseObservable.subscribe( (sessionAudio: SessionAudio) => {
      this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}/sessionaudio/${sessionAudio.session_details.is_main_session_int}/${sessionAudio.session_details.session_number}`);
    }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.sessionaudio_subscription) this.sessionaudio_subscription.unsubscribe();
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}