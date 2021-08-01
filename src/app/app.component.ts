import { Component, ElementRef, EventEmitter, HostListener, OnInit, ViewChild } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, Subject } from 'rxjs';
import { animateElement } from 'src/app/utils/functions/animationDecorator';
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
  showSidebarSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  firstTouchData: TouchEvent;
  lastTouchData: TouchEvent;

  @ViewChild('routerOutlet') routerOutlet: ElementRef;
  @ViewChild('sidebar') sidebarRef: ElementRef;

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


  trackSwipeStart(event: TouchEvent): void{
    console.log("Track swipe start");
    //event.preventDefault(); //Else this might count as click
    this.firstTouchData = event;
  }

  trackSwipeEnd(event: TouchEvent): void{
    console.log("Track swipe end");
    //event.preventDefault(); //Else this might count as click
    this.lastTouchData = event;
  }

  /**
   * @description Only relevant for touch devices. 
   * When the user touches the screen und untouches it, this function checks based on the movement if the sidebar
   * should be open or closed. The sidebar should be open, if that was a swipe to the right, the sidebar shall be shown.
   * If that was a swipe left, the sidebar shall be closed.
   * If that was a tap on a menu-container in the sidebar, do nothing.
   * If that was a tap on anything else on the screen, close the sidebar. 
   * This function solely performs a side effect on the "showSidebarSubject"
   * @param event: A TouchEvent
   */
  checkForSwipeGesture(event: TouchEvent): void{
    event.preventDefault(); //Else this might count as click. Prevents the normal clicking and focus this might do to prevent double clicks
    const firstTouchData = this.extractTouchData(this.firstTouchData);
    const secondTouchData = this.extractTouchData(this.lastTouchData);

    if (firstTouchData == null || secondTouchData == null){
      const originalClickTarget: any = this.firstTouchData.target; //Necessary because in Typescript event.target is not HTMLElement
      originalClickTarget.click(); //This allows input fields on smartphone to be clicked on, as preventDefault blocks that
      originalClickTarget.focus(); //This allows input fields on smartphone to be focussed and written in

      /**Clicks on sidebar menu-containers shall not close the sidebar! They are identified by having the .container-title class */
      const isClickOnMenuContainer = originalClickTarget.closest(".container-title") != null;
      if(!isClickOnMenuContainer) this.showSidebarSubject.next(false);

      return;
    }

    const gestureType = this.getSwipe(firstTouchData, secondTouchData);

    const isSwipeRight = gestureType === "right";
    const isSwipeLeft = gestureType === "left";
    const isTap = gestureType === "tap";
    const isSidebarOpen: boolean = this.showSidebarSubject.getValue();

    if(!isSidebarOpen && isSwipeRight){
      this.showSidebarSubject.next(true);
    } else if (isSidebarOpen && (isSwipeLeft || isTap)){
      this.showSidebarSubject.next(false);
    }

    this.resetTouchData();
  }

  resetTouchData(){
    this.firstTouchData = null;
    this.lastTouchData = null;
  }

  getSwipe(touchData1, touchData2){
    const xDelta = touchData2.x - touchData1.x;
    const absoluteXDelta = Math.abs(xDelta);
    const hasMinimumSwipeLength = absoluteXDelta > Constants.minimumSwipeDistance;
    const isTap = absoluteXDelta < Constants.maximumTapDistance;
    if(!hasMinimumSwipeLength) return isTap ? "tap" : null;

    const timeDelta = touchData2.timestamp - touchData1.timestamp;
    const hasSwipeTime: boolean = timeDelta < Constants.maximumSwipeTime;
    if(!hasSwipeTime) return null;

    const isSwipeRight: boolean = xDelta > 0;
    return isSwipeRight ? "right" : "left";
  }

  extractTouchData(event: TouchEvent){
    if (event == null) return null;

    const touchX: number = event.touches[0].clientX;
    const timestamp: number = event.timeStamp;
    return {x: touchX, timestamp: timestamp};
  }
}