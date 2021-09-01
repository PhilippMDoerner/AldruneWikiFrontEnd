import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Campaign, CampaignObject } from 'src/app/models/campaign';
import { CampaignService } from 'src/app/services/campaign.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { CardFormMixin } from 'src/app/utils/functions/cardMixin';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent extends CardFormMixin implements OnInit {
  @ViewChild('card') card: ElementRef;

  @Input() cardData: CampaignObject;

  userModel: Campaign;
  userModelClass = CampaignObject;
  serverModel: CampaignObject;

  cardDelete = new EventEmitter<number>()

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name"})
  ];


  constructor(
    warnings: WarningsService,
    campaignService: CampaignService,
    route: ActivatedRoute,
    private formlyService: MyFormlyService,
  ) { 
    super(warnings, campaignService, route);
  }
}
