import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "src/app/models/user";
import { TokenService } from "src/app/services/token.service";
import { UserService } from "src/app/services/user.service";


@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {
    constructor( 
        private userService: UserService,
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<User> | Promise<User>{
        return this.userService.getThisUser();
    }
}