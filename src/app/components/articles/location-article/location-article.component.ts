import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location/location.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';
@Component({
  selector: 'app-location-article',
  templateUrl: './location-article.component.html',
  styleUrls: ['./location-article.component.scss']
})
export class LocationArticleComponent extends PermissionUtilityFunctionMixin implements OnInit {
  constants: any = Constants;
  location: Location;
  articleType: string = 'location';

  private parameter_subscription: Subscription;

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router
  ) { super() }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const locationName: string = params['name'];
      const parentLocationName: string = params['parent_name'] ? params['parent_name'] : "None";

      this.locationService.getLocation(parentLocationName, locationName).pipe(first()).subscribe(location => {
        this.location = location;
      }, error =>{ console.log(error)});
    }, error => console.log(error));
  }

  onDescriptionUpdate(updatedDescription){
    const oldDescription = this.location.description;
    this.location.description = updatedDescription;
    this.locationService.updateLocation(this.location).pipe(first()).subscribe(location => {
    }, error =>{
      this.location.description = oldDescription;
      console.log(error);
    })
  }

  buildLocationRoute(index: number){
    const locationList: string[] = this.location.parent_location_list;
    if (!locationList) throw "Tried building a route to a location in parent_location_list when there is no parent_location_list";
    
    const locationName: string = locationList[index];
    const parentLocationName: string = (index === 0) ? "None" : locationList[index-1];

    const locationUrl: string = Constants.getRoutePath(this.router, 'location', {parent_name: parentLocationName, name: locationName});
    return locationUrl;
  }

  deleteArticle(){
      this.locationService.deleteLocation(this.location.pk).pipe(first()).subscribe(response => {
        const locationOverviewUrl: string = Constants.getRoutePath(this.router, 'location-overview');
        this.router.navigateByUrl(locationOverviewUrl);
      }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
