import { Component, OnChanges, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FieldType, FormlyTemplateOptions } from '@ngx-formly/core';
import { observable, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { OverviewItem, OverviewItemObject } from 'src/app/models/overviewItem';
import { WarningsService } from 'src/app/services/warnings.service';

/**
 * CUSTOM OVERVIEW SELECT THAT ALLOWS DISABLING FIELDS
 * With this you can pass a custom callback function via the "disabledExpression" templateOption.
 * Just throw a callback function into an attribute of that name into the templateOptions of a formly-
 * Field config. This is done by the formly service by using a "FormlyOverviewDisabledSelectConfig"
 * Which has such a property.
 * 
 * Effectively what this does is calling that callback function on every option to check if its valid.
 * The parameter you receive are in this order:
 * 1) option: OverviewItemObject
 * 2) templateOptions: FormlyTemplateOptions
 * 3) model: any (It's your model, thus your type)
 * 4) formControl: AbstractControl
 * You must return a boolean that decides whether to enable or disable the control
 */
@Component({
  selector: 'app-formly-select-disable',
  templateUrl: './formly-select-disable.component.html',
  styleUrls: ['./formly-select-disable.component.scss']
})
export class FormlySelectDisableComponent extends FieldType implements OnInit, OnChanges {

  constructor(
    private warnings: WarningsService
  ) { super() }

  allSelectOptions: OverviewItemObject[];
  isOptionDisabledArray: boolean[] = [];


  //TODO: Figure out a way to show the warning via a validator, so that it can affect the submit butotn as well
  ngOnInit(): void {
    const selectOptionsObservable = this.to.options as Observable<any[]>;
    const hasObservableOptions: boolean = (selectOptionsObservable instanceof Observable);
    if(!hasObservableOptions) throw "InvalidSelectOptionsException. You tried to create a FormlySelectDisableComponent - field, but provided an option that wasn't an Observable!"

    console.log(this.to);
    console.log(this.options);
    console.log(this.formControl);
    selectOptionsObservable.pipe(first()).subscribe(
      (observableOptions: OverviewItemObject[]) => {
        this.allSelectOptions = observableOptions;
        this.determineDisabledStateOfOptions();
      },
      error => this.warnings.showWarning(error)
    );
  }

  ngOnChanges(): void{
    this.determineDisabledStateOfOptions();
  }

  determineDisabledStateOfOptions(): void{
    const hasNoOptions = this.allSelectOptions == null;
    if(hasNoOptions) return;

    const checkForBeingDisabledCallback: Function = this.to.disabledExpression;
    const hasNoCallback = checkForBeingDisabledCallback == null;
    if(hasNoCallback) return;

    const thisComponentRef: this = this;

    this.isOptionDisabledArray = this.allSelectOptions.map(
      (option: OverviewItemObject) => thisComponentRef.isDisabledOption(option, thisComponentRef)
    );
  }

  isDisabledOption(option: OverviewItemObject, thisComponentRef: this){
    const hasNoOptions: boolean = thisComponentRef.allSelectOptions == null;
    if(hasNoOptions) return;

    const checkForBeingDisabledCallback: Function = thisComponentRef.to.disabledExpression;
    const hasNoCallback: boolean = checkForBeingDisabledCallback == null;
    if(hasNoCallback) return;

    const templateOptions: FormlyTemplateOptions = thisComponentRef.to;
    const formControl: AbstractControl = thisComponentRef.formControl;
    const model = thisComponentRef.model;

    return checkForBeingDisabledCallback(option, templateOptions, model, formControl);
  }

  

  hasInvalidOptionSelected(): boolean{
    const hasNoOption = this.allSelectOptions == null;
    if(hasNoOption) return false;

    const selectedOptionPk: number = this.model.session;
    const selectedOption: OverviewItemObject = this.allSelectOptions.find(
      (option: OverviewItemObject) => option.pk === selectedOptionPk
    );
    const hasNoSelectedOption = selectedOption == null;
    if(hasNoSelectedOption) return false;

    const thisComponentRef: this = this;
    const selectedOptionIsInvalid = this.isDisabledOption(selectedOption, thisComponentRef);
    return selectedOptionIsInvalid;
  }

}
