import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { CampaignOverview } from 'src/app/models/campaign';

@Component({
  selector: 'app-session-update-wrapper',
  templateUrl: './session-update-wrapper.component.html',
  styleUrls: ['./session-update-wrapper.component.scss']
})

export class SessionUpdateWrapperComponent extends FieldWrapper{
  campaign: CampaignOverview;
  showField: boolean = true; //Needed to allow reinitializing the session field select options if its options have been updated

  constructor(
    private changeDetector: ChangeDetectorRef,
  ){
    super();
  }

  reinitializeSessionField(): void{
    this.showField = false;
    this.changeDetector.detectChanges();
    this.showField = true;
    this.changeDetector.detectChanges();
  }

}

