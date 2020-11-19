import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
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
  private location_subscription: Subscription;
  private parameter_subscription: Subscription;
  private parent_location_subscription: Subscription;

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
    const locationName: string = this.route.snapshot.params.name;
    const parentLocationName: string = this.route.snapshot.params.parent_name;
    this.isForAssociatedObjectCreation = locationName && parentLocationName && this.formState === this.constants.createState;

    if (this.formState === this.constants.updateState){
        this.location_subscription = this.locationService.getLocation(parentLocationName, locationName).subscribe(location => {
          this.model = location;
      });
    } else if (this.isForAssociatedObjectCreation) {
      this.parent_location_subscription = this.locationService.getLocation(parentLocationName, locationName).subscribe(location => {
        this.model = new LocationObject();
        this.model.parent_location = location.pk;
      });
    } else if (this.formState === this.constants.createState){
      this.model = new LocationObject();
    }
  }

  onSubmit(model: Location){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.locationService.updateLocation(model) : this.locationService.createLocation(model);

    responseObservable.subscribe(response => {
      this.router.navigateByUrl(this.getRedirectUrl());
    }, error => console.log(error));
  }

  getRedirectUrl(){
    if (this.formState === this.constants.updateState){
      return `..`;
    } else if(this.isForAssociatedObjectCreation){
      const newLocationParentName: string = this.route.snapshot.params.name;
      return `${Constants.wikiUrlFrontendPrefix}/location/${newLocationParentName}/${this.model.name}`;
    } else {
      return `${Constants.wikiUrlFrontendPrefix}/location`;
    }
  }

  ngOnDestroy(){
    //TODO: Replace this form of unsubscription by using "pipe" on Observable above and using the first() 
    // method (see https://stackoverflow.com/questions/40019177/immediately-unsubscribing-from-rxjs-observable for reference)
    // Do so for all views
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
    if (this.location_subscription) this.location_subscription.unsubscribe();
    if (this.parent_location_subscription) this.parent_location_subscription.unsubscribe();
  }
}
