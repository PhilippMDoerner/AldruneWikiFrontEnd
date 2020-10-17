import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap"
import { Observable, Subscription } from "rxjs";
import { Image } from "src/app/models/image";

@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrls: ['./confirm-deletion.component.scss']
})
export class ConfirmDeletionComponent implements OnInit {
  @Input() article: string;
  @Input() showDeletionModalEvent: Observable<Image>;
  @Output() deletionConfirmation: EventEmitter<boolean> = new EventEmitter();
  private triggerSubscription: Subscription;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.triggerSubscription = this.showDeletionModalEvent.subscribe(() => {
      console.log("Triggered Modal creation in confirm-deletion-component");
    })
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
