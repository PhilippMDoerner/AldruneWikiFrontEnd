import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchString: string;
  constants: any = Constants;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(){
    this.router.navigateByUrl(`/search/${this.searchString}`);
  }
}
