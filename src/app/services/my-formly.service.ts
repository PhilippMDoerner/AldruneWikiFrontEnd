import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  FormlyCheckboxConfig,
  FormlyCustomSelectConfig,
  FormlyCustomStringSelectConfig,
  FormlyDatepickerConfig,
  FormlyGenericInputConfig,
  FormlyInterface,
  FormlyOverviewDisabledSelectConfig,
  FormlyOverviewSelectConfig,
  FormlyPasswordInterface,
} from 'src/app/models/formly';
import { OverviewService } from './overview.service';

@Injectable({
  providedIn: 'root',
})
export class MyFormlyService {
  constructor(private selectOptionService: OverviewService) {}

  setDefaultValues(config: any): any {
    return {
      required: true,
      disabled: false,
      sortProperty: null,
      valueProp: 'pk',
      ...config,
    };
  }

  private getOverviewItems(
    config: FormlyOverviewSelectConfig
  ): Observable<any[]> {
    const isCampaignSpecific = config.campaign != null;
    let options: Observable<any[]> = isCampaignSpecific
      ? this.selectOptionService.getCampaignOverviewItems(
          config.campaign,
          config.overviewType,
          config.sortProp
        )
      : this.selectOptionService.getAllOverviewItems(
          config.overviewType,
          config.sortProp
        );

    const isRequired = config.required === true;
    if (!isRequired) {
      options = options.pipe(
        map((values) => {
          const emptyOption = {};
          emptyOption[config.key] = '------';
          emptyOption[config.valueProp] = null;
          return [emptyOption, ...values];
        })
      );
    }

    return options;
  }

  genericSelect(config: FormlyOverviewSelectConfig): FormlyFieldConfig {
    config = this.setDefaultValues(config);

    const optionsObservable: Observable<any[]> = this.getOverviewItems(config);

    const validatorList = config.validators ?? [];
    if (config.required === true) {
      validatorList.push('required');
    }

    return {
      key: config.key,
      type: 'select',
      className: config.className,
      wrappers: config.wrappers,
      hideExpression: config.hide ?? false,
      props: {
        label: config.label ?? this.capitalizeFirstLetter(config.key),
        labelProp: config.labelProp ?? 'name_full',
        valueProp: config.valueProp,
        options: optionsObservable,
        required: config.required ?? true,
        disabled: !!config.disabled,
      },
      validators: {
        validation: validatorList,
      },
    };
  }

  genericDisableSelect(
    config: FormlyOverviewDisabledSelectConfig
  ): FormlyFieldConfig {
    config = this.setDefaultValues(config);
    console.log(config);

    const validatorList = config.validators ?? [];
    if (config.required === true) validatorList.push('required');

    const optionsObservable: Observable<any[]> = this.getOverviewItems(config);

    return {
      key: config.key,
      type: 'formly-select-disable',
      className: config.className,
      wrappers: config.wrappers,
      hideExpression: !!config.hide,
      props: {
        label: config.label ?? this.capitalizeFirstLetter(config.key),
        labelProp: config.labelProp ?? 'name_full',
        valueProp: config.valueProp,
        options: optionsObservable,
        required: config.required ?? true,
        disabledExpression: config.disabledExpression,
        tooltipMessage: config.tooltipMessage,
        warningMessage: config.warningMessage,
        additionalProperties: {
          showWrapperLabel: config.showWrapperLabel ?? true,
        },
      },
      validators: {
        validation: validatorList,
      },
    };
  }

  customSelect(config: FormlyCustomSelectConfig): FormlyFieldConfig {
    config = this.setDefaultValues(config);

    const validatorList = config.validators ?? [];
    if (config.required === true) validatorList.push('required');

    return {
      key: config.key,
      type: 'select',
      className: config.className,
      hideExpression: config.hide ?? false,
      templateOptions: {
        label: config.label ?? this.capitalizeFirstLetter(config.key),
        options: config.options,
        required: config.required ?? true,
        disabled: !!config.disabled,
      },
      validators: {
        validation: validatorList,
      },
    };
  }

  customStringSelect(
    config: FormlyCustomStringSelectConfig
  ): FormlyFieldConfig {
    config = this.setDefaultValues(config);

    let options: { label: string; value: string }[] = config.options.map(
      (opt) => {
        return { label: opt, value: opt };
      }
    );

    const validatorList = config.validators ?? [];
    if (config.required === true) validatorList.push('required');

    return {
      key: config.key,
      type: 'select',
      className: config.className,
      hideExpression: config.hide ?? false,
      templateOptions: {
        label: config.label ?? this.capitalizeFirstLetter(config.key),
        options: options,
        required: config.required ?? true,
        disabled: !!config.disabled,
      },
      validators: {
        validation: validatorList,
      },
    };
  }

