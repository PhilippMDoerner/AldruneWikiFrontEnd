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
import { UserService } from 'src/app/services/user.service';

// TODO: Implement Logout at some point. To do this, you need to implement a view on the backend that 
// Blacklists Access and Refresh Token when being sent
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
    private userService: UserService,
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

  onSubmit(){
    this.tokenService.getJWTToken(this.model).pipe(first()).subscribe( jwtTokens => {
      this.tokenService.setTokens(jwtTokens);
      this.router.navigateByUrl("");
    }, error => {
      console.log(error);
      if(error.status === 401){
           this.resetModel();
           this.router.navigateByUrl('/login/invalid-login') ;   
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
