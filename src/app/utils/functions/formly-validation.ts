import { FormControl, ValidationErrors } from "@angular/forms";

// Validation Messages
export const invalidTimeMessage = { name: "time", message: "Time must have 'hh:mm:ss' pattern" };
export const requiredMessage = { name: 'required', message: 'YOOOOOOOOO This field is required ma friend!' };
export const dateMessage = { name: "date", message: "This date does not follow the pattern: 'YYYY-MM-DD'. Sorry to be such a Nazi about it. The computer is forcing me." };
export const requiredIconMessage = { name: 'requiredIcon', message: "This field requires a fontawesome icon as input. Here is a list of them: https://fontawesome.com/v4.7.0/icons/" };
export const faPrefixMessage = { name: 'faPrefix', message: "Icons are stored without the 'fa-' from font-awesome prefix" };
export const notIntegerMessage = { name: 'notInteger', message: "Your input is not an integer. This field requires an integer number. No amount of revolution can overcome this." };
export const hasSpecialCharactersMessage = { name: 'hasSpecialCharacters', message: 'Your input includes one of the following invalid special characters: [ ] { } ? | \\ " % ~ # < > \'. If you need to rebel, please dont against this.' };

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
export const requiredIconValidator = { name: "requiredIcon", validation: requiredValidation};

// TODO: Get date validation to work. The issue so far is that the control.value of datepicker is an object, not a YYYY-MM-DD string
function dateValidation(control: FormControl): ValidationErrors{
    const dateHasYYYYMMDDFormat: boolean = /[1-2]\d{3}-(0\d|1[0-2])-[0-3]\d/.test(control.value);
    return (dateHasYYYYMMDDFormat) ? null: { "date": true }
}
export const dateValidator = { name: "date", validation: dateValidation };


function iconValidation(control:FormControl): ValidationErrors{
    const hasFaPrefix = /fa-/.test(control.value);
    return (hasFaPrefix) ? { faPrefix: true} : null
}
export const iconValidator = { name: "faPrefix", validation: iconValidation };


function isIntegerValidation(control: FormControl): ValidationErrors{
    const isInteger = (typeof control.value === "number") && Number.isInteger(control.value);
    return (isInteger) ? null : { 'notInteger': true};
}
export const integerValidator = { name: 'notInteger', validation: isIntegerValidation};


function hasNoSpecialCharactersValidation(control: FormControl): ValidationErrors{
    const isString = (typeof control.value === "string");
    if (isString){
        const specialCharacters: string[] = ['[', ']', '{', '}', '|', '\\', '\"', '%', '~', '#', '<', '>', ']', '?', '\''];
        for (const specialCharacter of specialCharacters){
            if (control.value.includes(specialCharacter)){
                return { 'hasSpecialCharacters': true };
            }
        };
    }

    return null;
}
export const specialCharacterValidator = { name: 'hasSpecialCharacters', validation: hasNoSpecialCharactersValidation};
