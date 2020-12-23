import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy{
  @Input() outsideClickSubject: Subject<any>;
  clickSubscription: Subscription; 

  public searchString: string;
  public constants: any = Constants;

  collapsed: boolean = true; 

  constructor(
    private tokenService: TokenService,  
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void{
    this.clickSubscription = this.outsideClickSubject.subscribe( clickevent => this.collapsed = true);
  }

  search(): void{
    this.routingService.routeToPath('search', {searchString: this.searchString});
  }

  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
  }

  logout(): void{
    if (this.tokenService.hasJWTToken()){
      this.tokenService.invalidateJWTToken();
      this.tokenService.removeJWTTokenFromLocalStorage();
    }

    this.routingService.routeToPath('login-state', {state: 'logged-out'});
  }

  ngOnDestroy(): void{
    this.clickSubscription.unsubscribe();
  }
}
