import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoaded: boolean = false;
  constants: any = Constants;
  constructor() { }

  ngOnInit(): void {
  }

  onWindowLoad():void{
    this.isLoaded = true;
    setTimeout(()=>{this.isLoaded = false}, 100);
  }
}
