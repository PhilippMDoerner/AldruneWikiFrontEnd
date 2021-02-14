import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Observable, Subject } from 'rxjs';
import { Constants } from './app.constants';
import { RoutingService } from './services/routing.service';
import { WarningsService } from './services/warnings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AldruneWiki';
  outsideClickSubject: Subject<any> = new Subject();

  constructor(
    public routingService: RoutingService,
    private serviceWorkerUpdate: SwUpdate,
    private warnings: WarningsService,
  ){}

  ngOnInit(){
    this.serviceWorkerUpdate.available.subscribe(
      event => {
        this.warnings.showTextModal("There's an update to this webpage! Reloading cache...");
        location.reload();
      }
    )
  }

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