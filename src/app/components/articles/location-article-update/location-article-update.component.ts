import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { LocationObject, Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location/location.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleFormMixin } from 'src/app/utils/functions/articleFormMixin';


@Component({
  selector: 'app-location-article-update',
  templateUrl: './location-article-update.component.html',
  styleUrls: ['./location-article-update.component.scss']
})
export class LocationArticleUpdateComponent extends ArticleFormMixin implements OnInit {
  //Defining ArticleFormMixin Properties
  serverModel: Location;
  userModel: LocationObject;
  updateCancelRoute = {routeName: "location", params: {name: null, parent_name: null}};
  creationCancelRoute = {routeName: "location-overview", params: {}};//Only used when creating normally, not when creating item for a specific character
  
  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", isNameInput: true}),
    this.formlyService.genericSelect({key: "parent_location", label: "Parent Location", optionsType: "location", required: false}),
  ];

  //Custom properties
  private parameter_subscription: Subscription;

  constructor(
    private formlyService: MyFormlyService,
    locationService: LocationService,
    router: Router,
    private route: ActivatedRoute,
    warnings: WarningsService,  
    routingService: RoutingService,
  ) { 
    super(
      router,
      routingService,
      warnings,
      locationService
    )
  }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const locationName: string = params.name;
      const parentLocationName: string = params.parent_name;
      const campaign: string = params.campaign;

      //Update Cancel Route Params
      this.updateCancelRoute.params.name = locationName;
      this.updateCancelRoute.params.parent_name = parentLocationName;

      //Get Location
      if (this.isInUpdateState()){
          this.articleService.readByParam(campaign, {parentLocationName, locationName}).pipe(first()).subscribe(
            (location: LocationObject) => this.userModel = location,
            error => this.routingService.routeToErrorPage(error)
          );

      } else if (this.isInCreateState()){
        //Base Location model
        this.userModel = new LocationObject();
        this.userModel.parent_location = null;

        //Aditional info to user model if this is a sublocation
        if(this.isForAssociatedObjectCreation()){
          this.articleService.readByParam(campaign, {parentLocationName, locationName}).pipe(first()).subscribe(
            (location: LocationObject) => {
              this.userModel = new LocationObject();
              this.userModel.parent_location = location.pk;
              this.userModel.parent_location_details = {
                pk: location.pk,
                name: location.name,
                parent_location: location.parent_location_details.name,
                name_full: location.name_full
              };
            },
            error => this.routingService.routeToErrorPage(error)
          );
        } 
      }
    })
  }


  /**
   * @description Executes when cancel button is clicked. Extends normal cancel logic for the extra step, that locations may be
   * created from the context, that you're creating it as a sublocation for another location. In such a case, cancel 
   * should route you back to the original location for which you were creating this. This is the logic that happens here.
   */
  onCancel(){
    if(this.isForAssociatedObjectCreation()){
      this.routingService.routeToPath('location', {
        name: this.userModel.parent_location_details.name, 
        parent_name: this.userModel.parent_location_details.parent_location
      });

    } else {
      const executionContext = this;
      ArticleFormMixin.prototype.onCancel(executionContext);
    }
  }

  /**
   * @description Checks if the route through which the Component is visited is the "location-parentlocation-create" route, which means
   * the location is being created as a sublocation, whose name is available as request parameter ":parent_name"
   * @returns {boolean} True if this route is currently "location-parentlocation-create",false if it isn't
   */
   private isForAssociatedObjectCreation(): boolean{
    return this.routingService.routeNameMatches(this.route, "location-parentlocation-create");
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
