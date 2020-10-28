import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { User } from "src/app/models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = `${Constants.wikiApiUrl}/user`;

  constructor(private http : HttpClient) { }

  getUsers(){
    return this.http.get<User[]>(this.userUrl);
  }
}
