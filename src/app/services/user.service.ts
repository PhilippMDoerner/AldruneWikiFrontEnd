import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { User } from "src/app/models/user";
import { first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = `${Constants.wikiApiUrl}/user`;
  jwtTokenUrl: string = Constants.wikiTokenUrl;
  refreshTokenUrl: string = Constants.wikiTokenRefreshUrl;

  constructor(private http : HttpClient, private router: Router) { }

  getUsers(){
    return this.http.get<User[]>(this.userUrl);
  }
}
