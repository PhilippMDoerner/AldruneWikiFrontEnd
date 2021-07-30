import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Constants } from 'src/app/app.constants';
import { RoutingService } from 'src/app/services/routing.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constants = Constants;

  @Input() showSidebar: BehaviorSubject<boolean>;

  sidebarEntries: any;

  //TODO: customizeable sidebar order of menu items
  constructor(
    public routingService: RoutingService
  ) { }

  ngOnInit(): void {
    const allMetaData: any = this.constants.articleTypeMetaData;
    const sidebarEntries = allMetaData.filter(metaDataEntry => metaDataEntry.showInSidebar)
    const processedEntries = sidebarEntries.map(metaDataEntry => {
        const routeName: string = metaDataEntry.route
        const routeUrl: string = this.routingService.getRoutePath(routeName);
        metaDataEntry.route = routeUrl;
        return metaDataEntry;
    });
    
    this.sidebarEntries = processedEntries;
  }
}
