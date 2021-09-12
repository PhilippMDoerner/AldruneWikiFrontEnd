import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { ExtendedMap, MapObject } from 'src/app/models/map';
import { OverviewItemObject } from 'src/app/models/overviewItem';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { MapService } from 'src/app/services/map.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleMixin } from 'src/app/utils/functions/articleMixin';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends ArticleMixin implements OnInit, OnDestroy {
  //ArticleMixin Variables
  articleData: ExtendedMap;
  deleteRoute = {routeName: "character-overview", params: {campaign: null}}

  //Custom Variables
  maps: OverviewItemObject[];

  isInitialAnimationFinished: boolean = false;
  //Must be ViewChildren instead of ViewChild. Otherwise the Element is not loaded in ngAfterViewInit.
  //That is because the ngIf on <article> leads to the element not being loaded in time, see the following link
  // https://stackoverflow.com/questions/34947154/angular-2-viewchild-annotation-returns-undefined
  @ViewChildren('mapChoice') mapChoice: QueryList<any>;

  constructor(
    public route: ActivatedRoute,
    mapService: MapService,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    globalUrlParams: GlobalUrlParamsService,
    tokenService: TokenService,
  ) { 
    super(
      mapService,
      route,
      routingService,
      warnings,
      globalUrlParams,
      tokenService,
    )
  }

  async loadArticleData(campaign: CampaignOverview, params: Params): Promise<void>{
    super.loadArticleData(campaign, params);

    const hasYetToLoadMapsForOverview = this.maps == null;
    if(!hasYetToLoadMapsForOverview) return;

    this.articleService.campaignList(this.campaign.name)
      .pipe(first())
      .subscribe(
        (campaignMaps: OverviewItemObject[]) => this.maps = campaignMaps,
        error => this.routingService.routeToErrorPage(error)
      );
  }

  getQueryParameter(params: Params): any {
    const mapParameters: {name: string} = super.getQueryParameter(params);
    if (mapParameters.name == null) mapParameters.name = this.campaign.default_map_details.name;

    return mapParameters;
  }

  ngAfterViewInit(){
    this.mapChoice.changes
      .pipe(first())
      .subscribe((components: QueryList<any>) => this.setInitialMapChoiceValue());
  }

  setInitialMapChoiceValue(): void{
    const queryParameters: Params = this.route.snapshot.params;
    let currentMapName: string = queryParameters.name;
    if (currentMapName == null) currentMapName = this.campaign.default_map_details.name;

    const currentMapIndex: number = this.getMapOptionIndex(currentMapName);
    const mapChoiceElement = this.getMapChoiceElement();
    mapChoiceElement.selectedIndex = currentMapIndex;
  }

  getMapChoiceElement(): any{ //HTMLElement
    return this.mapChoice.first.nativeElement;
  }

  getMapOptionIndex(mapName: string): number{
    const options: HTMLOptionsCollection = this.getMapChoiceElement().options;
    for (let i: number=0; i<options.length; i++){
      const option: HTMLOptionElement = options[i];
      if (option.value === mapName) return i
    }

    throw `${mapName} is not a valid map name. There is no map with this name on the page!`;
  }

  routeToMap(newMap: string){
    this.routingService.routeToPath('map', {name: newMap, campaign: this.campaign.name});
  }

  onMapChange(event){
    const newMap: string = event.target.value;
    this.routeToMap(newMap);
  }

  deleteMap(){
    this.articleService.delete(this.articleData.pk).pipe(first()).subscribe(
      response => this.routeToMap(Constants.defaultMapName),
      error => this.warnings.showWarning(error)
    );
  }

}
