import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoaded: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onWindowLoad():void{
    this.isLoaded = true;
    setTimeout(()=>{this.isLoaded = false}, 100);
  }
}
