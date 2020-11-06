import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location/location.service';
@Component({
  selector: 'app-location-article',
  templateUrl: './location-article.component.html',
  styleUrls: ['./location-article.component.scss']
})
export class LocationArticleComponent implements OnInit {
  constants: any = Constants;
  location: Location;
  articleType: string = 'location';

  private location_subscription: Subscription;
  private parameter_subscription: Subscription;

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const locationName: string = params['name'];
      const parentLocationName: string = params['parent_name'] ? params['parent_name'] : "None";
      this.location_subscription = this.locationService.getLocation(parentLocationName, locationName).subscribe(location => {
        this.location = location;
      }, error =>{ console.log(error)});
    }, error => console.log(error));
  }

  onDescriptionUpdate(updatedDescription){
    const oldDescription = this.location.description;
    this.location.description = updatedDescription;
    this.locationService.updateLocation(this.location).subscribe(location => {
    }, error =>{
      this.location.description = oldDescription;
      console.log(error);
    })
  }

  deleteArticle(){
      this.locationService.deleteLocation(this.location.pk).subscribe(response => {
        this.router.navigateByUrl("/location");
      }, error => console.log(error));
  }

  addSublocation(){
    console.log("Totally add a sublocation, link to the creation form there with some pre-filled stuff");
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
    if (this.location_subscription) this.location_subscription.unsubscribe();
  }
}
