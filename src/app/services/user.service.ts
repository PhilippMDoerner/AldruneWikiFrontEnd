import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { User, UserObject } from "src/app/models/user";
import { first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { TransformArrayObservable, TransformObservable } from '../utils/functions/transform';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = `${Constants.wikiApiUrl}/user`;
  jwtTokenUrl: string = Constants.wikiTokenUrl;
  refreshTokenUrl: string = Constants.wikiTokenRefreshUrl;

  constructor(
    private http : HttpClient, 
    private router: Router,
    private tokenService: TokenService
  ) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.userUrl);
  }

  @TransformObservable(UserObject)
  getThisUser(): Observable<User>{
    const userPk: number = this.tokenService.getCurrentUserPk();
    const url: string = `${this.userUrl}/pk/${userPk}/`;
    return this.http.get<User>(url);
  }
}
