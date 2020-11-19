import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class MapComponent implements OnInit {
  maps: OverviewItem[];
  currentMap: ExtendedMap;
  constants: any = Constants;

  parameter_subscription: Subscription;
  map_subscription: Subscription;
  overview_subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mapService: MapService,
    private overviewService: OverviewService,
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const mapName = params['name'];
      this.map_subscription = this.mapService.getMap(mapName).subscribe( map => {
        this.currentMap = map;
      })

      this.overview_subscription = this.overviewService.getOverviewItems('map').subscribe(overviewItems => {
        this.maps = overviewItems;
      })
    })
  }

  routeToMap(newMap: string){
    this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}/map/${newMap}`);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  deleteMap(){
    this.mapService.deleteMap(this.currentMap.pk).subscribe(response => {
      const nextMapName: string = (this.currentMap.pk === this.maps[0].pk) ? this.maps[0].name : this.maps[1].name;
      this.routeToMap(nextMapName);
    })
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
    if (this.map_subscription) this.map_subscription.unsubscribe();
    if (this.overview_subscription) this.overview_subscription.unsubscribe();
  }

}
