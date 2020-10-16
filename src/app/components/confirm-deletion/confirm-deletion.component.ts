import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap"

@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrls: ['./confirm-deletion.component.scss']
})
export class ConfirmDeletionComponent implements OnInit {
  @Input() article: string;
  @Output() deletionConfirmation: EventEmitter<boolean> = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  showModal(content){
    this.modalService.open(content).result.then(  
      (closeResult) => {  
          //modal close  
          this.deletionConfirmation.emit(true);
      }, (dismissReason) => {  
          //modal Dismiss  
      })  
  }
}
