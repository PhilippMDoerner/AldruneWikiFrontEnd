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
    event.preventDefault(); //Else this might count as click
    this.firstTouchData = event;
  }

  trackSwipeEnd(event: TouchEvent): void{
    console.log("Track swipe end");
    event.preventDefault(); //Else this might count as click
    this.lastTouchData = event;
  }

  checkForSwipeGesture(event: TouchEvent): void{
    event.preventDefault(); //Else this might count as click
    const firstTouchData = this.extractTouchData(this.firstTouchData);
    const secondTouchData = this.extractTouchData(this.lastTouchData);

    if (firstTouchData == null || secondTouchData == null){
      const originalClickTarget: any = this.firstTouchData.target;
      originalClickTarget.click();
      this.showSidebarSubject.next(false);
      return;
    }

    const swipeType = this.getSwipe(firstTouchData, secondTouchData);
    console.log(`SwipteType: ${swipeType}`);

    const shouldSidebarBeOpen: boolean = swipeType === "right";
    const isSidebarOpen: boolean = this.showSidebarSubject.getValue();
    const sidebarNeedsUpdate: boolean = isSidebarOpen !== shouldSidebarBeOpen;

    if(sidebarNeedsUpdate){
      this.showSidebarSubject.next(shouldSidebarBeOpen);
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

    console.log(xDelta);
    const isSwipeGesture = absoluteXDelta > Constants.minimumSwipeDistance;
    if (!isSwipeGesture) return null;

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