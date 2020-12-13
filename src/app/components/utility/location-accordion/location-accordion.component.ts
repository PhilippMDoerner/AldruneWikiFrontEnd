import { Component, Input, OnInit } from '@angular/core';
import { Constants } from 'src/app/app.constants';
import { Location, SubLocation } from 'src/app/models/location';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-location-accordion',
  templateUrl: './location-accordion.component.html',
  styleUrls: ['./location-accordion.component.scss']
})
export class LocationAccordionComponent extends PermissionUtilityFunctionMixin implements OnInit {
  constants: any = Constants;
  @Input() sublocations: SubLocation[];
  isOpen: object;

  constructor() { super() }

  ngOnInit(): void {
    this.isOpen = {};

    this.sublocations.forEach((location, index) => {
      const accordionPanelId = `static-${index}`;
      this.isOpen[accordionPanelId] = false;
    });
  }

  onSublocationUpdate(updateText: string, encounterIndex: number){
    this.sublocations[encounterIndex].description = updateText;
    console.log("Sending updated Text");
    console.log(updateText);
  }

  onPanelChange({panelId}){
    for (const key in this.isOpen) {
      const isClickedPanel: boolean = (key === panelId);
      this.isOpen[key] = isClickedPanel ? !this.isOpen[key]: false;
    }
  }

  panelIsOpen(index: number){
    return this.isOpen[`static-${index}`];
  }
}
