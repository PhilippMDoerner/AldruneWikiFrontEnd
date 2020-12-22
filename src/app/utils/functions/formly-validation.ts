import { FormControl, ValidationErrors } from "@angular/forms";

// Validation Messages
export const invalidTimeMessage = { name: "time", message: "Time must have 'hh:mm:ss' pattern" };
export const requiredMessage = { name: 'required', message: 'This field is required' };
export const dateMessage = { name: "date", message: "This date does not follow the pattern: 'YYYY-MM-DD'" };

// Validation Functions
function timeValidation(control: FormControl): ValidationErrors{
    const isValidTime: boolean = /\d\d.[0-5]\d.[0-5]\d/.test(control.value);
    return (isValidTime) ? null : { time: true};
}
export const timeValidator = { name: "time", validation: timeValidation };


function requiredValidation(control: FormControl): ValidationErrors{
    const hasValue: boolean = !!control.value || control.value === 0;
    return (hasValue) ? null : { required: true };
}
export const requiredValidator = { name: "required", validation: requiredValidation };

// TODO: Get date validation to work. The issue so far is that the control.value of datepicker is an object, not a YYYY-MM-DD string
function dateValidation(control: FormControl): ValidationErrors{
    const dateHasYYYYMMDDFormat: boolean = /[1-2]\d{3}-(0\d|1[0-2])-[0-3]\d/.test(control.value);
    console.log(control.value);
    console.log("Date was validated as:");
    console.log(dateHasYYYYMMDDFormat);
    return (dateHasYYYYMMDDFormat) ? null: { "date": true }
}
export const dateValidator = { name: "date", validation: dateValidation };