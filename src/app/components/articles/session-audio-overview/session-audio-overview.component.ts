import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants, OverviewType } from 'src/app/app.constants';
import { OverviewItem } from 'src/app/models/overviewItem';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { OverviewService } from 'src/app/services/overview.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { animateElement } from 'src/app/utils/functions/animationDecorator';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-session-audio-overview',
  templateUrl: './session-audio-overview.component.html',
  styleUrls: ['./session-audio-overview.component.scss']
})
export class SessionAudioOverviewComponent extends PermissionUtilityFunctionMixin implements OnInit, AfterViewInit {
  constants: any = Constants;
  campaign: string = this.route.snapshot.params.campaign;

  sessionAudioFiles: OverviewItem[];

  @ViewChild('overviewMainCard') articleElement: ElementRef;

  constructor(
    private overviewService: OverviewService,
    public routingService: RoutingService,
    route: ActivatedRoute,
    tokenService: TokenService,
  ) { 
    super(tokenService, route);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.campaign = params.campaign;

      this.overviewService.getCampaignOverviewItems(this.campaign, OverviewType.Sessionaudio)
        .pipe(first())
        .subscribe(
          (sessionAudioFiles: OverviewItem[]) => this.sessionAudioFiles = sessionAudioFiles,
          error => this.routingService.routeToErrorPage(error)
        );      
    });
  }

  ngAfterViewInit(): void{
    if(!this.articleElement?.nativeElement) return;
    animateElement(this.articleElement.nativeElement, 'fadeIn');
  }
}
