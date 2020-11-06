import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchString: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(){
    this.router.navigateByUrl(`/search/${this.searchString}`);
  }
}
