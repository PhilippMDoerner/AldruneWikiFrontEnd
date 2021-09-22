import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip-infocircle',
  templateUrl: './tooltip-infocircle.component.html',
  styleUrls: ['./tooltip-infocircle.component.scss']
})
export class TooltipInfocircleComponent {
  @Input() tooltipMessage: string;
}
