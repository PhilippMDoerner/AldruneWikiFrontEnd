import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { ExtendedMap, MapObject } from 'src/app/models/map';
import { OverviewItemObject } from 'src/app/models/overviewItem';
import { MapService } from 'src/app/services/map.service';
import { OverviewService } from 'src/app/services/overview.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { animateElement } from 'src/app/utils/functions/animationDecorator';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  maps: OverviewItemObject[];
  currentMap: ExtendedMap;
  constants: any = Constants;

  isInitialAnimationFinished: boolean = false;
  //Must be ViewChildren instead of ViewChild. Otherwise the Element is not loaded in ngAfterViewInit.
  //That is because the ngIf on <article> leads to the element not being loaded in time, see the following link
  // https://stackoverflow.com/questions/34947154/angular-2-viewchild-annotation-returns-undefined
  @ViewChildren('mapChoice') mapChoice: QueryList<any>;

  @ViewChild('mapMainCard') mapMainCard: ElementRef;

  parameter_subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mapService: MapService,
    private overviewService: OverviewService,
    private warnings: WarningsService,  
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const mapName = params['name'];
      this.mapService.getMap(mapName).pipe(first()).subscribe( 
        (map: MapObject) => this.currentMap = map,
        error => this.routingService.routeToErrorPage(error)
      );

      this.overviewService.getOverviewItems('map').pipe(first()).subscribe(
        (overviewItems: OverviewItemObject[]) => this.maps = overviewItems,
        error => this.routingService.routeToErrorPage(error)
      );
    })
  }

  ngAfterViewInit(){
    this.mapChoice.changes.pipe(first()).subscribe((components: QueryList<any>) =>{
      this.setInitialMapChoiceValue();
    })

    animateElement(this.mapMainCard.nativeElement, 'zoomIn');
  }

  setInitialMapChoiceValue(): void{
    const currentMap: string = this.route.snapshot.params.name;
    const currentMapIndex = this.getMapOptionIndex(currentMap);
    const mapChoiceElement = this.getMapChoiceElement();
    mapChoiceElement.selectedIndex = currentMapIndex;
  }

  getMapChoiceElement(): any{
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
    const mapUrl: string = this.routingService.getRoutePath('map', {name: newMap});
    this.router.navigateByUrl(mapUrl);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {return false;};
  }

  onMapChange(event){
    const newMap: string = event.target.value;
    this.routeToMap(newMap);
  }

  deleteMap(){
    this.mapService.deleteMap(this.currentMap.pk).pipe(first()).subscribe(
      response => this.routeToMap(Constants.defaultMapName),
      error => this.warnings.showWarning(error)
    );
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }

}
