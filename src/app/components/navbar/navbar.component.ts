import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public searchString: string;
  public constants: any = Constants;

  constructor(private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  search(){
    this.router.navigateByUrl(`/search/${this.searchString}`);
  }

  logout(){
    if (this.tokenService.hasJWTToken()){
      this.tokenService.invalidateJWTToken();
      this.tokenService.removeJWTTokenFromLocalStorage();
    }
    this.router.navigateByUrl('/login/logged-out');
  }
}
