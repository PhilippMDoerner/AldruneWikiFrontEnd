export interface FormlyInterface{
    key: string,
    label?: string,
    required?: boolean
}
export interface FormlyOverviewSelectConfig extends FormlyInterface{
    labelProp?: string,
    valueProp?: string,
    optionsType: string
}

export interface FormlyGenericInputConfig extends FormlyInterface{
    isNumberInput?: boolean,
    placeholder?: string,
}

export interface FormlyCustomStringSelectConfig extends FormlyInterface{
    options: string[]
}

export interface FormlyCheckboxConfig extends FormlyInterface{
    defaultValue: boolean
}