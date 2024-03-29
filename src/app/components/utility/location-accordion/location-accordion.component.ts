import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Location, LocationObject } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location/location.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-location-accordion',
  templateUrl: './location-accordion.component.html',
  styleUrls: ['./location-accordion.component.scss']
})
export class LocationAccordionComponent extends PermissionUtilityFunctionMixin implements OnInit {
  locationUrls: string[];
  locationCharacterUrls: string[][];

  constants: any = Constants;
  campaignName: string = this.route.snapshot.params.campaign;
  @Input() sublocations: LocationObject[];
  sublocationDescriptionFormStates: BehaviorSubject<string>[] = [];
  isOpen: object;

  constructor(
    private locationService: LocationService,
    private warnings: WarningsService,
    public routingService: RoutingService,
    route: ActivatedRoute,
    tokenService: TokenService,
  ) { 
    super(tokenService, route);
  }

  ngOnInit(): void {
    this.isOpen = {};

    this.locationCharacterUrls = [];
    this.sublocations.forEach((location, index) => {
      const accordionPanelId = `static-${index}`;
      this.isOpen[accordionPanelId] = false;

      const formStateSubject: BehaviorSubject<string> = new BehaviorSubject(Constants.displayState);
      this.sublocationDescriptionFormStates.push(formStateSubject);

      const characters = location.characters;
      const singleLocationCharacterUrls = characters.map(character => this.routingService.getRoutePath('character', {name: character.name, campaign: this.campaignName}) )
      this.locationCharacterUrls.push(singleLocationCharacterUrls);
    });

    this.locationUrls = this.sublocations.map(location => this.routingService.getRoutePath('location', {
      name: location.name, 
      parent_name: location.parent_location_details.name,
      campaign: this.campaignName
    }));
  }

  onSublocationUpdate(updateText: string, sublocationIndex: number){
    const sublocationToUpdate: LocationObject = this.sublocations[sublocationIndex];
    const oldDescription = sublocationToUpdate.description;
    sublocationToUpdate.description = updateText;

    this.locationService.update(sublocationToUpdate.pk, sublocationToUpdate).pipe(first()).subscribe(
      (updatedSublocation: LocationObject) => {},
      error => this.onDescriptionUpdateError(error, sublocationIndex)
    );
  }

  onPanelChange({panelId}){
    for (const key in this.isOpen) {
      const isClickedPanel: boolean = (key === panelId);
      this.isOpen[key] = isClickedPanel ? !this.isOpen[key]: false;
    }
  }

  panelIsOpen(index: number){
    return this.isOpen[`static-${index}`];
  }

  /**
   * @description Ensures that the "OutdatedUpdateForm" is displayed if the error is HTTP 409. 
   * Else it just displays the error message
   * @param {any} errorResponse - The error response
   * @param {number} index - The index on sublocations
   */
  onDescriptionUpdateError(errorResponse: any, index: number){
    const isOutdatedUpdateError = errorResponse?.status === 409;
    if(isOutdatedUpdateError){ 
        //Update the description in your local data with that from the server
        const serverLocation: Location = errorResponse.error;
        const serverLocationObject = new LocationObject(serverLocation);
        this.sublocations[index] = serverLocationObject;

        //Change the formstate of the textfield which now has the server article version and its own
        this.sublocationDescriptionFormStates[index].next(Constants.outdatedUpdateState);
    } else {
      this.warnings.showWarning(errorResponse);
    }
  }
}
