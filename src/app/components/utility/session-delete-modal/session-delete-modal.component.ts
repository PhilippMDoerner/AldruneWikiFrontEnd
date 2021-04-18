import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { SessionObject } from 'src/app/models/session';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-session-delete-modal',
  templateUrl: './session-delete-modal.component.html',
  styleUrls: ['./session-delete-modal.component.scss']
})
export class SessionDeleteModalComponent implements OnInit, OnDestroy {
  @Input() session_pk_subject: BehaviorSubject<number>;
  @Input() icon: string = "fa-trash";
  @Output() deleteSession: EventEmitter<any> = new EventEmitter();
  
  sessionPk: number;

  session_pk_subject_subscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.session_pk_subject_subscription = this.session_pk_subject.subscribe(
      (sessionPk:number) => this.sessionPk = sessionPk
    );
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
      .then(
        (result) => {},//Codeblock for what to do if modal finished
        (reason) => {},//Codeblock for what to do if modal dismissed
      );
  }

  onSubmit(modal){
    this.sessionService.delete(this.sessionPk).pipe(first()).subscribe(response => {
      this.deleteSession.emit();
      modal.close();
    })
  }

  ngOnDestroy():void{
    if (this.session_pk_subject_subscription) this.session_pk_subject_subscription.unsubscribe();
  }

}
