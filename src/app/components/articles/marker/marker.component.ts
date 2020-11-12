import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MapMarker } from 'src/app/models/mapmarker';
import { MarkerService } from 'src/app/services/marker.service';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss']
})
export class MarkerComponent implements OnInit {

  marker: MapMarker;

  marker_subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private markerService: MarkerService,
  ) { }

  ngOnInit(): void {
    const parentLocationName: string = this.route.snapshot.params['parent_location_name'];
    const locationName: string = this.route.snapshot.params['location_name'];
    const mapName: string = this.route.snapshot.params['map_name'];
    this.marker_subscription = this.markerService.getMapMarker(parentLocationName, locationName, mapName).subscribe(marker => {
      this.marker = marker;
    });
  }

  deleteMarker(){
    this.markerService.deleteMapMarker(this.marker.pk).subscribe(response => {
      const parentLocationName: string = this.route.snapshot.params['parent_location_name'];
      const locationName: string = this.route.snapshot.params['location_name'];
      const url: string = `/location/${parentLocationName}/${locationName}`;
      this.router.navigateByUrl(url);
    })
  }

  ngOnDestroy(){
    if (this.marker_subscription) this.marker_subscription.unsubscribe();
  }

}
