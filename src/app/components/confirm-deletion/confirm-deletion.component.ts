import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap"
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrls: ['./confirm-deletion.component.scss']
})
export class ConfirmDeletionComponent implements OnInit {
  @Input() article: string;
  @Input() triggerConfirmationRequest: Observable<void>;
  @Output() deletionConfirmation: EventEmitter<boolean> = new EventEmitter();
  private triggerSubscription: Subscription;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.triggerSubscription = this.triggerConfirmationRequest.subscribe(this.showModal);
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

  ngOnDestroy() {
    this.triggerSubscription.unsubscribe();
  }
}
