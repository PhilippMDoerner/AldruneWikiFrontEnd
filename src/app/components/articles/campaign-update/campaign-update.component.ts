import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { first } from 'rxjs/operators';
import { CampaignObject, CampaignOverview } from 'src/app/models/campaign';
import { CampaignService } from 'src/app/services/campaign.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleFormMixin } from 'src/app/utils/functions/articleFormMixin';

@Component({
  selector: 'app-campaign-update',
  templateUrl: './campaign-update.component.html',
  styleUrls: ['./campaign-update.component.scss']
})
export class CampaignUpdateComponent extends ArticleFormMixin {

  //Defining ArticleFormMixin Properties
  serverModel: CampaignObject;
  userModel: any;
  userModelClass = CampaignObject;
  
  updateCancelRoute = {routeName: "home2", params: {campaign: null}};
  creationCancelRoute = {routeName: "campaign-overview", params: {}};

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", isNameInput: true, required: true}),
    this.formlyService.genericInput({key: "subtitle", isNameInput: false, required: false, maxLength: 400}),
    this.formlyService.singleFileField({key: "background_image", required: true}),
    this.formlyService.singleFileField({key: "icon", required: true}),
  ]

  constructor(
    private formlyService: MyFormlyService,
    router: Router,
    routingService: RoutingService,
    warning: WarningsService,
    campaignService: CampaignService,
    route: ActivatedRoute,
    globalUrlParam: GlobalUrlParamsService,
  ) {
    super(
      router,
      routingService,
      warning,
      campaignService,
      route,
      campaignService,
      globalUrlParam,
    )
  }

  getQueryParameters(params: Params): object{
    return {name: params.campaign};
  }

  onUpdateSuccess(updatedArticle: any, self: any){
    this.routingService.routeToPath('home2', {campaign: updatedArticle.name});

    this.campaignService.campaignList().pipe(first()).subscribe(
      (campaigns: CampaignOverview[]) => this.globalUrlParam.updateCampaignSet(campaigns)
    );
  }

  onCreationSuccess(createdArticle: any, self: ArticleFormMixin){
    this.routingService.routeToPath('home2', {campaign: createdArticle.name});

    this.campaignService.campaignList().pipe(first()).subscribe(
      (campaigns: CampaignOverview[]) => this.globalUrlParam.updateCampaignSet(campaigns)
    );
  }

}
