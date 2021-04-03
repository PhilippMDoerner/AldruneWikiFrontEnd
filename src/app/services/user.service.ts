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
    private tokenService: TokenService
  ) { }

  @TransformArrayObservable(UserObject)
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.userUrl);
  }

  @TransformObservable(UserObject)
  addUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.userUrl}/`, user);
  }

  /**
   * @description Updates a user in the database with a given pk. Do not use to set admin permission.
   * @param {User} user - A fully fledged user object. Must have a defined pk attribute inside.
   * @returns {Observable<User>}
   */
  @TransformObservable(UserObject)
  updateUser(user: User): Observable<User>{
    return this.http.put<User>(`${this.userUrl}/pk/${user.pk}/`, user);
  }

  @TransformObservable(UserObject)
  updateUserGroups(user: User): Observable<User>{
    const data = {groups: user.groups};
    return this.http.patch<User>(`${this.userUrl}/pk/${user.pk}/`, data);
  }

  /** 
   * @description An alternate method to set superuser/admin rights for a given user. Only updates
   * the 2 parameters "is_staff" and "is_superuser" to update, nothing else.
  */
  @TransformObservable(UserObject)
  updateUserAdminState(user: User): Observable<User>{
    const data = {
      is_staff: user.is_staff,
      is_superuser: user.is_superuser
    }
    return this.http.patch<User>(`${this.userUrl}/pk/${user.pk}/`, data);
  }

  @TransformObservable(UserObject)
  patchUser(userPk: number, data: any): Observable<User>{
    return this.http.patch<User>(`${this.userUrl}/pk/${userPk}/`, data);
  }

  deleteUser(user_pk: number): Observable<any>{
    return this.http.delete(`${this.userUrl}/pk/${user_pk}`);
  }

  @TransformObservable(UserObject)
  getThisUser(): Observable<User>{
    const userPk: number = this.tokenService.getCurrentUserPk();
    const url: string = `${this.userUrl}/pk/${userPk}/`;
    return this.http.get<User>(url);
  }
}
