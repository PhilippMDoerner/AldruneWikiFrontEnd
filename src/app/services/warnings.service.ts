import { Injectable } from '@angular/core';
import { type } from 'os';

@Injectable({
  providedIn: 'root'
})
export class WarningsService {

  warnings: object = {
    0: "This can't be done without an internet connection",
    404: "The target URL for the requested action does not seem to exist",
    504: "This can't be done without an internet connection",
  }

  defaultWarning: string = "The requested action was not carried out. An unknown error occurred";

  constructor() { }

  showWarning(error: number | any){
    if (typeof error !== "number" && !error.hasOwnProperty("status")) throw "Invalid error input to show warning";
    if (typeof error !== "number" && error.hasOwnProperty("status")) error = error.status;
    //TODO Turn this way of alerting somebody to an issue into something nicer looking

    const warningMessage = (this.warnings[error]) ? this.warnings[error] : this.defaultWarning;
    alert(warningMessage);
  }


}
