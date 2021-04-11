import { Injectable } from '@angular/core';
import { FormlyCheckboxConfig, FormlyCustomSelectConfig, FormlyCustomStringSelectConfig, FormlyDatepickerConfig, FormlyGenericInputConfig, FormlyInterface, FormlyOverviewSelectConfig, FormlyPasswordInterface } from "src/app/models/formly";
import { FormlyField, FormlyFieldConfig } from "@ngx-formly/core";
import { OverviewService } from './overview.service';

@Injectable({
  providedIn: 'root'
})
export class MyFormlyService {

  constructor(
    private selectOptionService: OverviewService
  ) { }

  setDefaultValues(config: any): any{
    if (config.required === undefined) config.required = true;

    return config
  }

  genericSelect(config: FormlyOverviewSelectConfig): FormlyFieldConfig{
    config = this.setDefaultValues(config);

    const validatorList = (config.validators) ? config.validators : [];
    if (config.required === true ) validatorList.push('required');

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
      },
      validators: {
        validation: validatorList
      }
    };
  }

  customSelect(config: FormlyCustomSelectConfig): FormlyFieldConfig{
    const validatorList = (config.validators) ? config.validators : [];
    if (config.required === true ) validatorList.push('required');

    return {
      key: config.key,
      type: "select",
      className: config.className,
      hideExpression: (config.hide) ? config.hide : false,
      templateOptions:{
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
        options: config.options,
        required: (typeof config.required === "boolean") ? config.required : true,
      },
      validators: {
        validation: validatorList,
      },
    }
  }

  customStringSelect(config: FormlyCustomStringSelectConfig): FormlyFieldConfig{
    let options: {label: string, value: string}[] = [];
    for (let option of config.options){
      options.push({label: option, value: option});
    }

    const validatorList = (config.validators) ? config.validators : [];
    if (config.required === true ) validatorList.push('required');

    return {
      key: config.key,
      type: "select",
      className: config.className,
      hideExpression: (config.hide) ? config.hide : false,
      templateOptions:{
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
        options: options,
        required: (typeof config.required === "boolean") ? config.required : true,
      },
      validators: {
        validation: validatorList,
      },
    }
  }

  genericInput(config: FormlyGenericInputConfig): FormlyFieldConfig{
    config = this.setDefaultValues(config);

    const validatorList = (config.validators) ? config.validators : [];
    if (config.required === true ) validatorList.push('required'); //This is non functional as required is only rarely set at this point
    if (config.isNumberInput === true) validatorList.push('notInteger');
    //Why "hasSpecialCharacters" validation? Names are used in URLs, they mustn't have special characters
    if (config.isNameInput === true) validatorList.push('hasSpecialCharacters');

    let inputType: string;
    if(config.isPasswordInput){
      inputType = "password";
    } else if (config.isNumberInput){
      inputType = "number";
    } else {
      inputType = "string";
    }

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
        type: inputType,
        required: (typeof config.required === "boolean") ? config.required : true,
        placeholder: (config.placeholder) ? config.placeholder : null,
      },
      validators:{
        validation: validatorList,
      }
    }
  }

  genericPasswordInput(config: FormlyInterface): FormlyFieldConfig{
    const validatorList = (config.validators) ? config.validators : [];
    if (config.required === true ) validatorList.push('required');
    
    return {
      key: config.key,
      type: "input",
      className: config.className,
      fieldGroupClassName: config.fieldGroupClassName,
      templateOptions:{
        label: (config.label) ? config.label : "Password",
        type: "password",
        required: true,
        placeholder: "Your password",
      },
      validators:{
        validation: validatorList
      }
    }
  }


  confirmedPasswordInput(config: FormlyPasswordInterface): FormlyFieldConfig{
    const validatorList = (config.validators) ? config.validators : [];
    validatorList.push('required');
    
    const passwordField = {
      key: "password", //Hard coded, fieldMatch validator depends on this
      type: "input",
      className: config.className,
      templateOptions:{
        label: (config.label) ? config.label : "Password",
        type: "password",
        required: true,
        placeholder: "Password, at least 7 characters",
      },
      validators:{
        validation: validatorList
      }
    }

    const confirmPasswordField = {
      key: "passwordConfirm", //Hard coded, fieldMatch validator depends on this
      type: "input",
      className: config.className,
      templateOptions:{
        label: (config.label) ? "Confirm " + config.label : "Password Confirmation",
        type: "password",
        required: true,
        placeholder: "Please re-enter your password",
      },
    }

    return {
      validators: {
        validation: [
          { name: 'fieldMatch', options: { errorPath: 'passwordConfirm' } },
        ]
      },
      fieldGroup: [
        passwordField,
        confirmPasswordField
      ]
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
    const validatorList = (config.validators) ? config.validators : [];
    validatorList.push('date');
    if (config.required === true ) validatorList.push('required');

    return {
      key: config.key,
      type: "datepicker",
      className: config.className,
      hideExpression: (config.hide) ? config.hide : false,
      templateOptions:{
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
      },
      validators:{
        validation: validatorList,
      }
    }
  }

  singleFileField(config: FormlyInterface): FormlyFieldConfig{
    const validatorList = (config.validators) ? config.validators : [];
    if (config.required === true ) validatorList.push('required');

    return {
      key: config.key,
      type: "file",
      className: config.className,
      hideExpression: (config.hide) ? config.hide : false,
      templateOptions: {
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
        required: (typeof config.required === "boolean") ? config.required : true,
      },
      validators:{
        validation: validatorList,
      }
    }
  }

  genericTextField(config: FormlyInterface): FormlyFieldConfig{
    const validatorList = (config.validators) ? config.validators : [];
    if (config.required === true ) validatorList.push('required');

    return {
      key: config.key,
      type: "tinymce",
      className: config.className,
      hideExpression: (config.hide) ? config.hide : false,
      templateOptions:{
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
        required: (typeof config.required === "boolean") ? config.required : true,
      },
      validators:{
        validation: validatorList
      }
    }
  }

  private capitalizeFirstLetter(s: string){
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
          label: "Name",
          required: true
        },
        validators: {
          validation: ['hasSpecialCharacters']
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
