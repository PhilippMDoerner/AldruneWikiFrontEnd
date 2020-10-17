import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Encounter } from "src/app/models/encounter";

@Component({
  selector: 'app-encounter-accordion',
  templateUrl: './encounter-accordion.component.html',
  styleUrls: ['./encounter-accordion.component.scss']
})
export class EncounterAccordionComponent implements OnInit {
  @Input() encounters: Encounter[];
  @Output() updateEncounterDescription: EventEmitter<{updatedDescription: string, index: number}> = new EventEmitter();
  isOpen: object;

  constructor() { }

  ngOnInit(): void {
    this.isOpen ={};
    this.encounters.forEach((encounter, index) => {
      const accordionPanelId = `static-${index}`;
      this.isOpen[accordionPanelId] = false;
    });
  }

  onEncounterUpdate(updateText, encounterIndex){
    this.encounters[encounterIndex].description = updateText;
    const encounterDescriptionUpdateEvent = {updatedDescription: updateText, index: encounterIndex};
    this.updateEncounterDescription.emit(encounterDescriptionUpdateEvent);
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
