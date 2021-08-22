import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { User, UserObject } from "src/app/models/user";
import { Observable, of } from 'rxjs';
import { TokenService } from './token.service';
import { TransformObservable } from '../utils/functions/transform';
import { GenericObjectService } from './generic-object.service';


@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericObjectService{
  baseUrl: string = `${Constants.wikiApiUrl}/user`;

  constructor(
    http : HttpClient, 
    private tokenService: TokenService
  ) { super(http, UserObject)}

  @TransformObservable(UserObject)
  updateUserGroups(user: User): Observable<User>{
    const data = {groups: user.groups};
    return this.http.patch<User>(`${this.baseUrl}/pk/${user.pk}/`, data);
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
    return this.http.patch<User>(`${this.baseUrl}/pk/${user.pk}/`, data);
  }

  @TransformObservable(UserObject)
  patchUser(userPk: number, data: any): Observable<User>{
    return this.http.patch<User>(`${this.baseUrl}/pk/${userPk}/`, data);
  }

  @TransformObservable(UserObject)
  getThisUser(): Observable<User>{
    const userPk: number = this.tokenService.getCurrentUserPk();
    const url: string = `${this.baseUrl}/pk/${userPk}/`;
    return this.http.get<User>(url);
  }
}
