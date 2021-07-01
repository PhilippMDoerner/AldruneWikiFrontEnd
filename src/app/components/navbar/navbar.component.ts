import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { animateElement } from 'src/app/utils/functions/animationDecorator';

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
  dropdownCollapsed: boolean = true;

  constructor(
    public tokenService: TokenService,  
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void{
    this.clickSubscription = this.outsideClickSubject.subscribe( clickevent => {
      this.collapsed = true;
      this.dropdownCollapsed = true;
    });
  }

  search(): void{
    const cleaned_search = this.searchString.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,' ').trim();
    this.routingService.routeToPath('search', {searchString: cleaned_search});
  }

  toggleCollapse(event: Event): void{
    event.cancelBubble = true;
    this.collapsed = !this.collapsed;
  }

  toggleDropDownCollapse(event: Event): void{
    event.cancelBubble = true;
    this.dropdownCollapsed = !this.dropdownCollapsed;
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
