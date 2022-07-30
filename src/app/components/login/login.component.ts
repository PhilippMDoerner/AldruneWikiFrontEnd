import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { EncodedJWTToken, UserData } from 'src/app/models/jwttoken';
import { User } from 'src/app/models/user';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { MailService } from 'src/app/services/mail.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { animateElement } from 'src/app/utils/functions/animationDecorator'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  model: User;
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: 'username', placeholder: 'Username'}),
    this.formlyService.genericPasswordInput({key: 'password', className:"mb-0", fieldGroupClassName: "mb-0"})
  ];

  recoveryModel: {username: string};
  recoveryForm = new FormGroup({});
  recoveryFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: 'username', placeholder: 'Username'})
  ];

  @ViewChild('loginMainCard') loginMainCard: ElementRef;

  state: string;
  extraMessage: string;
  parameter_subscription: Subscription;
  hasConfirmedLogin: boolean = false;
  campaign: string;

  isRequestingPasswordReset: boolean = false;
  reset_subscription: Subscription;

  constructor(
    private formlyService: MyFormlyService,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private warnings: WarningsService,  
    public routingService: RoutingService,
    private mailService: MailService,
    private globalUrlParams: GlobalUrlParamsService
    ) { }

  ngOnInit(): void {
    this.globalUrlParams.unsetCurrentlySelectedCampaign();

    this.parameter_subscription = this.route.params.subscribe( params => {
      this.campaign = params.campaign;
      this.state = params['state'];
      this.extraMessage = Constants.loginMessageForState[this.state];
    })
    this.model = {username: null, password: null};
  }

  ngAfterViewInit(): void {
    animateElement(this.loginMainCard.nativeElement, 'backInUp');
  }

  onSubmit(){
    this.tokenService.login(this.model)
      .pipe(first())
      .subscribe( 
        (userData: UserData) => this.onLoginSuccess(userData), 
        error => this.onLoginFailure(error)
      );
  }

  onLoginSuccess(userData: UserData): void{
    this.tokenService.setUserData(userData);
    this.globalUrlParams.autoUpdateCampaignSet();

    animateElement(this.loginMainCard.nativeElement, 'zoomOutDown')
      .then(() => this.routingService.routeToPath('campaign-overview'));
  }

  onLoginFailure(error): void{
    if(error.status === 401){
      this.routingService.routeToPath('login-state', {state: 'invalid-login'}); 
    } else {
      this.warnings.showWarning(error);
    }

    this.resetModel();
  }

  resetModel(){
    this.model = {username: null, password: null};
  }

  togglePasswordResetView(){
    this.isRequestingPasswordReset = !this.isRequestingPasswordReset;
    this.recoveryModel = {username: null};

    animateElement(this.loginMainCard.nativeElement, 'flip');
  }

  requestPasswordReset(){
    this.mailService.requestPasswordReset(this.recoveryModel.username).pipe(first()).subscribe(
      (response) =>  this.togglePasswordResetView(),
      (error) => this.warnings.showWarning(error)
    );
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
    if (this.reset_subscription) this.reset_subscription.unsubscribe();
  }

}
