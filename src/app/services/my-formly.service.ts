import { Injectable } from '@angular/core';
import { FormlyCheckboxConfig, FormlyCustomStringSelectConfig, FormlyDatepickerConfig, FormlyGenericInputConfig, FormlyInterface, FormlyOverviewSelectConfig } from "src/app/models/formly";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { OverviewService } from './overview.service';

@Injectable({
  providedIn: 'root'
})
export class MyFormlyService {

  constructor(
    private selectOptionService: OverviewService
  ) { }

  genericSelect(config: FormlyOverviewSelectConfig): FormlyFieldConfig{
    return {
      key: config.key,
      type: "select",
      className: config.className,
      wrappers: config.wrappers,
      hideExpression: (config.hide) ? config.hide : false,
      templateOptions:{
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
        labelProp: (config.labelProp) ? config.labelProp : "name_full",
        valueProp: (config.valueProp) ? config.valueProp : "pk",
        options: this.selectOptionService.getOverviewItems(config.optionsType),
        required: (typeof config.required === "boolean") ? config.required : true,
      }
    };
  }

  customStringSelect(config: FormlyCustomStringSelectConfig): FormlyFieldConfig{
    let options: {label: string, value: string}[] = [];
    for (let option of config.options){
      options.push({label: option, value: option});
    }

    return {
      key: config.key,
      type: "select",
      className: config.className,
      hideExpression: (config.hide) ? config.hide : false,
      templateOptions:{
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
        options: options,
        required: (typeof config.required === "boolean") ? config.required : true,
      }
    }
  }

  genericInput(config: FormlyGenericInputConfig): FormlyFieldConfig{
    return {
      key: config.key,
      type: "input",
      className: config.className,
      hideExpression: (config.hide) ? config.hide : false,
      parsers: config.parsers,
      templateOptions:{
        maxLength: config.maxLength,
        minLength: config.minLength,
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
        type: (config.isNumberInput) ? "number" : "string",
        required: (typeof config.required === "boolean") ? config.required : true,
        placeholder: (config.placeholder) ? config.placeholder : null,
      }
    }
  }

  genericPasswordInput(config: FormlyInterface): FormlyFieldConfig{
    return {
      key: config.key,
      type: "input",
      className: config.className,
      templateOptions:{
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
        type: "password",
        required: true,
        placeholder: "Password",
      }
    }
  }

  genericCheckbox(config: FormlyCheckboxConfig): FormlyFieldConfig{
    return{
      key: config.key,
      type: "checkbox",
      className: config.className,
      defaultValue: config.defaultValue,
      hideExpression: (config.hide) ? config.hide : false,
      templateOptions:{
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
      }
    }
  }

  genericDatepicker(config: FormlyDatepickerConfig): FormlyFieldConfig{
    return {
      key: config.key,
      type: "datepicker",
      className: config.className,
      hideExpression: (config.hide) ? config.hide : false,
      templateOptions:{
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
      }
    }
  }

  singleFileField(config: FormlyInterface): FormlyFieldConfig{
    return {
      key: config.key,
      type: "file",
      className: config.className,
      hideExpression: (config.hide) ? config.hide : false,
      templateOptions: {
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
        required: (typeof config.required === "boolean") ? config.required : true,
      }
    }
  }

  genericTextField(config: FormlyInterface): FormlyFieldConfig{
    return {
      key: config.key,
      type: "tinymce",
      className: config.className,
      hideExpression: (config.hide) ? config.hide : false,
      templateOptions:{
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
        required: (typeof config.required === "boolean") ? config.required : true,
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
