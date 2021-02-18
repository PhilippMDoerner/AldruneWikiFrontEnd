/**Decorator to apply transformObservableContent */
export function tryCatch(target: any, propertyKey: string, descriptor: PropertyDescriptor){

    const originalMethod = descriptor.value;
    descriptor.value = function(){
        let result: any;
        try{
            result = originalMethod.apply(this, arguments);
        } catch(error){
            showWarning(error);
        }
        return result;
    }

    return descriptor;
}


const warnings: object = {
    0: "This can't be done without an internet connection",
    404: "The target URL for the requested action does not seem to exist",
    504: "This can't be done without an internet connection",
  }

const defaultWarning: string = "The requested action was not carried out. An unknown error occurred";


function showWarning(error: number | any){
    if (typeof error !== "number" && (!error.hasOwnProperty("status") || !error.hasOwnProperty("error"))) throw "Invalid error input to show warning";

    const errorStatus: number = (typeof error !== "number") ? error.status : error;
    const httpErrorMessage:string = (typeof error !== "number") ? getHttpErrorMessages(error) : "";

    if (typeof error !== "number" && error.hasOwnProperty("status")) error = error.status;
    //TODO Turn this way of alerting somebody to an issue into something nicer looking

    const warningMessage = (warnings[errorStatus]) ? warnings[errorStatus] : defaultWarning;
    alert(warningMessage + "\n\n" + httpErrorMessage);
}

function getHttpErrorMessages(httpErrorObject: any): string{
    let httpErrorMessages: string = "The errors you received were because of:\n";

    for(let formField in httpErrorObject.error){
      httpErrorMessages += `  ${formField}\n`;
      const formFieldErrors: string[] = httpErrorObject.error[formField];
      formFieldErrors.forEach(errorMessage => {
        httpErrorMessages += `    - ${errorMessage} \n`;
      });
    }

    return httpErrorMessages;
}

function readonly(target, name, descriptor) {
    descriptor.writable = false;
    return descriptor;
  }
  