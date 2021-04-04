import { Injectable } from '@angular/core';
import { animateElement } from '../utils/functions/animationDecorator';
import { copyToClipboard } from '../utils/functions/copy-to-clipboard';

@Injectable({
  providedIn: 'root'
})
export class WarningsService {
  notifications: any [];

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
    const hasSingleError: boolean = typeof error.error === "string";
    const isGenericHTTPError: boolean = typeof error === "number";

    // Get individual errors
    let httpErrorMessage: string;
    if(hasSingleError){
      httpErrorMessage = "The error was caused by: \n    " + error.error;
    } else if (isGenericHTTPError){
      httpErrorMessage = "";
    } else {
      httpErrorMessage = this.getHttpErrorMessages(error)
    }
    
    const errorStatus: number = (typeof error !== "number") ? error.status : error;
    const warningMessage = (this.warnings[errorStatus]) ? this.warnings[errorStatus] : this.defaultWarning;

    const notificationBody = warningMessage + "\n\n" + httpErrorMessage;
    const notificationHeading = `Error ${errorStatus}`;
    this.showErrorNotification(notificationHeading, notificationBody, error);
  }

  getHttpErrorMessages(httpErrorObject: any): string{
    let httpErrorMessages: string = "The errors you received were because of:\n";

    for(let formField in httpErrorObject.error){
      httpErrorMessages += `  ${formField}\n`;
      const isErrorMessageArray = Array.isArray(httpErrorObject.error[formField]);

      if(isErrorMessageArray){
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

  showErrorNotification(heading: string, body: string, error: number | any = {}) {
    const bodyElement: HTMLElement = document.querySelector("body");
    const notificationHTML = `
    <div class="card notification animate__animated animate__fadeInDown">
        <div class="card-body">
          <i class="fa fa-times fa-1-5x icon float-right" id="close"></i>
          <div class="card-title">${heading}</div>
          <hr class="white-separator">
          <div class="card-subtitle"></div>
          <div class="card-text">${body}</div>
          <div class="mt-3">
              <div class="btn btn-secondary" id="close"> <i class="fa fa-times"></i> Close </div>
              <div class="btn btn-secondary" id="copy"> <i class="fa fa-clipboard"></i> Copy Full Error</div>
          </div>
        </div>
    </div>
    `;


    const notificationElement: HTMLElement = document.createElement("div")
    notificationElement.innerHTML = notificationHTML;
    notificationElement.onclick = (event) => this.onNotificationClick(event, error);

    bodyElement.appendChild(notificationElement);
  }

  onNotificationClick(event: any, error: any): void{
    const isClickOnCloseIcon = event.target.id === "close";
    const isClickOnCloseButton = event.target.id === "close";

    if (isClickOnCloseIcon){
      const notificationElement = event.target.parentElement.parentElement;
      animateElement(notificationElement, 'fadeOutUp')
        .then(() => notificationElement.parentElement.remove());
    }

    if (isClickOnCloseButton){
      const notificationElement = event.target.parentElement.parentElement.parentElement;
      animateElement(notificationElement, 'fadeOutUp')
        .then(() => notificationElement.parentElement.remove());
      
    }

    const isClickOnCopyErrorButton = event.target.id === "copy";
    if(isClickOnCopyErrorButton) this.copyErrorToClipboard(error)
  }

  copyErrorToClipboard(error: number | any){
    const isHTTPErrorStatus = typeof error === "number";
    const errorString = (isHTTPErrorStatus) ? `Error status ${error}` : JSON.stringify(error, null, "    ");
    copyToClipboard(errorString);
  }

}
