import { Component, Injectable, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FieldType } from '@ngx-formly/core';


/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
  @Injectable()
  export class CustomAdapter extends NgbDateAdapter<string> {

    readonly DELIMITER = '-';

    fromModel(value: string | null): NgbDateStruct | null {
      if (value) {
        let date = value.split(this.DELIMITER);
        return {
          day : parseInt(date[2], 10),
          month : parseInt(date[1], 10),
          year : parseInt(date[0], 10)
        };
      }
      return null;
    }

    toModel(date: NgbDateStruct | null): string | null {
      if (date == null) return "";

      const dayString: string = `${date.day}`.padStart(2, "0");
      const monthString: string = `${date.month}`.padStart(2, "0");
      const yearString: string = `${date.year}`.padStart(4, "0");
      return `${yearString}${this.DELIMITER}${monthString}${this.DELIMITER}${dayString}`;
    }
  }

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
 @Injectable()
 export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';
  
  parse(value: string): NgbDateStruct | null {
    if (value == null) return null;

    let date = value.split(this.DELIMITER);
    return {
      day : parseInt(date[2], 10),
      month : parseInt(date[1], 10),
      year : parseInt(date[0], 10)
    };
  }
 
   format(date: NgbDateStruct | null): string {
     if (date == null) return "";

     const dayString: string = `${date.day}`.padStart(2, "0");
     const monthString: string = `${date.month}`.padStart(2, "0");
     const yearString: string = `${date.year}`.padStart(4, "0");
     return `${yearString}${this.DELIMITER}${monthString}${this.DELIMITER}${dayString}`;
   }
 }


@Component({
  selector: 'app-formly-datepicker',
  templateUrl: './formly-datepicker.component.html',
  styleUrls: ['./formly-datepicker.component.scss'],
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will want to provide your main App Module
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class FormlyDatepickerComponent extends FieldType {

  constructor(
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>
  ) { super() }


  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }
}