import { Injectable } from '@angular/core';
import { animateElement } from '../utils/functions/animationDecorator';
import { copyToClipboard } from '../utils/functions/copy-to-clipboard';

@Injectable({
  providedIn: 'root'
})
export class WarningsService {
  warnings: object = {
    0: "This can't be done without an internet connection",
    200: "Potential Syntaxerror",
    404: "The target URL for the requested action does not seem to exist",
    500: "An error occurred on the server, unrelated to your input. Please copy the full error message and send it to the developer",
    504: "This can't be done without an internet connection",
  }

  headings: object = {
    400: "Invalid Input",
  }

  defaultWarning: string = "The requested action was not carried out. An error occurred";

  constructor() { }

  showWarning(error: number | any){
    console.log(error);

    const errorStatus: number = (typeof error !== "number") ? error.status : error;
    const notificationHeading: string = this.getHeading(errorStatus);

    const notificationBody: string = this.getBody(error);

    this.showErrorNotification(notificationHeading, notificationBody, error);
  }

  getBody(error): string{
    const errorStatus: number = (typeof error !== "number") ? error.status : error;

    var preliminaryErrorBody = this.warnings[errorStatus];
    preliminaryErrorBody = (preliminaryErrorBody == null) ? this.defaultWarning : preliminaryErrorBody;
    if (errorStatus === 500) return preliminaryErrorBody;

    if (typeof error !== "number" && (!error.hasOwnProperty("status") || !error.hasOwnProperty("error"))){
      console.error(error);
      throw "Error while trying to display the error above";
    } 
    const hasSingleError: boolean = typeof error.error === "string";
    const isGenericHTTPError: boolean = typeof error === "number";

    // Get individual errors
    let httpErrorMessage: string;
    if(hasSingleError){
      httpErrorMessage = "The error was caused by: <br>    " + error.error;
    } else if (isGenericHTTPError){
      httpErrorMessage = "";
    } else {
      httpErrorMessage = this.getHttpErrorMessages(error)
    }

    const notificationBody = preliminaryErrorBody + "<br>" + httpErrorMessage;
    return notificationBody;
  }

  getHeading(errorStatus: number): string{
    const defaultHeading: string = `Error ${errorStatus}`;

    const refinedHeading: string = this.headings[errorStatus];

    return (refinedHeading == null) ? defaultHeading : refinedHeading;
  }

  getHttpErrorMessages(httpErrorObject: any): string{
    let httpErrorMessagesHTML: string = "The errors you received were because of:<br>";

    for(let formField in httpErrorObject.error){
      httpErrorMessagesHTML += `${formField}<br>`;
      const isErrorMessageArray = Array.isArray(httpErrorObject.error[formField]);

      if(isErrorMessageArray){
        const formFieldErrors: string[] = httpErrorObject.error[formField];
        formFieldErrors.forEach(errorMessage => {
          httpErrorMessagesHTML += `<strong class='ms-5'>- ${errorMessage}</strong> <br>`;
        });
      } else {
        const errorMessage = httpErrorObject.error[formField];
        httpErrorMessagesHTML += `<strong class='ms-5'>- ${errorMessage}</strong> <br>`;
      }

    }

    return httpErrorMessagesHTML;
  }

  showAlert(text: string){
    alert(text);
  }

  private showErrorNotification(heading: string, body: string, error: number | any = {}) {
    const bodyElement: HTMLElement = document.querySelector("body");
    const notificationHTML = `
    <div class="card notification animate__animated animate__fadeInDown">
        <div class="card-body">
          <i class="fa fa-times fa-1-5x icon float-end" id="closeIcon"></i>
          <h3 class="card-title mb-0">${heading}</h3>
          <hr class="white-separator">
          <div class="card-subtitle"></div>
          <div class="card-text">${body}</div>
          <div class="mt-3">
              <div class="btn btn-secondary" id="closeBtn"> <i class="fa fa-times"></i> Close </div>
              <div class="btn btn-secondary" id="copy"> <i class="fas fa-clipboard"></i> Copy Full Error</div>
          </div>
        </div>
    </div>
    `;


    const notificationElement: HTMLElement = document.createElement("div")
    notificationElement.innerHTML = notificationHTML;
    notificationElement.onclick = (event) => this.onErrorNotificationClick(event, error);

    bodyElement.appendChild(notificationElement);
  }

  onErrorNotificationClick(event: any, error: any): void{
    const isClickOnCloseIcon = event.target.id === "closeIcon";
    const isClickOnCloseButton = event.target.id === "closeBtn";

    if (isClickOnCloseIcon){
      const notificationElement = event.target.parentElement.parentElement;
      console.log(notificationElement);
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
