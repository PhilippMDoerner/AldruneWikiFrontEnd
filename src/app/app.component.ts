import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, Subject } from 'rxjs';
import { Constants } from './app.constants';
import { RoutingService } from './services/routing.service';
import { WarningsService } from './services/warnings.service';
import { onlyOnMobile } from './utils/functions/utilityDecorators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AldruneWiki';
  outsideClickSubject: Subject<any> = new Subject();
  showSidebarSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  firstTouchData: TouchEvent;
  lastTouchData: TouchEvent;

  showSafariWarning: boolean; //Necessary to display warning about how this site is broken on iOS Safari

  @ViewChild('sidebar') sidebarRef: ElementRef;

  constructor(
    public routingService: RoutingService,
    private serviceWorkerUpdate: SwUpdate,
    private warnings: WarningsService,
  ){}

  ngOnInit(){
    this.serviceWorkerUpdate.available.subscribe(
      event => {
        this.warnings.showAlert("There's an update to this webpage, that you've just downloaded in the background! We now need to reload the page to move it into cache...");
        location.reload();
      }
    );

    this.showSafariWarning = this.isUserWithSafariBrowser() || this.isIOSUser();
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


  @onlyOnMobile
  onSwipeLeft(event: any): void{
    console.log("On swipe left");
    console.log(event);
    this.showSidebarSubject.next(false);
  }

  @onlyOnMobile
  onSwipeRight(event: any): void{
    console.log("On swipe right");
    console.log(event);
    this.showSidebarSubject.next(true);
  }

  @onlyOnMobile
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
}