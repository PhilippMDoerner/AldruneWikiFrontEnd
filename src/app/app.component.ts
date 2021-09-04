import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Constants } from './app.constants';
import { RoutingService } from './services/routing.service';
import { WarningsService } from './services/warnings.service';
import { onlyOnTouch } from './utils/functions/utilityDecorators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'AldruneWiki';
  outsideClickSubject: Subject<any> = new Subject();
  showSidebarSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  routingSubscription: Subscription;
  isOnCampaignOverviewPage: boolean = false;

  showSafariWarning: boolean; //Necessary to display warning about how this site is broken on iOS Safari

  @ViewChild('sidebar') sidebarRef: ElementRef;

  constructor(
    public routingService: RoutingService,
    private serviceWorkerUpdate: SwUpdate,
    private warnings: WarningsService,
    private router: Router,
  ){}

  ngOnInit(){
    this.serviceWorkerUpdate.available.subscribe(
      event => {
        this.warnings.showAlert("There's an update to this webpage, that you've just downloaded in the background! We now need to reload the page to move it into cache...");
        location.reload();
      }
    );

    //Updates whether the sidebar should be shown at all (not the case for campaign overview) 
    //or not with every update of the route
    this.routingSubscription = this.router.events.pipe(
      //Ensures you fire only one routingevent per routing
      filter((e: any) => {
        const isRouterEvent: boolean =  e instanceof RouterEvent;
        const isSingleRouterEvent: boolean = e.navigationTrigger === "imperative";
        return isRouterEvent && isSingleRouterEvent
      })
    ).subscribe(
      () => {
        this.isOnCampaignOverviewPage = this.router.url === this.routingService.getRoutePath('campaign-overview');
      }
    );

  }
  
  // CHECK AGAINST SAFARI AND IOS
  isUserWithSafariBrowser(): boolean{
    const userAgent = navigator.userAgent.toLowerCase();
    const isPotentiallySafari = userAgent.indexOf("safari") > -1;
    const isChrome = userAgent.indexOf("chrome") > -1;
    const isFirefox = userAgent.indexOf("firefox") > -1;
    const isOpera = userAgent.indexOf("opera") > -1;
    return isPotentiallySafari && !isChrome && !isFirefox && !isOpera;
  }

  isIOSUser(): boolean{
    return this.getOS() === "iOS";
  }

  getOS(): string {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;
  
    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }
  
    return os;
  }


  @onlyOnTouch
  onSwipeLeft(event: any): void{
    console.log("On swipe left");
    console.log(event);
    this.showSidebarSubject.next(false);
  }

  @onlyOnTouch
  onSwipeRight(event: any): void{
    console.log("On swipe right");
    console.log(event);
    this.showSidebarSubject.next(true);
  }

  @onlyOnTouch
  onTap(event: any){
    const sidebarIsVisible = this.showSidebarSubject.value === true;

    const clickTarget: HTMLElement = event.target;
    //const isClickOnSidebar = clickTarget.closest("#sidebar") != null;
    const isClickOnMenuContainer = clickTarget.closest(".container-title") != null;

    if (sidebarIsVisible && !isClickOnMenuContainer){
      this.showSidebarSubject.next(false);
      clickTarget.click();
    } 
  }

  ngOnDestroy(): void{
    if(this.routingSubscription) this.routingSubscription.unsubscribe();
  }
}