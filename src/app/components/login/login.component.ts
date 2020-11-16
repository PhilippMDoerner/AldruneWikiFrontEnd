import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { User } from 'src/app/models/user';
import { MyFormlyService } from 'src/app/services/my-formly.service';
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


  constructor(
    private formlyService: MyFormlyService,
    private userService: UserService,
    ) { }

  ngOnInit(): void {
    this.model = {username: null, password: null};
  }

  onSubmit(){
    this.userService.setJWTToken(this.model);
    console.log(this.userService.getAccessToken());
    console.log(this.userService.getRefreshToken());
  }

}
