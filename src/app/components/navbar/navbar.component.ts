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
    if (this.searchString != null){
      const cleaned_search = this.searchString.replace(/[^a-zA-Z0-9]/g,' ').trim();
      const cleaned_trimmed_search = cleaned_search.replace(/\s\s+/g, ' '); //Removes scenarios with more than 1 consecutive whitespace
  
      this.searchString = cleaned_trimmed_search;
    }

    const isInvalidSearchString = this.searchString == null || this.searchString === ""
    if (isInvalidSearchString) return; //TODO: Make this route to some kind of help page instead

    this.routingService.routeToPath('search', {searchString: this.searchString});
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
