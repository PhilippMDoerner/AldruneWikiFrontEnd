import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { LocationObject, Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location/location.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';


@Component({
  selector: 'app-location-article-update',
  templateUrl: './location-article-update.component.html',
  styleUrls: ['./location-article-update.component.scss']
})
export class LocationArticleUpdateComponent implements OnInit {
  private parameter_subscription: Subscription;

  constants: any = Constants;

  formState: string;
  isForAssociatedObjectCreation: boolean;

  form = new FormGroup({});
  model: LocationObject;
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name"}),
    this.formlyService.genericSelect({key: "parent_location", label: "Parent Location", optionsType: "location"}),
  ];

  constructor(
    private formlyService: MyFormlyService,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;

    this.parameter_subscription = this.route.params.subscribe(params => {
      const locationName: string = params.name;
      const parentLocationName: string = params.parent_name;
      this.isForAssociatedObjectCreation = locationName && parentLocationName && this.formState === this.constants.createState;
  
      if (this.formState === this.constants.updateState){
          this.locationService.getLocation(parentLocationName, locationName).pipe(first()).subscribe(location => {
            this.model = location;
        });
      } else if (this.isForAssociatedObjectCreation) {
        this.locationService.getLocation(parentLocationName, locationName).pipe(first()).subscribe(location => {
          this.model = new LocationObject();
          this.model.parent_location = location.pk;
          this.model.parent_location_details.name = location.name;
          this.model.parent_location_details.parent_location = location.parent_location_details.name;
        });
      } else if (this.formState === this.constants.createState){
        this.model = new LocationObject();
      }
    })
  }

  onSubmit(){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.locationService.updateLocation(this.model) : this.locationService.createLocation(this.model);

    responseObservable.pipe(first()).subscribe((location: LocationObject) => {
      this.router.navigateByUrl(this.getRedirectUrl(location));
    }, error => console.log(error));
  }

  getRedirectUrl(location: LocationObject){
    if (this.formState === this.constants.updateState || this.isForAssociatedObjectCreation){
      const locationName: string = location.name;
      const parentLocationName: string = location.parent_location_details.name;
      const locationUrl: string = Constants.getRoutePath(this.router, 'location', {name: locationName, parent_name: parentLocationName})
      return locationUrl;

    } else {
      const locationOverviewUrl: string = Constants.getRoutePath(this.router, 'location-overview');
      return locationOverviewUrl;
    }
  }

  onCancel(){
    const isFormInUpdateState : boolean = (this.formState === Constants.updateState)

    if(this.isForAssociatedObjectCreation){
      Constants.routeToPath(this.router, 'location', {name: this.model.parent_location_details.name, parent_name: this.model.parent_location_details.parent_location});
    } else if (isFormInUpdateState){
      const locationName: string = this.route.snapshot.params.name;
      const parentLocationName: string = this.route.snapshot.params.parent_name;
      Constants.routeToPath(this.router, 'location', {name: locationName, parent_name: parentLocationName});
    } else {
      Constants.routeToPath(this.router, 'location-overview');
    }
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
