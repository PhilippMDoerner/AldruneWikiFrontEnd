import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { User } from 'src/app/models/user';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: User;
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: 'username', placeholder: 'Username'}),
    this.formlyService.genericPasswordInput({key: 'password'})
  ]

  state: string;
  extraMessage: string;

  constructor(
    private formlyService: MyFormlyService,
    private userService: UserService,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.state = this.route.snapshot.params['state'];
    this.extraMessage = Constants.loginMessageForState[this.state];
    this.model = {username: null, password: null};
  }

  onSubmit(){
    this.tokenService.getJWTToken(this.model).pipe(first()).subscribe( jwtTokens => {
      this.tokenService.setTokens(jwtTokens);
      this.router.navigateByUrl("");
    }, error => {
      console.log(error);
      if(error.status === 401){
               
      }
    });

  }

}
