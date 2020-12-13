import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router,  
  ){}
  title = 'frontend';

  routeToHome(event: any){
    if (event.target.attributes.id){
      const clickTargetId = event.target.attributes.id.nodeValue;
      if (clickTargetId === "background-div"){
        const homeUrl: string = Constants.getRoutePath(this.router, 'home2')
        this.router.navigateByUrl(homeUrl);
      }
    }
  }

}