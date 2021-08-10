import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, Subject } from 'rxjs';
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
    );
  }


  trackSwipeStart(event: TouchEvent): void{
    this.firstTouchData = event;
  }

  trackSwipeEnd(event: TouchEvent): void{
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
    const firstTouchData = this.extractTouchData(this.firstTouchData);
    const secondTouchData = this.extractTouchData(this.lastTouchData);

    if (firstTouchData == null || secondTouchData == null){
      const originalClickTarget: any = this.firstTouchData.target; //Necessary because in Typescript event.target is not HTMLElement

      /**Click on sidebar somehow aren't registered. This fixes the problem, while keeping tap behaviour normal on the rest of the site */
      const isClickOnSidebar = originalClickTarget.closest("#sidebar") != null;
      if(isClickOnSidebar) originalClickTarget.click();

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

  getSwipe(touchData1: {x: number, y:number,  timestamp: number}, touchData2: {x: number, y:number, timestamp: number}){
    const xDelta = touchData2.x - touchData1.x;
    const absoluteXDelta = Math.abs(xDelta);
    const hasMinimumSwipeLength = absoluteXDelta > Constants.minimumSwipeDistance;

    const yDelta: number = touchData2.y - touchData1.y;
    const absoluteYDelta: number = Math.abs(yDelta);

    const isTap = absoluteXDelta < Constants.maximumTapDistance && absoluteYDelta < Constants.maximumTapDistance;
    if(!hasMinimumSwipeLength) return isTap ? "tap" : null;

    const timeDelta = touchData2.timestamp - touchData1.timestamp;
    const hasSwipeTime: boolean = timeDelta < Constants.maximumSwipeTime;
    if(!hasSwipeTime) return null;

    const isSwipeRight: boolean = xDelta > 0;
    return isSwipeRight ? "right" : "left";
  }

  extractTouchData(event: TouchEvent): {y: number, x: number, timestamp: number}{
    if (event == null) return null;

    const touchX: number = event.touches[0].clientX;
    const touchY: number = event.touches[0].clientY;
    const timestamp: number = event.timeStamp;
    return {x: touchX, y: touchY, timestamp: timestamp};
  }
}