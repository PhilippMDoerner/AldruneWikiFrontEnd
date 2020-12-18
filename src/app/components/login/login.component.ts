import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { User } from 'src/app/models/user';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  model: User;
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: 'username', placeholder: 'Username'}),
    this.formlyService.genericPasswordInput({key: 'password'})
  ]

  state: string;
  extraMessage: string;
  parameter_subscription: Subscription;

  constructor(
    private formlyService: MyFormlyService,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe( params => {
      this.state = params['state'];
      this.extraMessage = Constants.loginMessageForState[this.state];
    })
    this.model = {username: null, password: null};
  }

  submitOnEnterPress(keyDownEvent){
    if (keyDownEvent.key === "Enter") this.onSubmit();
  }

  onSubmit(){
    this.tokenService.getJWTToken(this.model).pipe(first()).subscribe( jwtTokens => {
      this.tokenService.setTokens(jwtTokens);
      Constants.routeToPath(this.router, 'home1');
    }, error => {
      console.log(error);
      if(error.status === 401){
           this.resetModel();
           const invalidLoginUrl = `${Constants.getRoutePath(this.router, 'login')}/invalid-login`;
           this.router.navigateByUrl(invalidLoginUrl) ;   
      }
    });

  }

  resetModel(){
    this.model = {username: null, password: null};
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }

}
