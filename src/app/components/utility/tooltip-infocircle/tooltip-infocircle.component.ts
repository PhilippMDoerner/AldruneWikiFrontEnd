import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip-infocircle',
  templateUrl: './tooltip-infocircle.component.html',
  styleUrls: ['./tooltip-infocircle.component.scss']
})
export class TooltipInfocircleComponent implements OnInit {

  @Input() tooltipMessage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
