import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  @Output() createSession: EventEmitter<SessionObject> = new EventEmitter();

  formState: string;

  campaign: string = this.route.snapshot.params.campaign;

  model: SessionObject;
  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericCheckbox({key: "is_main_session", defaultValue: true, label: "Main Session?"}),
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
    private route: ActivatedRoute,
  ) { }

  ngOnInit(){
    this.formState = (this.session_pk_subject) ? Constants.updateState : Constants.createState;

    if (this.formState === Constants.updateState){
      this.sessionpk_subscription = this.session_pk_subject.pipe(
        filter(sessionPk => !!sessionPk),
      ).subscribe((sessionPk: number) => {
        this.sessionService.read(sessionPk).pipe(first()).subscribe((session: SessionObject) => {
          this.model = session;
        })
      })
    } else if (this.formState === Constants.createState){
      this.sessionService.campaignList(this.campaign).pipe(first()).subscribe((sessions: SessionObject[]) => {
        const lastSession = sessions[0];
        this.model = new SessionObject();

        this.model.session_date = this.getNextSessionDate(lastSession);
        this.model.is_main_session = true;
        this.model.session_number = lastSession.session_number + 1;
      })
    }

  }

  getNextSessionDate(lastSession: any): string{
    console.log(lastSession);
    const lastSessionDate: Date = new Date(lastSession.session_date);
    const assumedThisSessionDate: Date = this.addDaysToDate(7, lastSessionDate);
    return this.dateToYYYMMDDString(assumedThisSessionDate);
  }

  addDaysToDate(days: number, oldDate: Date): Date{
    const daysInSeconds = days * 86400000;
    return new Date(oldDate.setTime( oldDate.getTime() + daysInSeconds));
  }

  dateToYYYMMDDString(date: Date){
    console.log(date);
    return date.toISOString().slice(0,10);
  }

  onSubmit(modal: NgbActiveModal): void{
    const isFormInUpdateState: boolean = this.formState === Constants.updateState;
    const responseObservable: Observable<SessionObject> = (isFormInUpdateState) ? 
        this.sessionService.update(this.model.pk, this.model) : 
        this.sessionService.create(this.model);

    responseObservable.pipe(first()).subscribe(session =>{
      const emitter: EventEmitter<SessionObject> = (this.formState === Constants.updateState) ? this.updateSession : this.createSession;
      emitter.emit(session);
      modal.close();
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
