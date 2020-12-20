import { Injectable } from '@angular/core';
import { type } from 'os';

@Injectable({
  providedIn: 'root'
})
export class WarningsService {

  warnings: object = {
    404: "The target for the requested action could not be found.",
    504: "The action you requested requires an internet connection. <br> Please try again once you are connected."
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
