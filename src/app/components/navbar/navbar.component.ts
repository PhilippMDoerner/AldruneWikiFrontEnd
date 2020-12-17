import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  public searchString: string;
  public constants: any = Constants;
  public router: Router;

  collapsed: boolean = true; 

  constructor(private secretRouter: Router, private tokenService: TokenService) { }

  ngOnInit(): void{
    this.router = this.secretRouter;
  }

  search(){
    const searchUrl: string = Constants.getRoutePath(this.router, 'search', {searchString: this.searchString});
    this.router.navigateByUrl(searchUrl);
  }

  toggleCollapse(){
    this.collapsed = !this.collapsed;
  }

  logout(){
    if (this.tokenService.hasJWTToken()){
      this.tokenService.invalidateJWTToken();
      this.tokenService.removeJWTTokenFromLocalStorage();
    }

    const logoutUrl: string = Constants.getRoutePath(this.router, 'login-state', {state: 'logged-out'});
    this.router.navigateByUrl(logoutUrl);
  }
}
