import { Type } from "@angular/core";
import { OverviewType } from "../app.constants";

export interface FormlyPasswordInterface{
    label?: string,
    className?: string,
    validators?: string[],
    disabled?: boolean,
}

export interface FormlyInterface{
    key: string,
    label?: string,
    required?: boolean,
    hide?: boolean,
    wrappers?: string[],
    className?: string,
    fieldGroupClassName?: string,
    validators?: string[],
    disabled?: boolean,
    showWrapperLabel?: boolean,
}

export interface FormlyOverviewSelectConfig extends FormlyInterface{
    labelProp?: string,
    valueProp?: string,
    overviewType: OverviewType,
    campaign: string,
}

export interface FormlyOverviewDisabledSelectConfig extends FormlyOverviewSelectConfig{
    disabledExpression: Function,
    tooltipMessage: string,
    warningMessage: string,
}

export interface FormlyGenericInputConfig extends FormlyInterface{
    isNumberInput?: boolean,
    placeholder?: string,
    maxLength?: number,
    minLength?: number,
    parsers?: any,
    isNameInput?: boolean,
    isPasswordInput?: boolean
}

export interface FormlyCustomStringSelectConfig extends FormlyInterface{
    options: string[]
}

export interface FormlyCustomSelectConfig extends FormlyInterface{
    options: {label: String, value: String | Number}[]
}

export interface FormlyCheckboxConfig extends FormlyInterface{
    defaultValue: boolean
}

export interface FormlyDatepickerConfig extends FormlyInterface{}

export interface FormlyCustomSessionSelect extends FormlyInterface{}