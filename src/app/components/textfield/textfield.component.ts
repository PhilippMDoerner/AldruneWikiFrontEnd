import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss']
})
export class TextfieldComponent implements OnInit {
  @Input() isEditState = false;
  @Input() text: string;
  @Output() updatedText: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleEditState(){
    this.isEditState = !this.isEditState;
  }

  updateText(){
    this.updatedText.emit(this.text);
  }
}
