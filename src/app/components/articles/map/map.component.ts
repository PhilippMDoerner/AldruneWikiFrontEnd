import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { ExtendedMap, Map } from 'src/app/models/map';
import { OverviewItem } from 'src/app/models/overviewItem';
import { MapService } from 'src/app/services/map.service';
import { OverviewService } from 'src/app/services/overview.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  maps: OverviewItem[];
  currentMap: ExtendedMap;
  constants: any = Constants;

  parameter_subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mapService: MapService,
    private overviewService: OverviewService,
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const mapName = params['name'];
      this.mapService.getMap(mapName).pipe(first()).subscribe( map => {
        this.currentMap = map;
      })

      this.overviewService.getOverviewItems('map').pipe(first()).subscribe(overviewItems => {
        this.maps = overviewItems;
      })
    })
  }

  routeToMap(newMap: string){
    const mapUrl: string = Constants.getRoutePath(this.router, 'map', {name: newMap});
    this.router.navigateByUrl(mapUrl);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {return false;};
  }

  deleteMap(){
    this.mapService.deleteMap(this.currentMap.pk).pipe(first()).subscribe(response => {
      this.routeToMap(Constants.defaultMapName);
    })
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }

}
