import { Component, Input, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { OverviewItemObject } from 'src/app/models/overviewItem';

@Component({
  selector: 'app-display-form-container',
  templateUrl: './display-form-container.component.html',
  styleUrls: ['./display-form-container.component.scss']
})
export class DisplayFormContainerComponent implements OnInit {

  @Input() formlyFields : FormlyFieldConfig[];
  @Input() model: any;
  
  modelCopy: any;



  constructor() { }

  ngOnInit() {
    this.modelCopy = JSON.parse(JSON.stringify(this.model))
    this.formlyFields.forEach(async (field: FormlyFieldConfig) => {
      if(field.type === "select"){
        const key: string = `${field.key}`;

        this.modelCopy[key] = await this.getSelectedOptionValue(field, this.modelCopy);
      } 
    })
    console.log(this.formlyFields)
  }

  async getSelectedOptionValue(field: FormlyFieldConfig, data: any): Promise<string> {
    if(field.type !== "select") return;
    console.log("triggered with " + field.templateOptions.label)
    const key: string = `${field.key}`;
    const pk: number = data[key];

    const hasObservableOptions = field.templateOptions.options.constructor.name === "Observable"
    if (hasObservableOptions){
      const optionsObservable: any = field.templateOptions.options; //This is solely to escape typescript errors arising from options being Observables or arrays
      const options : OverviewItemObject[] = await optionsObservable.toPromise();
      const chosenOption = options.filter( option => option.pk === pk)[0];
      return chosenOption?.name_full;
    } else {

      return data[key];
    }

  }

}
