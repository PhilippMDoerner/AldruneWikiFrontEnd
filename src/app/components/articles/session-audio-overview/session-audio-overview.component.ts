import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { OverviewItem } from 'src/app/models/overviewItem';
import { SessionAudio } from 'src/app/models/sessionaudio';
import { OverviewService } from 'src/app/services/overview.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-session-audio-overview',
  templateUrl: './session-audio-overview.component.html',
  styleUrls: ['./session-audio-overview.component.scss']
})
export class SessionAudioOverviewComponent extends PermissionUtilityFunctionMixin implements OnInit, OnDestroy {
  constants: any = Constants;

  sessionAudioFiles: OverviewItem[];

  sessionaudio_subscription: Subscription;

  constructor(
    private overviewService: OverviewService,
    private router: Router, //Only used in template
  ) { super() }

  ngOnInit(): void {
    this.sessionaudio_subscription = this.overviewService.getOverviewItems('sessionaudio').subscribe(sessionAudioFiles =>{
      this.sessionAudioFiles = sessionAudioFiles;
    });
  }

  ngOnDestroy(){
    if(this.sessionaudio_subscription) this.sessionaudio_subscription.unsubscribe();
  }

}
