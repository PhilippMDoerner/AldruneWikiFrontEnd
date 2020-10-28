import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { EmptyFormLocation, Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location/location.service';
import { OverviewService } from 'src/app/services/overview.service';


@Component({
  selector: 'app-location-article-update',
  templateUrl: './location-article-update.component.html',
  styleUrls: ['./location-article-update.component.scss']
})
export class LocationArticleUpdateComponent implements OnInit {

  private location_subscription: Subscription;
  private parameter_subscription: Subscription;

  constants: any = Constants;
  formState: string;
  form = new FormGroup({});
  model: Location | EmptyFormLocation;
  fields: FormlyFieldConfig[] = [
    {
      key: "name",
      type: "input",
      templateOptions:{
        label: "Name"
      }
    },
    {
      key: "parent_location",
      type: "select",
      templateOptions:{
        label: "Parent Location",
        labelProp: "name_full",
        valueProp: "pk",
        options: this.selectOptionService.getOverviewItems('location'),
      }
    },
  ];

  constructor(
    private locationService: LocationService,
    private selectOptionService: OverviewService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;

    if (this.formState === this.constants.updateState){
      this.parameter_subscription = this.route.params.subscribe(params => {
        const locationName: string = params['name'];
        const parentLocationName: string = params['parent_name'] ? params['parent_name'] : "None";
  
        this.location_subscription = this.locationService.getLocation(parentLocationName, locationName).subscribe(location => {
          this.model = location;
        }, error =>{ this.router.navigateByUrl("error");});
      });
    } else if (this.formState === this.constants.createState) {
      this.model = new EmptyFormLocation();
    }
  }

  onSubmit(model: Location){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.locationService.updateLocation(model) : this.locationService.createLocation(model);

    responseObservable.subscribe(response => {
      console.log(response);
      this.router.navigateByUrl(`/location`);
    }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
    if (this.location_subscription) this.location_subscription.unsubscribe();
  }
}
