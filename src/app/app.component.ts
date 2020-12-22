import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from './app.constants';
import { RoutingService } from './services/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router,  
    public routingService: RoutingService
  ){}
  title = 'frontend';

  routeToHome(event: any){
    if (event.target.attributes.id){
      const clickTargetId = event.target.attributes.id.nodeValue;
      if (clickTargetId === "background-div"){
        this.routingService.routeToPath('home2');
      }
    }
  }

}