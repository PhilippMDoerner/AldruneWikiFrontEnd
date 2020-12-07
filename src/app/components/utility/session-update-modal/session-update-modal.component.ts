import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { delay, filter, first, tap } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { SessionObject } from 'src/app/models/session';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-session-update-modal',
  templateUrl: './session-update-modal.component.html',
  styleUrls: ['./session-update-modal.component.scss']
})
export class SessionUpdateModalComponent implements OnInit, OnDestroy {
  @Input() session_pk_subject: BehaviorSubject<number>;
  @Input() icon: string = "fa-pencil";
  @Output() updateSession: EventEmitter<SessionObject> = new EventEmitter();

  formState: string;

  model: SessionObject;
  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "session_number", label: "Session Number", required: true}),
    this.formlyService.genericDatepicker({key: "session_date", label: "Day of the Session", required: true}),
    this.formlyService.genericInput({key: "start_day", label: "Start Day", required: false, isNumberInput: true}),
    this.formlyService.genericInput({key: "end_day", label: "End Day", required: false, isNumberInput: true})
  ];

  constants : any = Constants;
  
  sessionpk_subscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private formlyService: MyFormlyService,
    private sessionService: SessionService,
  ) { }

  ngOnInit(){
    this.sessionpk_subscription = this.session_pk_subject.pipe(
      filter(sessionPk => !!sessionPk),
    ).subscribe((sessionPk: number) => {
      this.sessionService.getSessionByPk(sessionPk).pipe(first()).subscribe((session: SessionObject) => {
        this.model = session;
      })
    })
  }

  onSubmit(): void{
    const isFormInUpdateState: boolean = true;
    const responseObservable: Observable<SessionObject> = (isFormInUpdateState) ? this.sessionService.updateSession(this.model) : this.sessionService.createSession(this.model);

    responseObservable.pipe(first()).subscribe(session =>{
      console.log(`Session From Server`);
      console.log(session);
      this.updateSession.emit(session);
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
      .then(
        (result) => {},//Codeblock for what to do if modal finished
        (reason) => {},//Codeblock for what to do if modal dismissed
      );
  }

  ngOnDestroy(){
    if (this.sessionpk_subscription) this.sessionpk_subscription.unsubscribe();
  }
}
