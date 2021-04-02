import { Injectable } from '@angular/core';
import { type } from 'os';

@Injectable({
  providedIn: 'root'
})
export class WarningsService {

  warnings: object = {
    0: "This can't be done without an internet connection",
    200: "Potential Syntaxerror",
    404: "The target URL for the requested action does not seem to exist",
    504: "This can't be done without an internet connection",
  }

  defaultWarning: string = "The requested action was not carried out. An unknown error occurred";

  constructor() { }

  showWarning(error: number | any){
    console.log(error);
    if (typeof error !== "number" && (!error.hasOwnProperty("status") || !error.hasOwnProperty("error"))) throw "Invalid error input to show warning";
    const isSyntaxError: boolean = error.error.error.toString().startsWith("SyntaxError");
    const isFormlyFieldError: boolean = typeof error === "number";

    const errorStatus: number = (typeof error !== "number") ? error.status : error;
    // Get individual errors
    let httpErrorMessage: string;
    if(isSyntaxError){
      httpErrorMessage = error.error.error;
    } else if (isFormlyFieldError){
      httpErrorMessage = "";
    } else {
      httpErrorMessage = this.getHttpErrorMessages(error)
    }
    
    if (typeof error !== "number" && error.hasOwnProperty("status")) error = error.status;
    //TODO Turn this way of alerting somebody to an issue into something nicer looking


    const warningMessage = (this.warnings[errorStatus]) ? this.warnings[errorStatus] : this.defaultWarning;
    alert(warningMessage + "\n\n" + httpErrorMessage);
  }

  getHttpErrorMessages(httpErrorObject: any): string{
    let httpErrorMessages: string = "The errors you received were because of:\n";

    for(let formField in httpErrorObject.error){
      httpErrorMessages += `  ${formField}\n`;
      const isSingleErrorMessage = typeof httpErrorObject.error[formField] === "string";

      if(!isSingleErrorMessage){
        const formFieldErrors: string[] = httpErrorObject.error[formField];
        formFieldErrors.forEach(errorMessage => {
          httpErrorMessages += `    - ${errorMessage} \n`;
        });
      } else {
        const errorMessage = httpErrorObject.error[formField];
        httpErrorMessages += `    - ${errorMessage} \n`;
      }

    }

    return httpErrorMessages;
  }

  showTextModal(text: string){
    alert(text);
  }

}
