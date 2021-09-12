import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Constants } from './app.constants';
import { Campaign } from './models/campaign';
import { CampaignService } from './services/campaign.service';
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
  allowSidebar: boolean = false;
  showSidebarSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constants = Constants;

  routingSubscription: Subscription;
  serviceWorkerSubscription: Subscription;
  parameterSubscription: Subscription;

  showSafariWarning: boolean; //Necessary to display warning about how this site is broken on iOS Safari

  @ViewChild('sidebar') sidebarRef: ElementRef;

  constructor(
    public routingService: RoutingService,
    private serviceWorkerUpdate: SwUpdate,
    private warnings: WarningsService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.serviceWorkerSubscription = this.serviceWorkerUpdate.available.subscribe(
      event => {
        this.warnings.showAlert("There's an update to this webpage, that you've just downloaded in the background! We now need to reload the page to move it into cache...");
        location.reload();
      }
    );

    //Updates whether the sidebar should be shown at all (not the case for campaign overview) 
    //or not with every update of the route
    this.routingSubscription = this.router.events
      .pipe(filter(this.isPageReroutingEndEvent))
      .subscribe((event) => this.onPageReroutingEnd(event));
  }

  /** Checks whether the given routing event is one that is fired at the end of routing, so when the new URL is reached */
  isPageReroutingEndEvent(e: any): boolean{
    return e instanceof NavigationEnd;
  }

  onPageReroutingEnd(routingEvent: NavigationEnd){
    this.updateSidebarAllowanceBasedOnRoute();
  }

  updateSidebarAllowanceBasedOnRoute(): void{
    const isCampaignOverviewPage: boolean = this.router.url === this.routingService.getRoutePath('campaign-overview');
    const isLoginPage: boolean = this.router.url.includes("/wiki2/login");
    const isGeneralAdminPage: boolean = this.router.url === this.routingService.getRoutePath('admin');
    const isConfigTablePage: boolean = this.router.url === this.routingService.getRoutePath('config-tables');
    this.allowSidebar = !isCampaignOverviewPage && !isLoginPage && !isGeneralAdminPage && !isConfigTablePage;
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


  //TOUCH EVENT HANDLERS
  @onlyOnTouch
  onSwipeLeft(event: any): void{
    this.showSidebarSubject.next(false);
  }

  @onlyOnTouch
  onSwipeRight(event: any): void{
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
    if(this.serviceWorkerSubscription) this.serviceWorkerSubscription.unsubscribe();
    if(this.parameterSubscription) this.parameterSubscription.unsubscribe();
  }
}