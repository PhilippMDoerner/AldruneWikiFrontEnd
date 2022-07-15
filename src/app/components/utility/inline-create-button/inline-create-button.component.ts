import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inline-create-button',
  templateUrl: './inline-create-button.component.html',
  styleUrls: ['./inline-create-button.component.scss']
})
export class InlineCreateButtonComponent {
  constructor() { }

  @Input() labelText: string;
}
