import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Campaign, CampaignObject } from 'src/app/models/campaign';
import { CampaignService } from 'src/app/services/campaign.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent extends PermissionUtilityFunctionMixin implements OnInit {
  campaigns: Campaign[];

  formState: string;

  constructor(
    private campaignService: CampaignService,
    private warnings: WarningsService,
    route: ActivatedRoute,
    tokenService: TokenService,
  ) { 
    super(tokenService, route);
  }

  ngOnInit(): void {
    this.campaignService.list().pipe(first()).subscribe(
      campaigns => this.campaigns = campaigns,
      error => this.warnings.showWarning(error)
    );
  }

  addCampaign(){
    const newCampaign = new CampaignObject();
    newCampaign.name = "New Rule";
    this.campaigns.push(newCampaign);
  }

  isInCreateState(): boolean{
    return this.formState === Constants.createState;
  }

  isInUpdateState(): boolean{
      return this.formState === Constants.updateState;
  }

  isInOutdatedUpdateState(): boolean{
      return this.formState === Constants.outdatedUpdateState;
  }

  isInDisplayState(): boolean{
      return this.formState === Constants.displayState;
  }

  toggleCreateState(){
    this.formState = this.isInDisplayState() ? Constants.createState : Constants.displayState;
  }
}
