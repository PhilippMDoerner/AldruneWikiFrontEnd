import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Constants } from 'src/app/app.constants';
import { MapObject, Map } from 'src/app/models/map';
import { CampaignService } from 'src/app/services/campaign.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { MapService } from 'src/app/services/map.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleFormMixin } from 'src/app/utils/functions/articleFormMixin';

@Component({
  selector: 'app-map-update',
  templateUrl: './map-update.component.html',
  styleUrls: ['./map-update.component.scss']
})
export class MapUpdateComponent extends ArticleFormMixin implements OnInit {
  //Defining ArticleFormMixin Properties
  userModel: MapObject;
  serverModel: Map;
  userModelClass = MapObject;

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", isNameInput: true, required: true}),
    this.formlyService.genericInput({key: "icon", label: "Map Icon", validators: ['faPrefix'], required: false }),
    this.formlyService.singleFileField({key: "image", label: "Map Image", required: this.isInCreateState()})
  ];

  //Custom Properties


  constructor(
    private formlyService: MyFormlyService,
    mapService: MapService,
    router: Router,
    route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    campaignService: CampaignService,
    globalUrlParams: GlobalUrlParamsService,
    tokenService: TokenService,
  ) { 
    super(
      router, 
      routingService, 
      warnings, 
      mapService,
      campaignService,
      globalUrlParams,
      route,
      tokenService,
    );
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.userModel.icon = this.extractIconNameFromPath(this.userModel.icon);
  }

  extractIconNameFromPath(iconPath: string): string {
    const iconPathSections = iconPath.split("/");
    return iconPathSections[iconPathSections.length - 1];
  }

  updateRouterLinks(campaignName: string, userModel: MapObject, params: Params): void{
    this.updateCancelUrl = this.routingService.getRoutePath('map', {name: userModel.name, campaign: campaignName});
    this.creationCancelUrl = this.routingService.getRoutePath('default-map', {campaign: campaignName})
  }

  articleUpdate(userModel: MapObject): void{
    const hasMapImage: boolean = this.hasImageSelected(userModel.image);
    if (!hasMapImage) delete userModel.image;

    super.articleUpdate(userModel);
  }

  hasImageSelected(imageFieldValue: any) : boolean{
    return imageFieldValue.constructor.name === "FileList";
  }
}
