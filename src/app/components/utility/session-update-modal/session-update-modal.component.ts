import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FieldType } from '@ngx-formly/bootstrap/form-field';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { SessionObject } from 'src/app/models/session';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-session-update-modal',
  templateUrl: './session-update-modal.component.html',
  styleUrls: ['./session-update-modal.component.scss']
})
export class SessionUpdateModalComponent extends FieldType implements OnInit, OnDestroy {
  @Input() session_pk_subject: BehaviorSubject<number>;
  @Input() icon: string = "fa-pencil";
  @Output() updateSession: EventEmitter<SessionObject> = new EventEmitter();
  @Output() createSession: EventEmitter<SessionObject> = new EventEmitter();

  sessionList: SessionObject[];

  campaign: CampaignOverview;
  sessionFormModel: SessionObject; 
  sessionForm = new FormGroup({});
  isInCreateMode: boolean = false;
  isInUpdateMode: boolean = false

  sessionFormFields: FormlyFieldConfig[] = [
    this.formlyService.genericCheckbox({key: "is_main_session", defaultValue: true, label: "Main Session?"}),
    this.formlyService.genericInput({key: "session_number", label: "Session Number", required: true}),
    this.formlyService.genericDatepicker({key: "session_date", label: "Day of the Session", required: true}),
    this.formlyService.genericInput({key: "start_day", label: "Start Day", required: false }),
    this.formlyService.genericInput({key: "end_day", label: "End Day", required: false })
  ];

  constants : any = Constants;
  
  sessionpk_subscription: Subscription;
  parameterSubscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private formlyService: MyFormlyService,
    private sessionService: SessionService,
    private globalUrlParams: GlobalUrlParamsService,
  ) { super() }

  async ngOnInit(){
    const isGivenPkDataOfExistingEntry = !!this.session_pk_subject;
    this.isInUpdateMode = isGivenPkDataOfExistingEntry;
    this.isInCreateMode = !isGivenPkDataOfExistingEntry;

    this.campaign = await this.globalUrlParams.getCurrentCampaign();
    this.onAfterCampaignLoad(this.campaign);
  }

  onAfterCampaignLoad(campaign: CampaignOverview): void{
    if (this.isInUpdateMode){
      this.fetchUserModel();

    } else if (this.isInCreateMode){
      this.createModel(campaign);
    }
  }

  fetchUserModel(){
    this.sessionpk_subscription = this.session_pk_subject
      .pipe(filter(sessionPk => !!sessionPk))
      .subscribe((sessionPk: number) => {
        this.sessionService.read(sessionPk)
          .pipe(first())
          .subscribe((session: SessionObject) => this.sessionFormModel = session);
      });
  }

  async createModel(campaign: CampaignOverview){
    if (this.sessionList == null) {
      this.sessionList = await this.sessionService.campaignList(this.campaign.name).toPromise();
    }
    
    const lastSession = this.sessionList[0];
    this.sessionFormModel = new SessionObject();

    this.sessionFormModel.session_date = this.getNextSessionDate(lastSession);
    this.sessionFormModel.is_main_session = true;
    this.sessionFormModel.session_number = lastSession.session_number + 1;
    this.sessionFormModel.campaign = campaign.pk;
  }

  getNextSessionDate(lastSession: SessionObject): string{
    const lastSessionDate: Date = new Date(lastSession.session_date);
    const assumedThisSessionDate: Date = this.addDaysToDate(7, lastSessionDate);
    return this.dateToYYYMMDDString(assumedThisSessionDate);
  }

  addDaysToDate(days: number, oldDate: Date): Date{
    const daysInSeconds = days * 86400000;
    return new Date(oldDate.setTime( oldDate.getTime() + daysInSeconds));
  }

  dateToYYYMMDDString(date: Date){
    return date.toISOString().slice(0,10);
  }

  onSubmit(modal: NgbActiveModal): void{
    const responseObservable: Observable<SessionObject> = (this.isInUpdateMode) ? 
        this.sessionService.update(this.sessionFormModel.pk, this.sessionFormModel) : 
        this.sessionService.create(this.sessionFormModel);

    responseObservable.pipe(first()).subscribe(session =>{
      const emitter: EventEmitter<SessionObject> = (this.isInUpdateMode) ? this.updateSession : this.createSession;
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
    if (this.parameterSubscription) this.parameterSubscription.unsubscribe();
  }
}
