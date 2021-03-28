import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/app.constants';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isLoaded: boolean = false;
  constants: any = Constants;
  constructor(
    public routingService: RoutingService,
  ) {}

  onWindowLoad():void{
    this.isLoaded = true;
    setTimeout( () => {this.isLoaded = false}, 100);
  }
}
