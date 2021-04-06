import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Subject } from 'rxjs';
import { animateElement } from 'src/app/utils/functions/animationDecorator';
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

  @ViewChild('routerOutlet') routerOutlet: ElementRef;

  constructor(
    public routingService: RoutingService,
    private serviceWorkerUpdate: SwUpdate,
    private warnings: WarningsService,
  ){}

  ngOnInit(){
    this.serviceWorkerUpdate.available.subscribe(
      event => {
        this.warnings.showAlert("There's an update to this webpage! Reloading cache...");
        location.reload();
      }
    )
  }

  routeToHome(event: any){
    if (event.target.attributes.id){
      const clickTargetId = event.target.attributes.id.nodeValue;
      const isClickOnBackground: boolean = clickTargetId === "background-div";
      const mainCard: HTMLElement = document.querySelector('.main');
      const hasMainCard: boolean = !(mainCard == null);
      if (isClickOnBackground && hasMainCard){
        animateElement(mainCard, 'fadeOut')
          .then(() => this.routingService.routeToPath('home2'));
      } else if (isClickOnBackground){
        this.routingService.routeToPath('home2')
      }
    }
  }


  closeNavbarMenu(event: Event): void{
    this.outsideClickSubject.next(event);
  }



}