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