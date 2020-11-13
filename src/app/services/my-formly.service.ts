import { Injectable } from '@angular/core';
import { FormlyGenericInputConfig, FormlyOverviewSelectConfig } from "src/app/models/formly";
import { FormlyField, FormlyFieldConfig } from "@ngx-formly/core";
import { LocationService } from './location/location.service';
import { OrganizationService } from './organization/organization.service';
import { RouteConfigLoadStart } from '@angular/router';
import { Location } from "src/app/models/location";
import { OverviewService } from './overview.service';
import { config } from 'rxjs';
import { isNumber } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class MyFormlyService {

  constructor(
    private locationService: LocationService,
    private organizationService: OrganizationService,
    private selectOptionService: OverviewService
  ) { }

  genericSelect(config: FormlyOverviewSelectConfig): FormlyFieldConfig{
    return {
      key: config.key,
      type: "select",
      templateOptions:{
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
        labelProp: (config.labelProp) ? config.labelProp : "name_full",
        valueProp: "pk",
        options: this.selectOptionService.getOverviewItems(config.optionsType),
      }
    };
  }

  genericNumberInput(config: FormlyGenericInputConfig): FormlyFieldConfig{
    return {
      key: config.key,
      type: "input",
      templateOptions:{
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
        type: "number"
      }
    };
  }

  genericInput(config: FormlyGenericInputConfig): FormlyFieldConfig{
    return {
      key: config.key,
      type: "input",
      templateOptions:{
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
        type: (config.isNumberInput) ? "number" : "string",
      }
    }
  }

  capitalizeFirstLetter(s: string){
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  getFieldConfigForMarker(): FormlyFieldConfig[]{
    return [
      {
        key: "latitude",
        type: "input",
        templateOptions:{
          label: "Latitude",
          type: "number",
          required: true,
        }
      },
      {
        key: "longitude",
        type: "input",
        templateOptions:{
          label: "Longitude",
          type: "number",
          required: true,
        }
      },
      {
        key: "location",
        type: "select",
        templateOptions:{
          label: "Location",
          labelProp: "name_full",
          valueProp: "pk",
          required: true,
          options: this.selectOptionService.getOverviewItems('location'),
        }
      },
      {
        key: "map",
        type: "select",
        templateOptions:{
          label: "Map",
          labelProp: "name_full",
          valueProp: "pk",
          required: true,
          options: this.selectOptionService.getOverviewItems('map'),
        }
      },
      {
        key: "type",
        type: "select",
        templateOptions:{
          label: "Marker Type",
          labelProp: "name_full",
          valueProp: "pk",
          options: this.selectOptionService.getOverviewItems('marker_type'),
        }
      },
      {
        key: "color",
        type: "input",
        templateOptions:{
          label: "Custom Color",
          type: "string"
        }
      },
      {
        key: "icon",
        type: "input",
        templateOptions:{
          label: "Custom Icon",
          type: "string"
        }
      }
    ];
  }

  getFieldConfigForLocation(): FormlyFieldConfig[]{
    return [
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
  }
}
