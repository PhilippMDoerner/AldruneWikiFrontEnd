import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { first } from 'rxjs/operators';
import { OverviewType } from 'src/app/app.constants';
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
    this.formlyService.genericSelect({key: "default_map", label: "Default Map", valueProp: "pk", overviewType: OverviewType.Map, campaign: this.campaign}),
    this.formlyService.singleFileField({key: "background_image", required: true}),
    this.formlyService.singleFileField({key: "icon", required: true}),
  ];

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
    console.log(this)
    return {name: params.campaign};
  }

  /**
   * Preprocesses the usermodel a bit before sending out the patch request. This is solely so that this doesn't accidentally
   * update the image fields if there are no new files attached.
   */
  articleUpdate(userModel: CampaignObject): void{
    const hasNewIcon: boolean = this.hasImageSelected(userModel.icon);
    if (!hasNewIcon) delete userModel.icon;

    const hasNewBackgroundImage: boolean = this.hasImageSelected(userModel.background_image);
    if (!hasNewBackgroundImage) delete userModel.background_image;

    super.articleUpdate(userModel);
  }

  hasImageSelected(imageFieldValue: any) : boolean{
    return imageFieldValue.constructor.name === "FileList";
  }

  onUpdateSuccess(updatedArticle: any, self: any){
    this.routingService.routeToPath('campaign-admin', {campaign: updatedArticle.name});

    this.globalUrlParam.autoUpdateCampaignSet();
  }

  async onCreationSuccess(createdArticle: any, self: ArticleFormMixin){
    await this.globalUrlParam.autoUpdateCampaignSet();
    this.routingService.routeToPath('campaign-admin', {campaign: createdArticle.name});
  }

}
