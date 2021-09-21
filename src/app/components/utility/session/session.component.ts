import { Component, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ArticleObject } from 'src/app/models/base-models';
import { CampaignOverview } from 'src/app/models/campaign';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { SessionService } from 'src/app/services/session.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { CardFormMixin } from 'src/app/utils/functions/cardMixin';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent extends CardFormMixin implements OnInit {

  diaryentryUrls: string[];
  sessionAudioUrl: string;

  cardDelete = new EventEmitter<number>()

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericCheckbox({key: "is_main_session", defaultValue: true, label: "Main Session?"}),
    this.formlyService.genericInput({key: "session_number", label: "Session Number", required: true}),
    this.formlyService.genericDatepicker({key: "session_date", label: "Day of the Session", required: true}),
    this.formlyService.genericInput({key: "start_day", label: "Start Day", required: false, isNumberInput: true}),
    this.formlyService.genericInput({key: "end_day", label: "End Day", required: false, isNumberInput: true})
  ];

  constructor(
    sessionService: SessionService,
    private formlyService: MyFormlyService,
    warnings: WarningsService,  
    private routingService: RoutingService,
    tokenService: TokenService,
    public element: ElementRef, //Allows calling this from the outside for scroll into view
    route: ActivatedRoute
  ) { 
    super(
      warnings,
      sessionService,
      route,
      tokenService
    ) 
  }

  updateDynamicVariables(campaign: CampaignOverview, articleData: any, params: Params): void{
    const diaryentries: {name: string, author_name: string}[] = articleData.diaryentries;
    this.diaryentryUrls = diaryentries.map(diaryentry => this.routingService.getRoutePath("diaryentry", {
      authorName: diaryentry.author_name,
      campaign: campaign.name,
      sessionNumber: this.cardData.session_number,
      isMainSession: this.cardData.is_main_session_int,
    }));

    this.sessionAudioUrl = this.routingService.getRoutePath("sessionaudio", {
      campaign: campaign.name,
      isMainSession: this.cardData.is_main_session_int,
      sessionNumber: this.cardData.session_number,
    });
  }
}
