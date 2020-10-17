import { Component, OnInit, Input, Output } from '@angular/core';
import { Encounter } from "src/app/models/encounter";

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
    this.isOpen ={};
    this.encounters.forEach((encounter, index) => {
      const accordionPanelId = `static-${{index}}`;
      this.isOpen[accordionPanelId] = false;
    });
  }

  onEncounterUpdate(){

  }

  onPanelChange({panelId}){
    this.isOpen[panelId] = !this.isOpen[panelId];
  }

  panelIsOpen(index: number){
    return this.isOpen[`static-${index}`];
  }
}