  genericInput(config: FormlyGenericInputConfig): FormlyFieldConfig {
    config = this.setDefaultValues(config);

    const validatorList = config.validators ?? [];
    if (config.required === true) validatorList.push('required'); //This is non functional as required is only rarely set at this point
    if (config.isNumberInput === true) validatorList.push('notInteger');
    //Why "hasSpecialCharacters" validation? Names are used in URLs, they mustn't have special characters
    if (config.isNameInput === true) validatorList.push('hasSpecialCharacters');

    let inputType: string;
    if (config.isPasswordInput) {
      inputType = 'password';
    } else if (config.isNumberInput) {
      inputType = 'number';
    } else {
      inputType = 'string';
    }

    return {
      key: config.key,
      type: 'input',
      className: config.className,
      hideExpression: config.hide ?? false,
      parsers: config.parsers,
      templateOptions: {
        maxLength: config.maxLength,
        minLength: config.minLength,
        label: config.label ?? this.capitalizeFirstLetter(config.key),
        type: inputType,
        required: config.required ?? true,
        placeholder: config.placeholder ?? null,
        disabled: !!config.disabled,
      },
      validators: {
        validation: validatorList,
      },
    };
  }

  genericPasswordInput(config: FormlyInterface): FormlyFieldConfig {
    config = this.setDefaultValues(config);

    const validatorList = config.validators ?? [];
    if (config.required === true) validatorList.push('required');

    return {
      key: config.key,
      type: 'input',
      className: config.className,
      fieldGroupClassName: config.fieldGroupClassName,
      templateOptions: {
        label: config.label ?? 'Password',
        type: 'password',
        required: true,
        placeholder: 'Your password',
        disabled: !!config.disabled,
        attributes: {
          autocomplete: 'on',
        },
      },
      validators: {
        validation: validatorList,
      },
    };
  }

  confirmedPasswordInput(config: FormlyPasswordInterface): FormlyFieldConfig {
    config = this.setDefaultValues(config);

    const validatorList = config.validators ?? [];
    validatorList.push('required');

    const passwordField = {
      key: 'password', //Hard coded, fieldMatch validator depends on this
      type: 'input',
      className: config.className,
      templateOptions: {
        label: config.label ?? 'Password',
        type: 'password',
        required: true,
        placeholder: 'Password, at least 7 characters',
        disabled: !!config.disabled,
      },
      validators: {
        validation: validatorList,
      },
    };

    const confirmPasswordField = {
      key: 'passwordConfirm', //Hard coded, fieldMatch validator depends on this
      type: 'input',
      className: config.className,
      templateOptions: {
        label: config.label
          ? 'Confirm ' + config.label
          : 'Password Confirmation',
        type: 'password',
        required: true,
        placeholder: 'Please re-enter your password',
        disabled: !!config.disabled,
      },
    };

    return {
      validators: {
        validation: [
          { name: 'fieldMatch', options: { errorPath: 'passwordConfirm' } },
        ],
      },
      fieldGroup: [passwordField, confirmPasswordField],
    };
  }

  genericCheckbox(config: FormlyCheckboxConfig): FormlyFieldConfig {
    config = this.setDefaultValues(config);

    return {
      key: config.key,
      type: 'checkbox',
      className: config.className,
      defaultValue: config.defaultValue,
      hideExpression: !!config.hide,
      templateOptions: {
        label: config.label ?? this.capitalizeFirstLetter(config.key),
        disabled: !!config.disabled,
      },
    };
  }

  genericDatepicker(config: FormlyDatepickerConfig): FormlyFieldConfig {
    config = this.setDefaultValues(config);

    const validatorList = config.validators ?? [];
    validatorList.push('date');
    if (config.required === true) validatorList.push('required');

    return {
      key: config.key,
      type: 'datepicker',
      className: config.className,
      hideExpression: !!config.hide,
      templateOptions: {
        label: config.label ?? this.capitalizeFirstLetter(config.key),
        disabled: !!config.disabled,
      },
      validators: {
        validation: validatorList,
      },
    };
  }

  singleFileField(config: FormlyInterface): FormlyFieldConfig {
    config = this.setDefaultValues(config);

    const validatorList = config.validators ?? [];
    if (config.required === true) validatorList.push('required');

    return {
      key: config.key,
      type: 'file',
      className: config.className,
      hideExpression: !!config.hide,
      templateOptions: {
        label: config.label ?? this.capitalizeFirstLetter(config.key),
        required: config.required ?? true,
        disabled: !!config.disabled,
      },
      validators: {
        validation: validatorList,
      },
    };
  }

  genericTextField(config: FormlyInterface): FormlyFieldConfig {
    config = this.setDefaultValues(config);

    const validatorList = config.validators ?? [];
    if (config.required === true) validatorList.push('required');

    return {
      key: config.key,
      type: 'tinymce',
      className: config.className,
      hideExpression: !!config.hide,
      templateOptions: {
        label: config.label ?? this.capitalizeFirstLetter(config.key),
        required: config.required ?? true,
        disabled: !!config.disabled,
      },
      validators: {
        validation: validatorList,
      },
    };
  }

  private capitalizeFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
