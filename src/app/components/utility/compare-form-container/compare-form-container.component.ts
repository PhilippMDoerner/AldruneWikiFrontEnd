import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormlyField, FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { GenericService } from 'src/app/services/generic.service';
import { animateElement } from 'src/app/utils/functions/animationDecorator';

@Component({
  selector: 'app-compare-form-container',
  templateUrl: './compare-form-container.component.html',
  styleUrls: ['./compare-form-container.component.scss']
})
export class CompareFormContainerComponent implements OnInit {
  @Input() formlyFields : FormlyFieldConfig[];
  @Input() modelFromUser : any;
  @Input() modelFromServer: any;
  @Input() isVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @Input() displayVertically: boolean = false;

  @Output() updateSubmit: EventEmitter<void> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  markFieldMismatches(){ //Purpose is to have the user-assigned fields that don't match the server side marked so they can see differences.
    const fieldNames: string[] = Object.keys(this.modelFromUser);
    for(let fieldName of fieldNames){
      const userModelValue: any = this.modelFromUser[fieldName];
      const serverModelValue: any = this.modelFromServer[fieldName];
      if(userModelValue != serverModelValue){
        //Mark user field somehow
      }
    }
  }

  onCancel(){
    this.cancel.emit(null);
  }

  onSubmit(){
    //Update the "update_datetime" field of the user-model
    this.modelFromUser.update_datetime = this.modelFromServer.update_datetime;
    this.updateSubmit.emit(null);
  }

}
