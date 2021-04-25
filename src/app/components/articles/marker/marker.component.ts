import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { MapMarker, MapMarkerObject } from 'src/app/models/mapmarker';
import { MarkerService } from 'src/app/services/marker.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss']
})
export class MarkerComponent implements OnInit {
  constants: any = Constants;
  marker: MapMarkerObject;

  parameter_subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private markerService: MarkerService,
    private warnings: WarningsService,  
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params =>{
      const parentLocationName: string = params['parent_location_name'];
      const locationName: string = params['location_name'];
      const mapName: string = params['map_name'];
      this.markerService.readByParam({parentLocationName, locationName, mapName}).pipe(first()).subscribe(
        (marker: MapMarkerObject) => this.marker = marker,
        error => this.routingService.routeToErrorPage(error)
      ); 
    })

  }

  deleteMarker(){
    const parentLocationName: string = this.marker.location_details.parent_location_name;
    const locationName: string = this.marker.location_details.name;

    this.markerService.delete(this.marker.pk).pipe(first()).subscribe(
      response =>  this.routingService.routeToPath('location', {
          name: locationName, 
          parent_name: parentLocationName
        }
      ),
      error => this.warnings.showWarning(error)
    )
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }

}
