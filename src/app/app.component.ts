import { Component } from '@angular/core';
import { Event, Router } from '@angular/router';
import { Constants } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router){}
  title = 'frontend';

  routeToBackground(event: any){
    if (event.target.attributes.id){
      const clickTargetId = event.target.attributes.id.nodeValue;
      if (clickTargetId === "background-div"){
        this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}`);
      }
    }
  }

}