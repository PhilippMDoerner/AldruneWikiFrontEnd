import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControlStatus } from '@angular/forms';
import { FieldType, FormlyTemplateOptions } from '@ngx-formly/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { OverviewItemObject } from 'src/app/models/overviewItem';

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
 * 
 * How this fucker works:
 * - define a callback function under "disabledExpression" as described above
 * - that function is called on every option in the select to check whether the given option is valid
 * - FURTHER that function is called to check whether an invalid option is selected at any given point
 *    If it is, the pre-given warning message is displayed
 * - The given info-text is shown as a tooltip for this field.
 * 
 * To get the validator to block the submit button for you, you will likely ALSO have to define a
 * validator that does something very similar/identical to what your given expression does. 
 */
@Component({
  selector: 'app-formly-select-disable',
  templateUrl: './formly-select-disable.component.html',
  styleUrls: ['./formly-select-disable.component.scss']
})
export class FormlySelectDisableComponent extends FieldType implements OnInit {

  constructor() { super() }

  allSelectOptions$: Observable<OverviewItemObject[]>;
  isOptionDisabledArray$: Observable<boolean[]> = of([]);
  hasInvalidOptionSelected$: Observable<boolean> = of(false);

  ngOnInit(): void {

    this.allSelectOptions$ = this.props.options as Observable<any[]>;
    const hasObservableOptions: boolean = (this.allSelectOptions$ instanceof Observable);
    if(!hasObservableOptions) throw "InvalidSelectOptionsException. You tried to create a FormlySelectDisableComponent - field, but provided an option that wasn't an Observable!"
    
    this.isOptionDisabledArray$ = combineLatest(
      [ 
        this.form.statusChanges.pipe(startWith(0)), 
        this.allSelectOptions$ 
      ]
    ).pipe(
      map(([_, options]: [FormControlStatus, OverviewItemObject[]]): boolean[] => {
        return options.map(option => this.isDisabledOption(option, this));
      }),
      startWith([]),
    );

    this.hasInvalidOptionSelected$ = combineLatest(
      [ this.allSelectOptions$, this.isOptionDisabledArray$]
    ).pipe(
      map(([options, isOptionDisabledArray]) => {
        const selectedOptionPk: number = this.model.session;
        const selectedOptionIndex: number = options.findIndex(
          (option: OverviewItemObject) => option.pk === selectedOptionPk
          );
          const hasNoSelectedOption = selectedOptionIndex == -1;
          if(hasNoSelectedOption) return false;
          
        return isOptionDisabledArray[selectedOptionIndex];
      })
    );
  }

  isDisabledOption(option: OverviewItemObject, thisComponentRef: this): boolean{
    const checkForBeingDisabledCallback: Function = thisComponentRef.props.disabledExpression;
    const hasNoCallback: boolean = checkForBeingDisabledCallback == null;
    if(hasNoCallback) return false;

    const templateOptions: FormlyTemplateOptions = thisComponentRef.props;
    const formControl: AbstractControl = thisComponentRef.formControl;
    const model = thisComponentRef.model;
    
    return checkForBeingDisabledCallback(option, templateOptions, model, formControl);
  }
}
