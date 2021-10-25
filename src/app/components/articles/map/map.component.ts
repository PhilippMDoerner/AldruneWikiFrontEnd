import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
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
  //URLs
  createMapUrl: string;
  homeUrl: string;
  updateMapUrl: string;

  //ArticleMixin Variables
  articleData: ExtendedMap;
  deleteRoute = {routeName: "character-overview", params: {campaign: null}}

  //Custom Variables
  maps: OverviewItemObject[];

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

  async ngOnInit(){
    this.campaign = this.route.snapshot.data["campaign"];

    const mapPageData: {mapData: MapObject, maps: OverviewItemObject[]} = this.route.snapshot.data["article"];
    this.articleData = mapPageData.mapData;
    this.maps =  mapPageData.maps;

    this.updateDynamicVariables(this.campaign, this.articleData, null);
  }

  updateDynamicVariables(campaign: CampaignOverview, articleData: ExtendedMap, params: Params): void{
    this.createMapUrl = this.routingService.getRoutePath('map-create', {campaign: campaign.name});
    this.homeUrl = this.routingService.getRoutePath('home1', {campaign: campaign.name});
    this.updateMapUrl = this.routingService.getRoutePath("map-update", {campaign:campaign.name, name: articleData?.name});
  }

  ngAfterViewInit(){
    super.ngAfterViewInit();
    this.setInitialMapChoiceValue();
  }

  setInitialMapChoiceValue(): void{
    const queryParameters: Params = this.route.snapshot.params;
    let currentMapName: string = queryParameters.name;
    if (currentMapName == null) currentMapName = this.campaign.default_map_details?.name;
    if (currentMapName == null) return;

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

  /**
   * @description: Routes to a given map. This is being done using window.location.replace, NOT with routeToPath
   * EXPLANATION: RouteToPath comes with an error. If you route and use resolvers, then somehow new data is being loaded
   * and used in the JS side of things, but the HTML is not made to comply with that.
   * This results in the leafletMapDiv still being there when the new leafletMap object is being created.
   * The way leaflet works is, it associates a pre-existing HTML Element with the leafletMap object (under "_container").
   * However, the HTML Element it finds is not empty, instead it is full of data of an already existing map.
   * Leaflet proceeds to throw an error in that case, "map container is already initialized"
   * The issue is, you can't just remove the map. If you remove the map when the page unloads, the leaflet map object 
   * that gets created on the next page load gets associated with the HTML you just removed (WTF!?). At that point your displayed
   * HTML is an empty map and your associated HTML is not in your DOM and only in RAM.
   * 
   * If you directly remove the HTMLElement you get something working, but somehow the leaflet map itself then starts behaving
   * wonky, as if the center of the map had shifted 50% to the left.
   */
  routeToMap(newMap: string){
    const mapUrl = this.routingService.getRoutePath('map', {name: newMap, campaign: this.campaign.name});
    window.location.replace(mapUrl);
  }

  onMapChange(event){
    const newMap: string = event.target.value;
    this.routeToMap(newMap);
  }

  deleteMap(){
    this.articleService.delete(this.articleData.pk).pipe(first()).subscribe(
      response => {
        const mapIndex: number = this.maps.findIndex((map: OverviewItemObject) => this.articleData.name === map.name);
        this.maps.splice(mapIndex, 1);

        const fallbackMapName: string = this.getSecondaryMapChoice();
        if (fallbackMapName != null){
          this.routeToMap(fallbackMapName);
        } else {
          this.routingService.routeToPath("default-map", {campaign: this.campaign.name});
        }
      },
      error => this.warnings.showWarning(error)
    );
  }

  getSecondaryMapChoice(): string{
    if (this.maps.length === 0) return;

    const campaignDefaultMapName: string = this.campaign.default_map_details?.name;
    if(campaignDefaultMapName != null) return campaignDefaultMapName

    const firstMapName: string = this.maps[0].name;
    return firstMapName;
  }

}
