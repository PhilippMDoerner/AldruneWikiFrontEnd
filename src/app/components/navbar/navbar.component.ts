import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  public searchString: string;
  public constants: any = Constants;

  collapsed: boolean = true; 

  constructor(
    private tokenService: TokenService,  
    public routingService: RoutingService,
  ) { }

  search(){
    this.routingService.routeToPath('search', {searchString: this.searchString});
  }

  toggleCollapse(){
    this.collapsed = !this.collapsed;
  }

  logout(){
    if (this.tokenService.hasJWTToken()){
      this.tokenService.invalidateJWTToken();
      this.tokenService.removeJWTTokenFromLocalStorage();
    }

    this.routingService.getRoutePath('login-state', {state: 'logged-out'});
  }
}
