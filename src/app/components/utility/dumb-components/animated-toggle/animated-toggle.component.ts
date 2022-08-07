import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { animateElement } from 'src/app/utils/functions/animationDecorator';

@Component({
  selector: 'app-animated-toggle',
  templateUrl: './animated-toggle.component.html',
  styleUrls: ['./animated-toggle.component.scss']
})
export class AnimatedToggleComponent {
  @Input() isActive: boolean = false;
  @Input() confirmationEmission: string = null;
  @Input() message: string;
  @Output() confirmationEvent : EventEmitter<string> = new EventEmitter();

  @ViewChild("toggle") toggleElement: ElementRef;


  constructor() { }

  toggleState(){
    this.isActive = !this.isActive;
    animateElement( this.toggleElement.nativeElement , 'flipInY');
  }

  emitConfirmationEvent(){
    if (this.isActive){
      this.confirmationEvent.emit(this.confirmationEmission);
    }
    this.isActive = false;
  }
}
