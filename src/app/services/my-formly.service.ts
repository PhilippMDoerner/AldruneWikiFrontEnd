import { Injectable } from '@angular/core';
import { FormlyCheckboxConfig, FormlyCustomSelectConfig, FormlyCustomStringSelectConfig, FormlyDatepickerConfig, FormlyGenericInputConfig, FormlyInterface, FormlyOverviewDisabledSelectConfig, FormlyOverviewSelectConfig, FormlyPasswordInterface } from "src/app/models/formly";
import { FormlyField, FormlyFieldConfig } from "@ngx-formly/core";
import { OverviewService } from './overview.service';
import { OverviewType } from '../app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyFormlyService {

  constructor(
    private selectOptionService: OverviewService
  ) { }

  setDefaultValues(config: any): any{
    if (config.required == null) config.required = true;
    if (config.disabled == null) config.disabled = false;
    if (config.sortProp == null) config.sortProperty = null;

    return config
  }


  genericSelect(config: FormlyOverviewSelectConfig): FormlyFieldConfig{
    config = this.setDefaultValues(config);

    const validatorList = (config.validators) ? config.validators : [];
    if (config.required === true ) validatorList.push('required');

    let optionsObservable: Observable<any>;
    if (config.campaign == null){
      optionsObservable = this.selectOptionService.getAllOverviewItems(config.overviewType, config.sortProp);
    } else {
      optionsObservable = this.selectOptionService.getCampaignOverviewItems(config.campaign, config.overviewType, config.sortProp);
    }


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
        options: optionsObservable,
        required: (typeof config.required === "boolean") ? config.required : true,
        disabled: config.disabled,
      },
      validators: {
        validation: validatorList
      }
    };
  }


  genericDisableSelect(config: FormlyOverviewDisabledSelectConfig): FormlyFieldConfig{
    config = this.setDefaultValues(config);

    const validatorList = (config.validators) ? config.validators : [];
    if (config.required === true ) validatorList.push('required');
    if (config.showWrapperLabel == null) config.showWrapperLabel = true;

    let optionsObservable: Observable<any>;
    if (config.campaign == null){
      optionsObservable = this.selectOptionService.getAllOverviewItems(config.overviewType, config.sortProp);
    } else {
      optionsObservable = this.selectOptionService.getCampaignOverviewItems(config.campaign, config.overviewType, config.sortProp);
    }

    return {
      key: config.key,
      type: "formly-select-disable",
      className: config.className,
      wrappers: config.wrappers,
      hideExpression: (config.hide) ? config.hide : false,
      templateOptions:{
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
        labelProp: (config.labelProp) ? config.labelProp : "name_full",
        valueProp: (config.valueProp) ? config.valueProp : "pk",
        options: optionsObservable,
        required: (typeof config.required === "boolean") ? config.required : true,
        disabledExpression: config.disabledExpression,
        tooltipMessage: config.tooltipMessage,
        warningMessage: config.warningMessage,
        additionalProperties: {
          showWrapperLabel: config.showWrapperLabel
        }
      },
      validators: {
        validation: validatorList
      },
    };
  }


  customSelect(config: FormlyCustomSelectConfig): FormlyFieldConfig{
    config = this.setDefaultValues(config);

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
        disabled: config.disabled,
      },
      validators: {
        validation: validatorList,
      },
    }
  }

  customStringSelect(config: FormlyCustomStringSelectConfig): FormlyFieldConfig{
    config = this.setDefaultValues(config);

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
        disabled: config.disabled,
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
        disabled: config.disabled,
      },
      validators:{
        validation: validatorList,
      }
    }
  }

  genericPasswordInput(config: FormlyInterface): FormlyFieldConfig{
    config = this.setDefaultValues(config);

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
        disabled: config.disabled,
        attributes: {
          autocomplete: "on"
        }
      },
      validators:{
        validation: validatorList
      }
    }
  }


  confirmedPasswordInput(config: FormlyPasswordInterface): FormlyFieldConfig{
    config = this.setDefaultValues(config);

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
        disabled: config.disabled,
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
        disabled: config.disabled,
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
    config = this.setDefaultValues(config);

    return{
      key: config.key,
      type: "checkbox",
      className: config.className,
      defaultValue: config.defaultValue,
      hideExpression: (config.hide) ? config.hide : false,
      templateOptions:{
        label: (config.label) ? config.label : this.capitalizeFirstLetter(config.key),
        disabled: config.disabled,
      },
    }
  }

  genericDatepicker(config: FormlyDatepickerConfig): FormlyFieldConfig{
    config = this.setDefaultValues(config);

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
        disabled: config.disabled,
      },
      validators:{
        validation: validatorList,
      }
    }
  }

  singleFileField(config: FormlyInterface): FormlyFieldConfig{
    config = this.setDefaultValues(config);

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
        disabled: config.disabled,
      },
      validators:{
        validation: validatorList,
      }
    }
  }

  genericTextField(config: FormlyInterface): FormlyFieldConfig{
    config = this.setDefaultValues(config);

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
        disabled: config.disabled,
      },
      validators:{
        validation: validatorList
      }
    }
  }

  private capitalizeFirstLetter(s: string){
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}