import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-toggle',
  templateUrl: './edit-toggle.component.html',
  styleUrls: ['./edit-toggle.component.scss']
})
export class EditToggleComponent implements OnInit {
  @Input() link: string = "update";
  @Input() isInUpdateState: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
