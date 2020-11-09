import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { OverviewService } from 'src/app/services/overview.service';
import { SessionAudio, EmptyFormSessionAudio } from 'src/app/models/sessionaudio';
import { SessionAudioService } from 'src/app/services/session-audio.service';
import { SessionAudioComponent } from '../session-audio/session-audio.component';

@Component({
  selector: 'app-session-audio-update',
  templateUrl: './session-audio-update.component.html',
  styleUrls: ['./session-audio-update.component.scss']
})
export class SessionAudioUpdateComponent implements OnInit {
  constants: any = Constants;

  private organization_subscription: Subscription;
  private parameter_subscription: Subscription;

  formState: string;

  form = new FormGroup({});
  formAudioFile: File = null;
  model: SessionAudio;
  fields: FormlyFieldConfig[] = [
    {
      key: "session",
      type: "select",
      templateOptions:{
        label: "Session",
        labelProp: "name",
        valueProp: "pk",
        options: this.selectOptionService.getOverviewItems('session'),
      }
    },
  ];

  audioFileField: FormlyFieldConfig[] = [
    {
      key: "image",
      type: "file",
      templateOptions: {
        change: (field, $event) => this.onFileSelected($event)
      },
    },
  ]

  constructor(
    private selectOptionService: OverviewService,
    private audioService: SessionAudioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;
    const organizationName: string = this.route.snapshot.params.name;

    if (this.formState === this.constants.updateState){
      this.parameter_subscription = this.route.params.subscribe(params => {
        const isMainSessionInt: number = params['isMainSession'];
        const sessionNumber: number = params['sessionNumber'];
        this.organization_subscription = this.audioService.getSessionAudioFile(isMainSessionInt, sessionNumber).subscribe(item => {
          this.model = item;
        });
      })

    } else if (this.formState === this.constants.createState) {
      this.model = new EmptyFormSessionAudio();
    } 
  }

  onFileSelected(event) {
    this.formAudioFile = event.target.files[0];
  }

  onSubmit(model: SessionAudio){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.audioService.updateSessionAudioFile(model) : this.audioService.createSessionAudioFile(model);

    responseObservable.subscribe( (sessionAudio: SessionAudio) => {
      console.log(sessionAudio);
      this.router.navigateByUrl(`/sessionaudio/${sessionAudio.session_details.is_main_session_int}/${sessionAudio.session_details.session_number}`);
    }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.organization_subscription) this.organization_subscription.unsubscribe();
  }
}