import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Encounter } from "src/app/models/encounter";
import { EncounterServiceService } from "src/app/services/encounter/encounter-service.service";

@Component({
  selector: 'app-encounter-accordion',
  templateUrl: './encounter-accordion.component.html',
  styleUrls: ['./encounter-accordion.component.scss']
})
export class EncounterAccordionComponent implements OnInit {
  @Input() encounters: Encounter[];
  isOpen: object;

  constructor() { }

  ngOnInit(): void {
    this.isOpen = {};

    this.encounters.forEach((encounter, index) => {
      const accordionPanelId = `static-${index}`;
      this.isOpen[accordionPanelId] = false;
    });
  }

  onEncounterUpdate(updateText: string, encounterIndex: number){
    this.encounters[encounterIndex].description = updateText;
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
