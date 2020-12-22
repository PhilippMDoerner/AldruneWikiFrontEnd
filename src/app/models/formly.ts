export interface FormlyInterface{
    key: string,
    label?: string,
    required?: boolean,
    hide?: boolean,
    wrappers?: string[],
    className?: string,
    validators?: string[],
}
export interface FormlyOverviewSelectConfig extends FormlyInterface{
    labelProp?: string,
    valueProp?: string,
    optionsType: string
}

export interface FormlyGenericInputConfig extends FormlyInterface{
    isNumberInput?: boolean,
    placeholder?: string,
    maxLength?: number,
    minLength?: number,
    parsers?: any,
}

export interface FormlyCustomStringSelectConfig extends FormlyInterface{
    options: string[]
}

export interface FormlyCheckboxConfig extends FormlyInterface{
    defaultValue: boolean
}

export interface FormlyDatepickerConfig extends FormlyInterface{}

export interface FormlyCustomSessionSelect extends FormlyInterface{}