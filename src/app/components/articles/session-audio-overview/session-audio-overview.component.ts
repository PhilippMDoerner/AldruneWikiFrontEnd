import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { OverviewItem } from 'src/app/models/overviewItem';
import { SessionAudio, SessionAudioObject } from 'src/app/models/sessionaudio';
import { OverviewService } from 'src/app/services/overview.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-session-audio-overview',
  templateUrl: './session-audio-overview.component.html',
  styleUrls: ['./session-audio-overview.component.scss']
})
export class SessionAudioOverviewComponent extends PermissionUtilityFunctionMixin implements OnInit {
  constants: any = Constants;

  sessionAudioFiles: OverviewItem[];

  constructor(
    private overviewService: OverviewService,
    private router: Router,
  ) { super() }

  ngOnInit(): void {
    this.overviewService.getOverviewItems('sessionaudio').pipe(first()).subscribe(
      (sessionAudioFiles: OverviewItem[]) => this.sessionAudioFiles = sessionAudioFiles,
      error => Constants.routeToErrorPage(this.router, error)
    );
  }
}
