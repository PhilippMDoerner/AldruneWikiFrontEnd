import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isLoaded: boolean = false;
  constants: any = Constants;
  router: Router;
  constructor(private secretRouter: Router) {
    this.router = this.secretRouter;
  }

  onWindowLoad():void{
    this.isLoaded = true;
    setTimeout(()=>{this.isLoaded = false}, 100);
  }
}
