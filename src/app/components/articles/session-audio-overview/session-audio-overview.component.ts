import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants, OverviewType } from 'src/app/app.constants';
import { OverviewItem } from 'src/app/models/overviewItem';
import { OverviewService } from 'src/app/services/overview.service';
import { RoutingService } from 'src/app/services/routing.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-session-audio-overview',
  templateUrl: './session-audio-overview.component.html',
  styleUrls: ['./session-audio-overview.component.scss']
})
export class SessionAudioOverviewComponent extends PermissionUtilityFunctionMixin implements OnInit {
  constants: any = Constants;
  parameterSubscription: Subscription;
  campaign: string;

  sessionAudioFiles: OverviewItem[];

  constructor(
    private overviewService: OverviewService,
    public routingService: RoutingService,
    private route: ActivatedRoute
  ) { super() }

  ngOnInit(): void {
    this.parameterSubscription = this.route.params.subscribe(
      params => {
        this.campaign = params.campaign;

        this.overviewService.getOverviewItems(this.campaign, OverviewType.Sessionaudio).pipe(first()).subscribe(
          (sessionAudioFiles: OverviewItem[]) => this.sessionAudioFiles = sessionAudioFiles,
          error => this.routingService.routeToErrorPage(error)
        );
      }
    )
  }

  ngOnDestroy(): void{
    if(this.parameterSubscription) this.parameterSubscription.unsubscribe();
  }
}
