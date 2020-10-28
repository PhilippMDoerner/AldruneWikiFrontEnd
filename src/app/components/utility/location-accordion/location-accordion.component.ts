import { Component, Input, OnInit } from '@angular/core';
import { Location, SubLocation } from 'src/app/models/location';

@Component({
  selector: 'app-location-accordion',
  templateUrl: './location-accordion.component.html',
  styleUrls: ['./location-accordion.component.scss']
})
export class LocationAccordionComponent implements OnInit {
  @Input() sublocations: SubLocation[];
  isOpen: object;

  constructor() { }

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
