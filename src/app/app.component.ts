import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Constants } from './app.constants';
import { RoutingService } from './services/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AldruneWiki';
  outsideClickSubject: Subject<any> = new Subject();

  constructor(
    public routingService: RoutingService
  ){}

  routeToHome(event: any){
    if (event.target.attributes.id){
      const clickTargetId = event.target.attributes.id.nodeValue;
      if (clickTargetId === "background-div"){
        this.routingService.routeToPath('home2');
      }
    }
  }


  closeNavbarMenu(): void{
    this.outsideClickSubject.next();
  }


}