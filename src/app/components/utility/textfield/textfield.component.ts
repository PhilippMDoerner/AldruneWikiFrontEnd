import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss']
})
export class TextfieldComponent implements OnInit, OnChanges {
  @Input() initialText: string;
  @Input() heading: string;
  @Output() updateText: EventEmitter<string> = new EventEmitter();
  updatedText: string;
  isEditState: boolean = false;

  constructor() {  }

  ngOnInit(): void {
    this.updatedText = this.initialText;
  }

  ngOnChanges(): void{
    this.updatedText = this.initialText;
  }

  enableEdit(){
    this.isEditState = true;
  }

  finishEdit(){
    this.isEditState = false;
    this.updateText.emit(this.updatedText);
  }

  cancelEdit(){
    this.isEditState = false;
    this.updatedText = this.initialText;
  }
}
