import { Injectable } from '@angular/core';
import { FormlyLocationField, MyFormlyFieldConfig } from "src/app/models/formly";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { LocationService } from './location/location.service';
import { OrganizationService } from './organization/organization.service';
import { RouteConfigLoadStart } from '@angular/router';
import { Location } from "src/app/models/location";

@Injectable({
  providedIn: 'root'
})
export class MyFormlyService {

  constructor(
    private locationService: LocationService,
    private organizationService: OrganizationService
  ) { }

  locationSelect(config: FormlyLocationField): FormlyFieldConfig{
    return {
      key: config.key,
      type: "select",
      templateOptions:{
        label: (config.label) ? config.label : "Location",
        labelProp: "name_full",
        valueProp: (location: Location) => location,
        options: this.locationService.getLocations(),
        compareWith: (config.compareWith) ? config.compareWith : (o1: Location, o2: Location) => o1.pk === o2.pk
      }
    };
  }

  genericInput(config: MyFormlyFieldConfig): FormlyFieldConfig{
    return {
      key: config.key,
      type: "select",
      templateOptions:{
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
        valueProp: (location: Location) => location,
        options: this.locationService.getLocations(),
        compareWith: (config.compareWith) ? config.compareWith : (o1: Location, o2: Location) => o1.pk === o2.pk
      }
    };
  }

  capitalizeFirstLetter(s: string){
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
