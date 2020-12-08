import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { MapMarker } from 'src/app/models/mapmarker';
import { MarkerService } from 'src/app/services/marker.service';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss']
})
export class MarkerComponent implements OnInit {
  constants: any = Constants;
  marker: MapMarker;

  parameter_subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private markerService: MarkerService,
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params =>{
      const parentLocationName: string = params['parent_location_name'];
      const locationName: string = params['location_name'];
      const mapName: string = params['map_name'];
      this.markerService.getMapMarker(parentLocationName, locationName, mapName).pipe(first()).subscribe(marker => {
        this.marker = marker;
      }); 
    })

  }

  deleteMarker(){
    const parentLocationName: string = this.marker.location_details.parent_location_name;
    const locationName: string = this.marker.location_details.name;

    this.markerService.deleteMapMarker(this.marker.pk).pipe(first()).subscribe(response => {
      const locationUrl: string = Constants.getRoutePath(this.router, 'location', {name: locationName, parent_name: parentLocationName});
      this.router.navigateByUrl(locationUrl);
    })
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }

}
